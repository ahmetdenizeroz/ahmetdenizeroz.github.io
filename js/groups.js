const gallery = document.querySelector('.gallery');
const gap = 5; 

function calculateLayoutParameters() {
    const computedStyle = window.getComputedStyle(gallery);
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
    
    const availableWidth = gallery.offsetWidth - (paddingLeft + paddingRight);
    const screenQuarter = window.screen.width / 3;
    
    let columnCount;
    if (availableWidth <= 700) columnCount = 1;
    else if (availableWidth <= screenQuarter * 2) columnCount = 2;
    else columnCount = 3;

    const totalGaps = (columnCount - 1) * gap;
    let itemWidth = Math.floor((availableWidth - totalGaps) / columnCount);
    
    return { columnCount, itemWidth, paddingLeft };
}

function positionItems() {
    gallery.innerHTML = '';
    const { columnCount, itemWidth, paddingLeft } = calculateLayoutParameters();
    const columnHeights = new Array(columnCount).fill(0);

    coverUrls.forEach(item => {
        const scale = itemWidth / item.width;
        const itemHeight = Math.floor(item.height * scale);
        
        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
        const left = paddingLeft + (shortestColumn * (itemWidth + gap));
        const top = columnHeights[shortestColumn];
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.onclick = () => window.location.href = item.redirectTo;
        
        const imageElement = document.createElement('img');
        imageElement.src = item.lowRes;
        imageElement.alt = item.group;
        imageElement.loading = "lazy";
        
        const overlay = document.createElement('img');
        overlay.src = item.overlay || '';
        overlay.className = 'overlay-image';
        
        galleryItem.style.width = `${itemWidth}px`;
        galleryItem.style.height = `${itemHeight}px`;
        galleryItem.style.left = `${left}px`;
        galleryItem.style.top = `${top}px`;
        
        galleryItem.appendChild(imageElement);
        galleryItem.appendChild(overlay);
        gallery.appendChild(galleryItem);
        
        columnHeights[shortestColumn] += itemHeight + gap;
    });

    // Make sure container is tall enough to hold absolutely positioned kids
    gallery.style.height = `${Math.max(...columnHeights) + 50}px`;
}

// Initial positioning
positionItems();

// Layout resizing hook
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(positionItems, 200);
});
