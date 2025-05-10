const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');
const gallery = document.querySelector('.gallery');

// Constants
const galleryPadding = 10; // Matches your CSS padding
const gap = 5; // Your existing gap value between items
const minWidth = 0; // Minimum column width
const maxWidth = 500; // Maximum column width

function openModal(highResUrl) {
    modal.style.display = 'block';
    modalImage.src = highResUrl;
}

closeModal.onclick = function() {
    modal.style.display = 'none';
};

// Shuffle the images
imageUrls.sort(() => Math.random() - 0.5);

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function calculateLayoutParameters() {
    const availableWidth = gallery.offsetWidth - (2 * galleryPadding);
    const screenQuarter = window.screen.width / 4;
    
    // Calculate raw column count based on thresholds
    let columnCount;
    if (availableWidth <= 465) {
        columnCount = 1;
    } 
    else if (availableWidth <= screenQuarter * 2) {
        columnCount = 2;
    }
    else if (availableWidth <= screenQuarter * 3) {
        columnCount = 3;
    }
    else {
        columnCount = 4;
    }

    // Calculate required gaps (n-1 gaps between n columns)
    const totalGaps = (columnCount - 1) * gap;
    
    // Calculate and constrain item width
    let itemWidth = Math.floor((availableWidth - totalGaps) / columnCount);
    itemWidth = Math.min(maxWidth, Math.max(minWidth, itemWidth));

    // Verify the items actually fit
    const requiredWidth = (itemWidth * columnCount) + totalGaps;
    if (requiredWidth > availableWidth) {
        // If not, reduce column count
        columnCount = Math.max(1, columnCount - 1);
        return calculateLayoutParameters(); // Recursively recalculate
    }

    console.log('Available:', availableWidth, 
            'Columns:', columnCount, 
            'Item Width:', itemWidth, 
            'Required:', requiredWidth);

    return { columnCount, itemWidth };
}

function positionItems() {
    gallery.innerHTML = '';
    
    const { columnCount, itemWidth } = calculateLayoutParameters();
    const columnHeights = new Array(columnCount).fill(galleryPadding); // Initialize with top padding

    imageUrls.forEach(item => {
        // Calculate scaled height maintaining aspect ratio
        const scale = itemWidth / item.width;
        const itemHeight = Math.floor(item.height * scale);
        
        // Find shortest column
        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
        const left = galleryPadding + (shortestColumn * (itemWidth + gap));
        const top = columnHeights[shortestColumn];
        
        // Create gallery item
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        // Create image element
        const imageElement = document.createElement('img');
        imageElement.src = item.lowRes;
        imageElement.alt = `Photo ${item.lowRes.split('/').pop()}`;
        imageElement.loading = 'lazy';
        imageElement.onclick = () => openModal(item.highRes);
        
        // Position and size the item
        galleryItem.style.width = `${itemWidth}px`;
        galleryItem.style.height = `${itemHeight}px`;
        galleryItem.style.left = `${left}px`;
        galleryItem.style.top = `${top}px`;
        
        galleryItem.appendChild(imageElement);
        gallery.appendChild(galleryItem);
        
        // Update column height
        columnHeights[shortestColumn] += itemHeight + gap;
    });

    // Set gallery height (subtract last gap and add bottom padding)
    gallery.style.height = `${Math.max(...columnHeights) - gap + galleryPadding}px`;
}

// Initial positioning
positionItems();

// Debounced resize handler
window.addEventListener('resize', debounce(positionItems, 200));

// Close modal when clicking outside image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Debugging helper (optional)
function logDimensions() {
    console.log('Layout Parameters:', calculateLayoutParameters());
}