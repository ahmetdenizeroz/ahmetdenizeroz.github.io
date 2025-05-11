const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');
const gallery = document.querySelector('.gallery');

function openModal(highResUrl) {
    modal.style.display = 'block';
    modalImage.src = highResUrl;
}

closeModal.onclick = function() {
    modal.style.display = 'none';
};

// Shuffle the imageUrls array to randomize the order (optional for covers)
//imageUrls.sort(() => Math.random() - 0.5);

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function positionItems() {
    // Clear existing gallery items
    gallery.innerHTML = '';

    const galleryWidth = gallery.offsetWidth;
    const maxWidth = 350;
    const minWidth = 200;
    const gap = 5;

    // Calculate number of columns based on gallery width
    const columnCount = Math.max(1, Math.floor((galleryWidth + gap) / (maxWidth + gap)));
    const columnWidth = (galleryWidth - (columnCount - 1) * gap) / columnCount;

    // Ensure columnWidth is within minWidth and maxWidth
    const effectiveWidth = Math.min(maxWidth, Math.max(minWidth, columnWidth));

    // Array to track column heights
    const columnHeights = new Array(columnCount).fill(0);

    // Position each gallery item (cover image)
    imageUrls.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';

        const imageElement = document.createElement('img');
        imageElement.src = item.lowRes;
        imageElement.alt = `Cover for ${item.group || 'Group'}`;
        imageElement.loading = 'lazy';
        imageElement.onclick = () => {
            if (item.redirectTo) {
                // Redirect to the explicitly defined group page
                window.location.href = item.redirectTo;
            } else {
                openModal(item.highRes);
            }
        };

        galleryItem.appendChild(imageElement);
        gallery.appendChild(galleryItem);

        // Scale dimensions to fit effectiveWidth
        const scale = effectiveWidth / item.width;
        const scaledWidth = effectiveWidth;
        const scaledHeight = item.height * scale;

        // Find the shortest column
        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
        const left = shortestColumn * (effectiveWidth + gap);
        const top = columnHeights[shortestColumn];

        galleryItem.style.width = `${scaledWidth}px`;
        galleryItem.style.height = `${scaledHeight}px`;
        galleryItem.style.left = `${left}px`;
        galleryItem.style.top = `${top}px`;

        // Update the column height
        columnHeights[shortestColumn] += scaledHeight + gap;
    });

    // Set gallery height to accommodate all items
    gallery.style.height = `${Math.max(...columnHeights)}px`;
}

// Initial positioning
positionItems();

// Debounced resize handler
window.addEventListener('resize', debounce(positionItems, 200));

// Close modal on click outside image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});