const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch((err) => console.error('❌ Error:', err));

const userSchema = new mongoose.Schema({
  dni: { type: String, required: true },
  name: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'tutor', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);

// Middleware para verificar JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}
// Obtener datos del usuario autenticado
app.get('/api/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { dni, email, password, name, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'El email ya está registrado' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ dni, name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el registro' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ message: 'Login exitoso', token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el login' });
  }
});

app.get('/', (req, res) => res.send('API Smart Tutor 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));




app.get('/api/test-mongo', async (req, res) => {
  try {
    // Intentamos obtener un usuario cualquiera (el primero que exista)
    const user = await User.findOne();

    if (!user) {
      return res.status(200).json({ message: '✅ Conexión exitosa, pero no hay usuarios en la base de datos' });
    }

    res.status(200).json({ message: '✅ Conexión exitosa', sampleUser: user.email });
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error);
    res.status(500).json({ message: '❌ Error al conectar con MongoDB', error: error.message });
  }
});
