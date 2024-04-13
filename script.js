// script.js

// Get references to the modal and its elements
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');

// Function to open the modal with a clicked image
function openModal(highResUrl) {
    modal.style.display = 'block';
    modalImage.src = highResUrl;
}

// Function to close the modal
closeModal.onclick = function() {
    modal.style.display = 'none';
};

// Add your low-resolution images to the grid with appropriate URLs
const lowResImageUrls = [
    'low-res-image-1.jpg',
    'low-res-image-2.jpg',
    // Add more low-resolution image URLs as needed
];

// Add your high-resolution images to a separate array with appropriate URLs
const highResImageUrls = [
    'high-res-image-1.jpg',
    'high-res-image-2.jpg',
    // Add more high-resolution image URLs in the same order as low-resolution images
];

// Get a reference to the gallery container
const gallery = document.querySelector('.gallery');

// Create image elements for each low-resolution URL and add them to the gallery
lowResImageUrls.forEach((lowResUrl, index) => {
    const image = document.createElement('img');
    image.src = lowResUrl;
    // Attach a click event to open the modal with the corresponding high-resolution image URL
    image.onclick = () => openModal(highResImageUrls[index]);
    gallery.appendChild(image);
});
