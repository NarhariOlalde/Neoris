const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Updated MongoDB connection without deprecated options
mongoose.connect('mongodb://localhost:27017/neoris', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a User schema
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

// API to get all users
app.get('/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// API to get a single user by ID
app.get('/users/:id', (req, res) => {
    console.log('Request to get user by ID:', req.params.id); // Log the ID received in the request
  
    User.findById(req.params.id)
      .then(user => {
        if (user) {
          console.log('User found:', user); // Log the user data if found
          res.json(user);
        } else {
          console.log('User not found'); // Log a message if user not found
          res.status(404).json('User not found');
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err); // Log any errors that occur during database query
        res.status(400).json('Error: ' + err);
      });
  });
  

// API to add a new user
app.post('/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
