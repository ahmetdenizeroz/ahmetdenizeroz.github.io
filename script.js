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
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820002.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820007.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820008.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820010.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820014.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820015.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820016.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820020.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820021.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820022.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820028.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820031.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820032.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820033.JPG',
    'https://github.com/ahmetdenizeroz/ahmetdenizeroz.github.io/raw/main/84820036.JPG',
];

// Get a reference to the gallery container
const gallery = document.querySelector('.gallery');
const gallery = document.querySelector('.gallery-item');

// Create image elements for each URL and add them to the gallery
imageUrls.forEach(url => {
    const image = document.createElement('img');
    image.src = url;
    // Attach a click event to open the modal when the image is clicked
    image.onclick = () => openModal(url);
    gallery.appendChild(image);
});
