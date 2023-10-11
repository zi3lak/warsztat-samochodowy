// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());  // Middleware do analizowania ciał JSON

// Połącz z MongoDB
mongoose.connect('mongodb://localhost:27017/warsztat', { useNewUrlParser: true, useUnifiedTopology: true });

// Schemat i model danych formularza
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: { type: String, unique: true },  // Unikalny e-mail
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Endpoint do zapisywania danych formularza
app.post('/contact', async (req, res) => {
    try {
        // Spróbuj utworzyć nowy rekord
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).send({ message: 'Dane zapisane pomyślnie' });
    } catch (error) {
        // Błąd unikalności e-maila
        if (error.code === 11000) {
            res.status(400).send({ message: 'E-mail już istnieje' });
        } else {
            res.status(500).send({ message: 'Wystąpił błąd serwera' });
        }
    }
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
