const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(400).send(`
            <h2> Error</h2>
            <p>El correo ya esta registrado</p>
            <a href="/register.html">Volver</a>
            `);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

     return res.status(201).send(`
        <h2> Registro exitoso</h2>
        <p>Usuario creado: ${user.email}</p>
        <a href="/login.html">Ir a Login</a>
        `);
} catch (error) {
    return res.status(500).send(`
        <h2> Error </h2>
        <p>Ocurrio un problema al registrar</p>
        <a href="/register.html">Volver</a>
        `);
    }
};

exports.login = async (req, res) => {
    try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send(`
            <h2>Login fallido</h2>
            <p>Usuario no encontrado</p>
            <a href="/login.html">Volver</a>
        `);
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).send(`
            <h2>Login fallido</h2>
            <p>Contraseña incorrecta</p>
            <a href="/login.html">Volver</a>
            `);
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return res.status(200).send(`
        <h2>Login exitoso</h2>
        <p>Bienvenido: ${user.email}</p>
        <p><b>Tu token JWT:</strong></p>
        <p>${token}</p>

        <br>
        <a href="/login.html">Volver</a>
        &nbsp;&nbsp;
        <a href="/motos.html">Ir a motos</a>
    `);
    } catch (error) {
        return res.status(500).send(`
            <h2>Error</h2>
            <p>Ocurrio un problema al iniciar sesion</p>
            <a href="/login.html">Volver</a>
        `);
    }  
};