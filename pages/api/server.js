const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/neoris', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
  _id: Number,
  nombre: String,
  apellido: String,
  correo: String,
  password: String,
  sexo: String,
  genero: String,
  edad: Number,
  localizacion: String,
  empleado: Boolean,
  rol_empleado: String,
  equipos_empleado: String,
  chat_bot: {
    pregunta_actual: String,
    respuesta_actual: String,
    historial_preguntas_respuestas: [{
      pregunta: String,
      respuesta: String,
      timestamp: Date
    }]
  }
});

const User = mongoose.model('Usuario', userSchema);

// Define a counter schema to generate unique numeric IDs
const counterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number
});

const Counter = mongoose.model('Counter', counterSchema);

// Function to get the next sequence value for the specified key
async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}

// API to add a new user
app.post('/api/signup', async (req, res) => {
  try {
    const userId = await getNextSequenceValue('userId'); // Get the next numeric ID
    console.log('Next user ID:', userId); // Log the next user ID

    // Merge request data with default values for properties
    const userData = {
      _id: userId,
      nombre: req.body.name || '',
      apellido: req.body.lastName || '',
      correo: req.body.email || '',
      password: req.body.password || '',
      sexo: req.body.sex || '',
      genero: req.body.gender || '',
      edad: req.body.age || 0,
      localizacion: req.body.localizacion || '',
      empleado: req.body.empleado || false,
      rol_empleado: req.body.rol_empleado || null,
      equipos_empleado: req.body.equipos_empleado || null,
      chat_bot: {
        pregunta_actual: '',
        respuesta_actual: '',
        historial_preguntas_respuestas: []
      }
    };

    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 11000 && error.keyPattern._id === 1) {
      res.status(400).json({ message: 'Duplicate _id error. Please try again.' });
    } else {
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  }
});

// API to get all users
app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// API to get a single user by ID
app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json('User not found');
        }
      })
      .catch(err => {
        res.status(400).json('Error: ' + err);
      });
});

// CRUD operations for users
// Create User Endpoint (POST)
app.post('/users', async (req, res) => {
  try {
    const userId = await getNextSequenceValue('userId'); // Get the next numeric ID
    console.log('Next user ID:', userId); // Log the next user ID

    // Merge request data with default values for properties
    const userData = {
      _id: userId,
      nombre: req.body.nombre || '',
      apellido: req.body.apellido || '',
      correo: req.body.correo || '',
      password: req.body.password || '',
      sexo: req.body.sexo || '',
      genero: req.body.genero || '',
      edad: req.body.edad || 0,
      localizacion: req.body.localizacion || '',
      empleado: req.body.empleado || false,
      rol_empleado: req.body.rol_empleado || null,
      equipos_empleado: req.body.equipos_empleado || null,
      chat_bot: {
        pregunta_actual: '',
        respuesta_actual: '',
        historial_preguntas_respuestas: []
      }
    };

    const newUser = new User(userData);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update an existing user
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

const secretKey = 'your_secret_key';  

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ correo: username, password: password });
        if (user) {
            const token = jwt.sign(
                { userId: user._id, username: user.correo },
                secretKey,
                { expiresIn: '1h' }
            );
            res.json({ token: token, message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.error('Login failed:', error);
    }
});

const fs = require('fs');

app.post('/api/chat', (req, res) => {
  const { user_id, message } = req.body;
  console.log('Received message:', message);

  const pythonProcess = spawn('python', ['chatbot.py', message, user_id]);

  let responseSent = false;
  let chatbotResponse = '';

  pythonProcess.stdout.on('data', (data) => {
    chatbotResponse += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    const errorData = data.toString();
    console.error('Error from chatbot:', errorData);
    fs.appendFileSync('chatbot_errors.log', errorData);  // Save warnings and errors to a log file
  });

  pythonProcess.on('close', (code) => {
    if (!responseSent) {
      if (chatbotResponse) {
        console.log('Chatbot response:', chatbotResponse);
        res.send(chatbotResponse);  // Send the chatbot response to the client
      } else {
        console.log(`Child process exited with code ${code}`);
        res.status(500).send('Chatbot process closed without response');
      }
      responseSent = true;
    }
  });
});

const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
