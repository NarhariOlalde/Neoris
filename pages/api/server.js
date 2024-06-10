const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Neoris')
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
      fecha: { type: Date, default: Date.now }
    }]
  }
});

const User = mongoose.model('Usuario', userSchema);

const counterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number
});

const Counter = mongoose.model('Counter', counterSchema);

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
}

app.post('/api/signup', async (req, res) => {
  try {
    const userId = await getNextSequenceValue('userId');
    console.log('Next user ID:', userId);

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
        historial_preguntas_respuestas: [
          {
            pregunta: '',
            respuesta: '',
            fecha: new Date()
          },
        ]
      }
    };

    const newUser = new User(userData);
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, 'your_secret_key', { expiresIn: '1h' });
    res.status(201).json({ message: 'User created successfully', userId: newUser._id, token });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 11000 && error.keyPattern._id === 1) {
      res.status(400).json({ message: 'Duplicate _id error. Please try again.' });
    } else {
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ correo: username, password: password });
    if (user) {
      const token = jwt.sign(
        { userId: user._id, username: user.correo },
        'your_secret_key',
        { expiresIn: '1h' }
      );
      res.json({ token: token, message: 'Login successful', userId: user._id });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.error('Login failed:', error);
  }
});

app.listen(5005, () => {
  console.log(`Server running on port 5005`);
});
