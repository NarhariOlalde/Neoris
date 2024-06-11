# Server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
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
import logging

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

# Setup MongoDB connection
client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['Neoris']
users_collection = db['usuarios']

# Setup logging
logging.basicConfig(filename='chatbot.log', level=logging.INFO)

# Initialize the language model and related components
ollama_llm = Ollama(model='llama3')
parser = StrOutputParser()
loader = TextLoader('pages/api/NEORIS-ProductosyServicios.txt', encoding='utf-8')
document = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=50)
chunks = splitter.split_documents(document)
embeddings = HuggingFaceEmbeddings()
vector_storage = FAISS.from_documents(chunks, embeddings)
retriever = vector_storage.as_retriever()

# Define the prompt template
template = """
You are AI-powered chatbot designed to provide
information and assistance for customers 
for NEORIS.
Do not answer question that has nothing to do regarding Neoris.
Be always polite and formal with your answers.
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
        logging.info(f"Received question: {question} from user_id: {user_id}")

        if not user_id:
            logging.error("User ID is missing in the request")
            return jsonify({'error': 'User ID is missing'}), 400

        response = get_response(question)
        logging.info(f"Generated response: {response}")

        # Save the question and response to MongoDB
        user = users_collection.find_one({"_id": user_id})
        if user:
            current_timestamp = datetime.utcnow()
            chat_entry = {
                "pregunta": question,
                "respuesta": response,
                "timestamp": current_timestamp
            }
            result = users_collection.update_one(
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
            if result.modified_count > 0:
                logging.info(f"Chat history updated for user_id: {user_id}")
            else:
                logging.warning(f"No document updated for user_id: {user_id}")
        else:
            logging.error(f"User with user_id: {user_id} not found")

        return jsonify({'response': response})
    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/chat/chathistory', methods=['POST'])
def chathistory():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        logging.info(f"Received history request from user_id: {user_id}")

        if not user_id:
            logging.error("User ID is missing in the request")
            return jsonify({'error': 'User ID is missing'}), 400

        user = users_collection.find_one({"_id": user_id})
        if user:
            historial_preguntas_respuestas = user.get("chat_bot", {}).get("historial_preguntas_respuestas", [])
    
            # Inicializa listas vacías para almacenar preguntas y respuestas
            preguntas = []
            respuestas = []

            # Recorre cada entrada en el historial
            for entry in historial_preguntas_respuestas:
                pregunta = entry.get("pregunta", "")
                respuesta = entry.get("respuesta", "")

                # Agrega la pregunta y respuesta a las listas correspondientes
                preguntas.append(pregunta)
                respuestas.append(respuesta)
            
            # Devuelve las listas de preguntas y respuestas
            return jsonify({'Previous_questions': preguntas, 'Previous_responses': respuestas})
        else:
            logging.error(f"User with user_id: {user_id} not found")
            return jsonify({'error': f'User with user_id: {user_id} not found'}), 404
    except Exception as e:
        logging.error(f"Error occurred while getting chatHistory: {e}")
        return jsonify({'error': str(e)}), 500

    
if __name__ == '__main__':
    app.run(debug=True, port=5000)
