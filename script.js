// script.js

// Get references to the modal and its elements
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');

// Function to open the modal with a clicked image
function openModal(imageUrl) {
    modal.style.display = 'block';
    modalImage.src = imageUrl;
}

// Function to close the modal
closeModal.onclick = function() {
    modal.style.display = 'none';
};

// Add your images to the grid with appropriate URLs
const imageUrls = [
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/aP1050813.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/aP1050828.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/aP1050832.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/aP1050893.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/aP1050932.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/sokak%20lambas%C4%B1%20deneme%202.png',
    // Add more image URLs here
];

// Get a reference to the gallery container
const gallery = document.querySelector('.gallery');

// Create image elements for each URL and add them to the gallery
imageUrls.forEach(url => {
    const image = document.createElement('img');
    image.src = url;
    // Attach a click event to open the modal when the image is clicked
    image.onclick = () => openModal(url);
    gallery.appendChild(image);
});