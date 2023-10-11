import React, { useState } from 'react';
import './App.css';  // Upewnij się, że App.css znajduje się w tym samym katalogu

function ContactForm() {
  const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      message: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
          ...formData,
          [name]: value
      });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:3001/contact', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });
          const data = await response.json();
          if (!response.ok) {
              throw new Error(data.message);
          }
          console.log('Dane zapisane pomyślnie');
          setError(null);
      } catch (error) {
          setError(error.message);
          console.log('Error:', error);
      }
  };

  return (
      <form onSubmit={handleSubmit}>
          <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Imię"
          />
          <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Telefon"
          />
          <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email"
          />
          <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              placeholder="Wiadomość"
          />
          <button type="submit">Wyślij</button>
          {error && <div className="error">{error}</div>}
      </form>
  );
}


function Gallery() {
  const images = [
    process.env.PUBLIC_URL + '/images/0_1.png',
    process.env.PUBLIC_URL + '/images/0_2.png',
    // ... (dodaj więcej ścieżek do zdjęć, jeśli są dostępne)
  ];

  return (
    <div className="gallery">
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Example ${index + 1}`} />
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <section className="contact-form">
        <ContactForm />
      </section>
      <Gallery />
      {/* ... (reszta kodu bez zmian) */}
    </div>
  );
}

export default App;
