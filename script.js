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

// Define low and high-resolution image URLs manually
const imageUrls = [
    { lowRes: 'low_res_pics/aP1050893.JPG', highRes: 'high_res_pics/aP1050893.JPG' },
    { lowRes: 'low_res_pics/aP1050895.JPG', highRes: 'high_res_pics/aP1050895.JPG' },
    // Add more image URLs as needed
];

// Get a reference to the gallery container
const gallery = document.querySelector('.gallery');

// Create image elements for each low-resolution URL and add them to the gallery
imageUrls.forEach(image => {
    const imageElement = document.createElement('img');
    imageElement.src = image.lowRes;
    // Attach a click event to open the modal with the corresponding high-resolution image URL
    imageElement.onclick = () => openModal(image.highRes);
    gallery.appendChild(imageElement);
});
