from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pymongo
from datetime import datetime
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.vectorstores import FAISS
from langchain_core.runnables import RunnablePassthrough, RunnableParallel
from langchain_community.embeddings import HuggingFaceEmbeddings

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['neoris']
users_collection = db['usuarios']

ollama_llm = Ollama(model='llama3')
parser = StrOutputParser()
loader = TextLoader('NEORIS-ProductosyServicios.txt', encoding='utf-8')
document = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)
chunks = splitter.split_documents(document)
embeddings = HuggingFaceEmbeddings()
vector_storage = FAISS.from_documents(chunks, embeddings)
retriever = vector_storage.as_retriever()

template = """
You are AI-powered chatbot designed to provide
information and assistance for customers 
for NEORIS.
Do not say sentences like Based on the provided context...
Give the answer totally sure about the information.
If the user gives you a question in english respond in english
if the user gives you a question in spanish respond in spanish

Context:{context}
Question:{question}
"""
prompt = PromptTemplate.from_template(template=template)
result = RunnableParallel(context=retriever, question=RunnablePassthrough())
chain = result | prompt | ollama_llm | parser

def get_response(question):
    response = chain.invoke(question)
    return response

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        question = data.get('message')
        response = get_response(question)
        
        # Save the question and response to MongoDB
        if user_id:
            user = users_collection.find_one({"_id": user_id})
            if user:
                current_timestamp = datetime.utcnow()
                chat_entry = {
                    "pregunta": question,
                    "respuesta": response,
                    "timestamp": current_timestamp
                }
                users_collection.update_one(
                    {"_id": user_id},
                    {
                        "$set": {
                            "chat_bot.pregunta_actual": question,
                            "chat_bot.respuesta_actual": response
                        },
                        "$push": {
                            "chat_bot.historial_preguntas_respuestas": chat_entry
                        }
                    }
                )

        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
