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
    { lowRes: 'low_res_pics/Hor1.JPG', highRes: 'high_res_pics/Hor1.JPG' },
    { lowRes: 'low_res_pics/Hor2.jpg', highRes: 'high_res_pics/Hor2.JPG' },
    { lowRes: 'low_res_pics/Hor3.jpg', highRes: 'high_res_pics/Hor3.JPG' },
    { lowRes: 'low_res_pics/Hor4.jpg', highRes: 'high_res_pics/Hor4.JPG' },
    { lowRes: 'low_res_pics/Hor5.jpg', highRes: 'high_res_pics/Hor5.JPG' },
    { lowRes: 'low_res_pics/Hor6.jpg', highRes: 'high_res_pics/Hor6.JPG' },
    { lowRes: 'low_res_pics/Hor7.jpg', highRes: 'high_res_pics/Hor7.JPG' },
    { lowRes: 'low_res_pics/Hor8.jpg', highRes: 'high_res_pics/Hor8.JPG' },
    { lowRes: 'low_res_pics/Hor9.jpg', highRes: 'high_res_pics/Hor9.JPG' },
    { lowRes: 'low_res_pics/Hor10.jpg', highRes: 'high_res_pics/Hor10.JPG' },
    { lowRes: 'low_res_pics/Hor11.jpg', highRes: 'high_res_pics/Hor11.JPG' },
    { lowRes: 'low_res_pics/Hor12.jpg', highRes: 'high_res_pics/Hor12.JPG' },
    { lowRes: 'low_res_pics/Hor13.jpg', highRes: 'high_res_pics/Hor13.JPG' },
    { lowRes: 'low_res_pics/Hor14.jpg', highRes: 'high_res_pics/Hor14.JPG' },
    { lowRes: 'low_res_pics/Hor15.jpg', highRes: 'high_res_pics/Hor15.JPG' },
    { lowRes: 'low_res_pics/Hor16.jpg', highRes: 'high_res_pics/Hor16.JPG' },
    { lowRes: 'low_res_pics/Hor17.jpg', highRes: 'high_res_pics/Hor17.png' },
    { lowRes: 'low_res_pics/Hor18.jpg', highRes: 'high_res_pics/Hor18.JPG' },
    { lowRes: 'low_res_pics/Hor19.jpg', highRes: 'high_res_pics/Hor19.JPG' },
    { lowRes: 'low_res_pics/Hor20.jpg', highRes: 'high_res_pics/Hor20.JPG' },
    { lowRes: 'low_res_pics/Hor21.jpg', highRes: 'high_res_pics/Hor21.JPG' },
    { lowRes: 'low_res_pics/Hor22.jpg', highRes: 'high_res_pics/Hor22.JPG' },
    { lowRes: 'low_res_pics/Hor23.jpg', highRes: 'high_res_pics/Hor23.JPG' },
    { lowRes: 'low_res_pics/Hor24.jpg', highRes: 'high_res_pics/Hor24.JPG' },
    { lowRes: 'low_res_pics/Hor25.jpg', highRes: 'high_res_pics/Hor25.JPG' },
    { lowRes: 'low_res_pics/Hor26.jpg', highRes: 'high_res_pics/Hor26.JPG' },
    
    { lowRes: 'low_res_pics/Ver1.JPG', highRes: 'high_res_pics/Ver1.JPG' },
    { lowRes: 'low_res_pics/Ver2.jpg', highRes: 'high_res_pics/Ver2.JPG' },
    { lowRes: 'low_res_pics/Ver3.jpg', highRes: 'high_res_pics/Ver3.JPG' },
    { lowRes: 'low_res_pics/Ver4.jpg', highRes: 'high_res_pics/Ver4.JPG' },
    { lowRes: 'low_res_pics/Ver5.jpg', highRes: 'high_res_pics/Ver5.JPG' },
    { lowRes: 'low_res_pics/Ver6.jpg', highRes: 'high_res_pics/Ver6.JPG' },
    { lowRes: 'low_res_pics/Ver7.jpg', highRes: 'high_res_pics/Ver7.JPG' },
    { lowRes: 'low_res_pics/Ver8.jpg', highRes: 'high_res_pics/Ver8.JPG' },
    { lowRes: 'low_res_pics/Ver9.jpg', highRes: 'high_res_pics/Ver9.JPG' },
    { lowRes: 'low_res_pics/Ver10.jpg', highRes: 'high_res_pics/Ver10.JPG' },
    { lowRes: 'low_res_pics/Ver11.jpg', highRes: 'high_res_pics/Ver11.JPG' },
    { lowRes: 'low_res_pics/Ver12.jpg', highRes: 'high_res_pics/Ver12.JPG' },
    { lowRes: 'low_res_pics/Ver13.jpg', highRes: 'high_res_pics/Ver13.JPG' },
    { lowRes: 'low_res_pics/Ver14.jpg', highRes: 'high_res_pics/Ver14.JPG' },
    { lowRes: 'low_res_pics/Ver15.jpg', highRes: 'high_res_pics/Ver15.JPG' },
    { lowRes: 'low_res_pics/Ver16.jpg', highRes: 'high_res_pics/Ver16.JPG' },
    { lowRes: 'low_res_pics/Ver17.jpg', highRes: 'high_res_pics/Ver17.JPG' },
    { lowRes: 'low_res_pics/Ver18.jpg', highRes: 'high_res_pics/Ver18.JPG' },
    { lowRes: 'low_res_pics/Ver19.jpg', highRes: 'high_res_pics/Ver19.JPG' },
    { lowRes: 'low_res_pics/Ver20.jpg', highRes: 'high_res_pics/Ver20.JPG' },


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
