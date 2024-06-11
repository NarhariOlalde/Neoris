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

// API to get a user's ID by token

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

// API endpoint to check if a user is an admin
app.get('/api/check-admin/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isAdmin = user.rol_empleado === 'admin';

    res.json({ isAdmin });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const secretKey = 'neoris_secret_key';  

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
