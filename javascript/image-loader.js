// Image URLs from Unsplash (free to use)
const imageUrls = {
    'hero/hero-farmer.jpg': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    // 'hero/farmer-with-tech.jpg': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // 'hero/farmer-harvest.jpg': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    // 'farmers/farmer-ai-assistant.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
    // 'farmers/farmer-rajesh.jpg': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    // 'farmers/farmer-lakshmi.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
    // 'about/about-1.jpg': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    // 'about/about-2.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
    // 'about/about-3.jpg': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    // 'about/about-4.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
    // 'reviews/review1.jpg': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    // 'reviews/review2.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000',
    // 'reviews/review3.jpg': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000'
};

// Function to create directories if they don't exist
function createDirectories() {
    const directories = ['images/hero', 'images/farmers', 'images/about', 'images/reviews'];
    directories.forEach(dir => {
        if (!localStorage.getItem(dir)) {
            localStorage.setItem(dir, '{}');
        }
    });
}

// Function to download and cache images
async function downloadAndCacheImage(path, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const blob = await response.blob();
        const reader = new FileReader();
        
        reader.onload = function() {
            // Store the base64 image in localStorage
            const base64Image = reader.result;
            const dir = path.split('/')[0];
            const images = JSON.parse(localStorage.getItem(`images/${dir}`) || '{}');
            images[path] = base64Image;
            localStorage.setItem(`images/${dir}`, JSON.stringify(images));
            
            // Update the image in the DOM
            updateImageInDOM(path, base64Image);
        };
        
        reader.readAsDataURL(blob);
    } catch (error) {
        console.error(`Error downloading image ${path}:`, error);
    }
}

// Function to update image in DOM
function updateImageInDOM(path, base64Image) {
    const imageElements = document.querySelectorAll(`img[src="/${path}"]`);
    imageElements.forEach(img => {
        img.src = base64Image;
    });
}

// Function to load cached images
function loadCachedImages() {
    const directories = ['hero', 'farmers', 'about', 'reviews'];
    directories.forEach(dir => {
        const cachedImages = JSON.parse(localStorage.getItem(`images/${dir}`) || '{}');
        Object.entries(cachedImages).forEach(([path, base64Image]) => {
            updateImageInDOM(path, base64Image);
        });
    });
}

// Initialize image loading
document.addEventListener('DOMContentLoaded', () => {
    createDirectories();
    loadCachedImages();
    
    // Download and cache new images
    Object.entries(imageUrls).forEach(([path, url]) => {
        const dir = path.split('/')[0];
        const images = JSON.parse(localStorage.getItem(`images/${dir}`) || '{}');
        if (!images[path]) {
            downloadAndCacheImage(path, url);
        }
    });
}); 