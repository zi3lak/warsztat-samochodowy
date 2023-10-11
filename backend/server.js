// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/warsztat', { useNewUrlParser: true, useUnifiedTopology: true });

// Definiowanie schematu i modelu
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    message: String
});
const Contact = mongoose.model('Contact', contactSchema);

// Utworzenie instancji Express.js
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// Endpoint do zapisywania danych formularza
app.post('/contact', async (req, res) => {
    try {
        // Utwórz nowy rekord w bazie danych
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).send({ message: 'Dane zapisane pomyślnie' });
    } catch (error) {
        res.status(500).send({ message: 'Wystąpił błąd serwera' });
    }
});

// Zawsze zwracaj główny plik index.html, aby obsłużyć każde żądanie
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Uruchomienie serwera
app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
