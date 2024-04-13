// Get references to the modal and its elements
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');

// Define the names of the low and high-resolution image folders
const lowResFolder = 'low_res_pics';
const highResFolder = 'high_res_pics';

// Function to open the modal with a clicked image
function openModal(highResUrl) {
    modal.style.display = 'block';
    modalImage.src = highResUrl;
}

// Function to close the modal
closeModal.onclick = function() {
    modal.style.display = 'none';
};

// Fetch function to retrieve image URLs from the low-resolution folder
fetch('get_low_res_images.php')
    .then(response => response.json())
    .then(imageUrls => {
        // Get a reference to the gallery container
        const gallery = document.querySelector('.gallery');

        // Create image elements for each low-resolution URL and add them to the gallery
        imageUrls.forEach(url => {
            const image = document.createElement('img');
            image.src = url.lowRes;
            // Attach a click event to open the modal with the corresponding high-resolution image URL
            image.onclick = () => openModal(url.highRes);
            gallery.appendChild(image);
        });
    })
    .catch(error => console.error('Error fetching low-resolution images:', error));
