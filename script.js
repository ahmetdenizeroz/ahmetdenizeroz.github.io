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
    'image1.jpg',
    'image2.jpg',
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
