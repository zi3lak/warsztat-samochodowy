const images = [
    process.env.PUBLIC_URL + '/images/0_1.png',
    process.env.PUBLIC_URL + '/images/0_2.png',
    // ... (dodaj więcej ścieżek do zdjęć, jeśli są dostępne)
];

function Gallery() {
    return (
        <div className="gallery">
            {images.map((image, index) => (
                <img key={index} src={image} alt={`Example ${index + 1}`} />
            ))}
        </div>
    );
}

export default Gallery;
