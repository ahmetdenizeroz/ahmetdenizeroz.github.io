const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');
const gallery = document.querySelector('.gallery');

// Constants
//const galleryPaddingsides = 150;   // Matches your CSS padding
//const galleryPaddingtopbot = 10; // Matches your CSS padding
const gap = 5; // Your existing gap value between items
const minWidth = 0; // Minimum column width
const maxWidth = 500; // Maximum column width

// Define galleryItemsData in global scope
let galleryItemsData = []; // Use let to allow reassignment

// Detect mobile device (simple heuristic based on screen width)
function isMobile() {
    return window.innerWidth <= 465; // Matches your CSS media query
}

function openModal(highResUrl) {
    modal.style.display = 'block';
    modalImage.src = highResUrl;
}

closeModal.onclick = function() {
    modal.style.display = 'none';
};

function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

function calculateLayoutParameters() {
    // Get computed padding from CSS
    const computedStyle = window.getComputedStyle(gallery);
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;

    const availableWidth = gallery.offsetWidth - (paddingLeft + paddingRight);
    const screenQuarter = window.screen.width / 3;
    
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

    return { columnCount, itemWidth, paddingTop, paddingBottom, paddingLeft, paddingRight};
}

function positionItems() {
    gallery.innerHTML = '';
    
    const { columnCount, itemWidth, paddingTop, paddingBottom, paddingLeft, paddingRight } = calculateLayoutParameters();
    const columnHeights = new Array(columnCount).fill(paddingTop); // Initialize with top padding

    // Store items for scroll handling
    galleryItemsData = [];

    imageUrls.forEach(item => {
        // Calculate scaled height maintaining aspect ratio
        const scale = itemWidth / item.width;
        const itemHeight = Math.floor(item.height * scale);
        
        // Find shortest column
        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
        const left = paddingLeft + (shortestColumn * (itemWidth + gap));
        const top = columnHeights[shortestColumn];
        
        // Create gallery item
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        // Create main image element
        const imageElement = document.createElement('img');
        imageElement.src = item.lowRes;
        imageElement.alt = `Cover for ${item.group || 'Group'}`;
        imageElement.loading = 'lazy';
        imageElement.onclick = () => {
            if (item.redirectTo) {
                window.location.href = item.redirectTo;
            } else {
                openModal(item.highRes);
            }
        };
        
        // Create overlay image element
        const overlayImage = document.createElement('img');
        overlayImage.src = item.overlay || 'overlays/default-overlay.png'; // Fallback to default overlay
        overlayImage.className = 'overlay-image';
        overlayImage.alt = 'Overlay';
        overlayImage.loading = 'lazy'; // Optimize loading
        
        // Append both images to the gallery item
        galleryItem.appendChild(imageElement);
        galleryItem.appendChild(overlayImage);
        gallery.appendChild(galleryItem);
        
        // Position and size the item
        galleryItem.style.width = `${itemWidth}px`;
        galleryItem.style.height = `${itemHeight}px`;
        galleryItem.style.left = `${left}px`;
        galleryItem.style.top = `${top}px`;
        
        // Store item data for scroll handling
        galleryItemsData.push({
            element: galleryItem,
            overlay: overlayImage,
            top: top,
            height: itemHeight,
            midpoint: top + (itemHeight / 2) // Calculate vertical midpoint
        });

        // Update column height
        columnHeights[shortestColumn] += itemHeight + gap;
    });

    // Set gallery height (subtract last gap and add bottom padding)
    gallery.style.height = `${Math.max(...columnHeights) - gap + paddingBottom}px`;
}

// Initial positioning
positionItems();

// Handle overlay visibility on mobile scroll
    if (isMobile()) {
        const showOverlayOnScroll = debounce(() => {
            const viewportHeight = window.innerHeight;
            const viewportCenter = window.scrollY + (viewportHeight / 2);

            let closestItem = null;
            let minDistance = Infinity;

            // Find item with midpoint closest to viewport center
            galleryItemsData.forEach(item => {
                const distance = Math.abs(item.midpoint - viewportCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestItem = item;
                }
            });

            // Hide all overlays
            galleryItemsData.forEach(item => {
                item.overlay.style.display = 'none';
                item.overlay.style.opacity = '0';
            });

            // Show overlay for closest item if within threshold (e.g., 100px)
            if (closestItem && minDistance < 100) {
                closestItem.overlay.style.display = 'block';
                closestItem.overlay.style.opacity = '1';
            }
        }, 100);

        // Run initially and on scroll
        showOverlayOnScroll();
        window.addEventListener('scroll', showOverlayOnScroll);

        // Clean up scroll listener on resize to avoid duplicate listeners
        window.addEventListener('resize', () => {
            window.removeEventListener('scroll', showOverlayOnScroll);
        });
    }

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