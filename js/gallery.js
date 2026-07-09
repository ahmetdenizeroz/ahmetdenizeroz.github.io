const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');
const gallery = document.querySelector('.gallery');
const titleElem = document.getElementById('gallery-title');
const audioElem = document.getElementById('ambient-audio');
const audioSource = audioElem.querySelector('source');

// Constants for layout
const galleryPadding = 20; 
const gap = 8; 
const minWidth = 0; 
const maxWidth = 600; 

// ==========================================
// 🚨 CLOUDINARY CONFIGURATION (UPDATE THIS)
// ==========================================
const CLOUD_NAME = "tr37crea"; 

// 1. Identify which category the user clicked on
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category') || 'all';

// Update Title
titleElem.textContent = category + " Collection";

// Set Ambient Audio (if you have mapped audio inside assets/audio/)
audioSource.src = `assets/audio/${category}.mp3`;
audioElem.load(); 

let imageUrls = [];

// Fetch files remotely from Cloudinary
async function loadImagesFromCloudinary() {
    try {
        let allResources = [];

        // If 'all', we fetch a unified list from multiple predefined tags
        if (category === 'all') {
            const tagsToFetch = ["animals", "erasmus", "luxembourg", "objects", "others", "frankfurt"];
            const fetchPromises = tagsToFetch.map(tag => 
                fetch(`https://res.cloudinary.com/${CLOUD_NAME}/image/list/${tag}.json`).then(req => req.ok ? req.json() : null)
            );
            const allDataResults = await Promise.all(fetchPromises);
            
            allDataResults.forEach(data => {
                if (data && data.resources) allResources = allResources.concat(data.resources);
            });
            // Shuffle
            allResources.sort(() => Math.random() - 0.5);
        } else {
            // Fetch the specific tag
            const listUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${category}.json`;
            const response = await fetch(listUrl);
            if(response.ok) {
                const data = await response.json();
                allResources = data.resources;
            }
        }

        // Formulate Cloudinary robust URLs
        imageUrls = allResources.map(img => {
            return {
                lowRes: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_500,q_auto,f_auto/${img.public_id}.${img.format}`,
                highRes: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto/${img.public_id}.${img.format}`,
                width: img.width,
                height: img.height
            };
        });

        if (imageUrls.length === 0) {
            gallery.innerHTML = "<p style='text-align:center;width:100%;margin-top:50px;'>No images found for this category. Check your Cloudinary tags and permissions!</p>";
            return;
        }

        positionItems();

    } catch (error) {
        gallery.innerHTML = "<p style='text-align:center;width:100%;margin-top:50px;'>Failed to load images from Cloud. Did you set your CLOUD_NAME and enable Resource Lists?</p>";
        console.error("Cloudinary Fetch Error:", error);
    }
}

// Layout Engine
function calculateLayoutParameters() {
    const availableWidth = gallery.offsetWidth - (2 * galleryPadding);
    const screenWidth = window.screen.width;
    
    let columnCount;
    if (availableWidth <= 600) columnCount = 1;
    else if (availableWidth <= 900) columnCount = 2;
    else if (availableWidth <= 1200) columnCount = 3;
    else columnCount = 4;

    const totalGaps = (columnCount - 1) * gap;
    let itemWidth = Math.floor((availableWidth - totalGaps) / columnCount);
    itemWidth = Math.min(maxWidth, Math.max(minWidth, itemWidth));

    const requiredWidth = (itemWidth * columnCount) + totalGaps;
    if (requiredWidth > availableWidth) {
        columnCount = Math.max(1, columnCount - 1);
        return calculateLayoutParameters();
    }
    return { columnCount, itemWidth };
}

function positionItems() {
    gallery.innerHTML = '';
    const { columnCount, itemWidth } = calculateLayoutParameters();
    const columnHeights = new Array(columnCount).fill(galleryPadding); 

    imageUrls.forEach(item => {
        const scale = itemWidth / item.width;
        const itemHeight = Math.floor(item.height * scale);
        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
        const left = galleryPadding + (shortestColumn * (itemWidth + gap));
        const top = columnHeights[shortestColumn];
        
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const imageElement = document.createElement('img');
        imageElement.src = item.lowRes;
        imageElement.loading = 'lazy';
        imageElement.onclick = () => {
            modal.style.display = 'block';
            modalImage.src = item.highRes;
        };
        
        galleryItem.style.width = `${itemWidth}px`;
        galleryItem.style.height = `${itemHeight}px`;
        galleryItem.style.left = `${left}px`;
        galleryItem.style.top = `${top}px`;
        
        galleryItem.appendChild(imageElement);
        gallery.appendChild(galleryItem);
        
        columnHeights[shortestColumn] += itemHeight + gap;
    });

    gallery.style.height = `${Math.max(...columnHeights) - gap + galleryPadding}px`;
}

// Debounce resizes
let timeout;
window.addEventListener('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(positionItems, 200);
});

closeModal.onclick = () => modal.style.display = 'none';
modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

// Start the engine
loadImagesFromCloudinary();
