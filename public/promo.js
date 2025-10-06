let uploadedAds = []; // temporary storage for preview

const adInput = document.getElementById('adFilesInput');
const adsPreview = document.getElementById('adsPreview');

// Preview uploaded files immediately
adInput.addEventListener('change', () => {
    const files = Array.from(adInput.files);
    
    files.forEach(file => {
        const maxSize = 5 * 1024 * 1024; // 5MB max for localStorage
        if (file.size > maxSize) {
            alert(`${file.name} is too large to save locally. Max size: 5MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const fileData = { name: file.name, type: file.type, data: e.target.result };
            uploadedAds.push(fileData);
            renderPreview(); // refresh preview
        }
        reader.readAsDataURL(file); // converts to Base64
    });
});

// Function to render preview
function renderPreview() {
    adsPreview.innerHTML = '';
    uploadedAds.forEach(file => {
        if (file.type.startsWith('image')) {
            const img = document.createElement('img');
            img.src = file.data;
            img.style.width = '120px';
            img.style.height = 'auto';
            img.style.border = '1px solid #ccc';
            img.style.borderRadius = '5px';
            adsPreview.appendChild(img);
        } else if (file.type.startsWith('video')) {
            const video = document.createElement('video');
            video.src = file.data;
            video.controls = true;
            video.style.width = '200px';
            video.style.height = 'auto';
            video.style.border = '1px solid #ccc';
            video.style.borderRadius = '5px';
            adsPreview.appendChild(video);
        }
    });
}

// Save ads to localStorage
document.getElementById('saveAdsBtn').addEventListener('click', () => {
    const enableAds = document.getElementById('enableAdsCheckbox').checked;
    localStorage.setItem('adsEnabled', enableAds);

    try {
        localStorage.setItem('adsFiles', JSON.stringify(uploadedAds));
        document.getElementById('adsStatus').textContent = 'Ads saved successfully!';
    } catch(e) {
        alert('Failed to save ads. Videos/images may be too large for localStorage.');
        console.error(e);
    }
});

// Load ads on page load
function loadAds() {
    const adsEnabled = localStorage.getItem('adsEnabled') === 'true';
    document.getElementById('enableAdsCheckbox').checked = adsEnabled;

    const savedAds = JSON.parse(localStorage.getItem('adsFiles') || '[]');
    if (savedAds.length) {
        uploadedAds = savedAds; // load saved ads for preview
        renderPreview();
    }
}

// Initial load
loadAds();
