// ================= HARD CODED SETTINGS =================
const branchName = "KARAMA";

// Fetch saved settings from localStorage or use default values
let adsEnabled = JSON.parse(localStorage.getItem('adsEnabled') ?? 'true');
let adInterval = parseInt(localStorage.getItem('adInterval') ?? '10000');       // Time ads are shown/hidden
let adRotateInterval = parseInt(localStorage.getItem('adRotateInterval') ?? '1000'); // Time between ad rotation
let displayInterval = parseInt(localStorage.getItem('displayInterval') ?? '1000');   // Currency row rotation

console.log({
    adsEnabled,
    adInterval,
    adRotateInterval,
    displayInterval
});

let adCurrentlyVisible = false;
let currentIndex = 0;
const tableBody = document.getElementById("country-rates-body");

// ================= DYNAMIC DISPLAY SETTINGS =================
let FLAG_WIDTH = parseInt(localStorage.getItem("FLAG_WIDTH")) || 40;
let FLAG_HEIGHT = parseInt(localStorage.getItem("FLAG_HEIGHT")) || 30;
let TD_FONT_SIZE = localStorage.getItem("TD_FONT_SIZE") || "20px";

// ================= LOAD CURRENCIES FROM LOCAL STORAGE =================
let storedCurrencies = localStorage.getItem("currencies");
let branchData = [];

if (storedCurrencies) {
  try {
    const parsed = JSON.parse(storedCurrencies);

    if (Array.isArray(parsed) && parsed.length > 0) {
      branchData = parsed.map((cur, index) => {
        const code = cur["Currency Code"] || "";
        const flagFile = code.slice(0, 2).toLowerCase() + ".png";
        return {
          CountryName: cur["Currency Name"],
          CURRENCY_NAME_ARABIC: cur["Currency Name Arabic"] || "",
          FlagUrl: `http://localhost:3000/FLAGS/${flagFile}`,
          BuyRate: cur["Buy Rate"] || "",
          SellRate: cur["Sell Rate"] || "",
          TTRemittanceRate: cur["TTRemittance Rate"] || "",
          BranchName: branchName,
          Order: index
        };
      });
    } else {
      console.warn("Currency list is empty. Loading default currency.");
      branchData = [getDefaultCurrency()];
    }
  } catch (e) {
    console.error("Error parsing currencies from localStorage", e);
    branchData = [getDefaultCurrency()];
  }
} else {
  console.warn("No stored currencies found. Loading default currency.");
  branchData = [getDefaultCurrency()];
}

// Default currency generator
function getDefaultCurrency() {
  return {
    CountryName: "HONG KONG DOLLAR",
    CURRENCY_NAME_ARABIC: "",
    FlagUrl: "http://localhost:3000/FLAGS/HK.png",
    BuyRate: "24.09",
    SellRate: "0.56",
    TTRemittanceRate: "1.00",
    BranchName: branchName,
    Order: 0
  };
}
// ================= LOAD ADS =================
let uploadedAds = JSON.parse(localStorage.getItem('adsFiles') || '[]');
let currentAdIndex = 0;

// ================= AD FUNCTIONS =================
function showAd() {
  const adSection = document.querySelector('.ad-section');
  const table = document.querySelector('table');
  if (!adSection) return;

  adSection.style.display = 'flex';
  adSection.style.justifyContent = 'center';
  adSection.style.alignItems = 'center';
  adSection.style.overflow = 'hidden';
  adSection.style.width = '100%';
  adSection.style.height = '150px'; // adjust as needed

  if (table) table.style.marginBottom = '40px';
  adCurrentlyVisible = true;

  refreshChunkDisplay();
  replaceAd();
}


function hideAd() {
  const adSection = document.querySelector('.ad-section');
  const table = document.querySelector('table');
  if (!adSection) return;

  adSection.style.display = 'none';
  if (table) table.style.marginBottom = '0';
  adCurrentlyVisible = false;

  refreshChunkDisplay();
}

function startAdCycle() {
  if (!adsEnabled || uploadedAds.length === 0) {
    hideAd();
    return;
  }

  showAd();
  setTimeout(() => {
    hideAd();
    setTimeout(startAdCycle, adInterval);
  }, adInterval);
}

function replaceAd() {
  const adSection = document.querySelector('.ad-section');
  if (!adsEnabled || uploadedAds.length === 0 || !adSection || !adCurrentlyVisible) return;

  adSection.innerHTML = '';

  const currentAd = uploadedAds[currentAdIndex];
  let element;

  if (currentAd.type.startsWith('image')) {
    element = document.createElement('img');
    element.src = currentAd.data;
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.objectFit = 'cover'; // <-- fill the container completely
  } else if (currentAd.type.startsWith('video')) {
    element = document.createElement('video');
    element.src = currentAd.data;
    element.autoplay = true;
    element.loop = true;
    element.muted = true;
    element.controls = false;
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.objectFit = 'cover'; // <-- fill the container completely
    element.play();
  }

  adSection.appendChild(element);

  currentAdIndex = (currentAdIndex + 1) % uploadedAds.length;
  setTimeout(replaceAd, adRotateInterval);
}

// ================= TABLE FUNCTIONS =================
function getChunkSize(width, height) {
  const isAdVisible = adsEnabled && adCurrentlyVisible;
  if (width <= 720 && height <= 480) return isAdVisible ? 3 : 8;
  if (width <= 800 && height <= 600) return isAdVisible ? 2 : 5;
  if (width <= 1024 && height <= 768) return isAdVisible ? 5 : 7;
  if (width <= 1152 && height <= 864) return isAdVisible ? 7 : 9;
  if (width <= 1176 && height <= 664) return isAdVisible ? 8 : 10;
  if (width <= 1280 && height <= 720) return isAdVisible ? 9 : 11;
  if (width <= 1280 && height <= 768) return isAdVisible ? 9 : 11;
  if (width <= 1280 && height <= 800) return isAdVisible ? 9 : 11;
  if (width <= 1280 && height <= 960) return isAdVisible ? 9 : 11;
  if (width <= 1280 && height <= 1024) return isAdVisible ? 9 : 12;
  if (width <= 1360 && height <= 768) return isAdVisible ? 8 : 9;
  if (width <= 1366 && height <= 768) return isAdVisible ? 8 : 9;
  if (width <= 1400 && height <= 1050) return isAdVisible ? 8 : 10;
  if (width <= 1440 && height <= 900) return isAdVisible ? 8 : 10;
  if (width <= 1600 && height <= 900) return isAdVisible ? 10 : 12;
  if (width <= 1600 && height <= 1024) return isAdVisible ? 10 : 12;
  if (width <= 1680 && height <= 1050) return isAdVisible ? 11 : 13;
  if (width <= 1768 && height <= 992) return isAdVisible ? 12 : 13;
  if (width <= 1920 && height <= 1080) return isAdVisible ? 13 : 15;
  if (width <= 2560 && height <= 1440) return isAdVisible ? 9 : 11;
  if (width <= 3840 && height <= 2160) return isAdVisible ? 10 : 12;
  return isAdVisible ? 13 : 6;
}

function createRow(country) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class="country-data" style="font-size:${TD_FONT_SIZE}">
      <img src="${country.FlagUrl}" alt="${country.CountryName} Flag" class="flag" width="${FLAG_WIDTH}" height="${FLAG_HEIGHT}">
      <span class="country-name">
        ${country.CountryName}
        ${country.CURRENCY_NAME_ARABIC ? `<span class="currency-arabic"> / <span class="arabic-text">${country.CURRENCY_NAME_ARABIC}</span></span>` : ''}
      </span>
    </td>
    <td style="font-size:${TD_FONT_SIZE}">${country.BuyRate || ''}</td>
    <td style="font-size:${TD_FONT_SIZE}">${country.SellRate || ''}</td>
    <td style="font-size:${TD_FONT_SIZE}">${country.TTRemittanceRate || ''}</td>
  `;
  return row;
}

function refreshChunkDisplay() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const chunkSize = getChunkSize(width, height);

  if (!branchData.length) return;

  currentIndex = 0;
  tableBody.innerHTML = "";

  for (let i = 0; i < chunkSize; i++) {
    const index = (currentIndex + i) % branchData.length;
    const row = createRow(branchData[index]);
    tableBody.appendChild(row);
  }

  currentIndex = (currentIndex + chunkSize) % branchData.length;
}

function rotateRows() {
  const nextData = branchData[currentIndex];
  currentIndex = (currentIndex + 1) % branchData.length;

  if (tableBody.rows.length > 0) {
    tableBody.deleteRow(0);
  }

  const newRow = createRow(nextData);
  tableBody.appendChild(newRow);

  setTimeout(rotateRows, displayInterval);
}

// ================= START =================
window.onload = function() {
  refreshChunkDisplay();
  rotateRows();

  if (adsEnabled && uploadedAds.length > 0) {
    startAdCycle(); // show/hide ads
  } else {
    hideAd();
  }
};




  const marquee = document.getElementById("marqueeText");
  const STORAGE_KEY = "marqueeTextValue";

  // Load saved text from localStorage
  const savedText = localStorage.getItem(STORAGE_KEY);
  if(savedText) {
    marquee.textContent = savedText;
  }

  // Function to make marquee editable
  function makeEditable() {
    // Stop scrolling
    marquee.stop();

    // Make content editable
    marquee.contentEditable = true;
    marquee.focus();

    // Save changes on Enter key or blur
    function saveChanges(event) {
      if(event.type === "blur" || event.key === "Enter") {
        event.preventDefault();
        marquee.contentEditable = false;
        localStorage.setItem(STORAGE_KEY, marquee.textContent);
        marquee.start();
        marquee.removeEventListener("blur", saveChanges);
        marquee.removeEventListener("keydown", saveChanges);
      }
    }

    marquee.addEventListener("blur", saveChanges);
    marquee.addEventListener("keydown", saveChanges);
  }

  // Click to edit
  marquee.addEventListener("click", makeEditable);















  // ================= DYNAMIC SETTINGS =================
let NAMEPLATE_FONT_SIZE = localStorage.getItem("NAMEPLATE_FONT_SIZE") || "25px";
function updateNameplate() {
  const nameplate = document.querySelector(".nameplate");
  if (!nameplate) return;
  nameplate.style.fontSize = NAMEPLATE_FONT_SIZE;
}

// Call this on page load
window.onload = function() {
  updateNameplate();
  refreshChunkDisplay();
  rotateRows();

  if (adsEnabled) {
    startAdCycle();
    // replaceImage();
  } else {
    hideAd();
  }
};














const branchNameSpan = document.getElementById('branch-name');

  // Load branch name from localStorage
  const savedBranch = localStorage.getItem('branchName') || 'CAUSEWAY BAY';
  branchNameSpan.textContent = savedBranch;

  // Make branch name editable on click
  branchNameSpan.addEventListener('click', () => {
    const currentText = branchNameSpan.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.fontWeight = 'bold';
    input.style.fontFamily = "'Saira', sans-serif";
    input.style.fontSize = 'inherit';
    input.style.width = 'auto';
    input.style.minWidth = '150px';
    input.style.background = 'transparent';
    input.style.color = 'white';
    // Replace span with input
    branchNameSpan.replaceWith(input);
    input.focus();

    // Save value on blur or Enter
    const saveBranch = () => {
      const newName = input.value.trim() || 'Default Branch';
      localStorage.setItem('branchName', newName);

      branchNameSpan.textContent = newName;
      input.replaceWith(branchNameSpan);
    };

    input.addEventListener('blur', saveBranch);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        saveBranch();
      }
    });
  });



            // Function to update the timestamp
           function updateTimestamp() {
            const now = new Date();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const monthName = months[now.getMonth()];
const day = now.getDate(); // No leading zero
const year = now.getFullYear();

let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12 || 12; // 0 becomes 12

const formattedDate = `${monthName} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
document.getElementById('update-time').textContent = 'UPDATED AS ON: ' + formattedDate;

}



  // Call the function to set the current date and time
  updateTimestamp();





 const headerSettingsBtn = document.getElementById('headerSettingsBtn');
    const headerSettingsModal = document.getElementById('headerSettingsModal');
    const closeHeaderModal = document.getElementById('closeHeaderModal');
    const headerModalOverlay = document.getElementById('headerModalOverlay');
    const settingsForm = document.getElementById('settingsForm');

    // Open modal & load saved values from localStorage
    headerSettingsBtn.addEventListener('click', () => {
        document.getElementById('adsEnabled').checked = JSON.parse(localStorage.getItem('adsEnabled') ?? 'true');
        document.getElementById('adInterval').value = localStorage.getItem('adInterval') ?? 10000;
        document.getElementById('adRotateInterval').value = localStorage.getItem('adRotateInterval') ?? 1000;
        document.getElementById('displayInterval').value = localStorage.getItem('displayInterval') ?? 1000;

        headerSettingsModal.style.display = 'block';
        headerModalOverlay.style.display = 'block';
    });

    // Close modal
    closeHeaderModal.addEventListener('click', () => {
        headerSettingsModal.style.display = 'none';
        headerModalOverlay.style.display = 'none';
    });
    headerModalOverlay.addEventListener('click', () => {
        headerSettingsModal.style.display = 'none';
        headerModalOverlay.style.display = 'none';
    });

    // Save settings to localStorage
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('adsEnabled', document.getElementById('adsEnabled').checked);
        localStorage.setItem('adInterval', parseInt(document.getElementById('adInterval').value));
        localStorage.setItem('adRotateInterval', parseInt(document.getElementById('adRotateInterval').value));
        localStorage.setItem('displayInterval', parseInt(document.getElementById('displayInterval').value));

        console.log('Settings saved!');
        headerSettingsModal.style.display = 'none';
        headerModalOverlay.style.display = 'none';
    });






     function resizeTitle() {
    const title = document.getElementById('title');
    const screenWidth = window.innerWidth;

    let fontSize;

    if (screenWidth >= 1200) {         // Desktop
      fontSize = '36px';
    } else if (screenWidth >= 992) {   // Laptop
      fontSize = '30px';
    } else if (screenWidth >= 768) {   // Tablet
      fontSize = '24px';
    } else {                           // Mobile
      fontSize = '18px';
    }

    title.style.fontSize = fontSize;
  }

  // Run on load
  resizeTitle();

  // Run on window resize
  window.addEventListener('resize', resizeTitle);





  // References
const currencyCsvInput = document.getElementById('currencyCsvInput');
const currencyPreview = document.getElementById('currencyPreview');

// Load existing currencies from localStorage
let currencies = JSON.parse(localStorage.getItem('currencies') || '[]');

// Function to render table preview
function renderCurrencyPreview(data) {
    if (!data || !data.length) {
        currencyPreview.innerHTML = '<i>No currency data uploaded</i>';
        return;
    }

    let html = '<table style="width:100%; border-collapse: collapse;">';
    html += '<tr>';
    Object.keys(data[0]).forEach(key => {
        html += `<th style="border: 1px solid #ccc; padding: 4px;">${key}</th>`;
    });
    html += '</tr>';

    data.forEach(row => {
        html += '<tr>';
        Object.values(row).forEach(val => {
            html += `<td style="border: 1px solid #ccc; padding: 4px;">${val}</td>`;
        });
        html += '</tr>';
    });

    html += '</table>';
    currencyPreview.innerHTML = html;
}

// Initialize preview if data exists
renderCurrencyPreview(currencies);

// CSV Parsing
currencyCsvInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const text = event.target.result;
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const obj = {};
            headers.forEach((h, i) => obj[h] = values[i]);
            return obj;
        });

        currencies = data;
        renderCurrencyPreview(currencies);
        localStorage.setItem('currencies', JSON.stringify(currencies));
    };
    reader.readAsText(file);
});

// Save other settings
settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    localStorage.setItem('adsEnabled', document.getElementById('adsEnabled').checked);
    localStorage.setItem('adInterval', parseInt(document.getElementById('adInterval').value, 10));
    localStorage.setItem('adRotateInterval', parseInt(document.getElementById('adRotateInterval').value, 10));
    localStorage.setItem('displayInterval', parseInt(document.getElementById('displayInterval').value, 10));
    
    // currencies are already saved on CSV upload
    console.log('Settings saved!');
});





document.addEventListener("DOMContentLoaded", () => {
    const adsInput = document.getElementById('adsFilesInput');
    const adsPreview = document.getElementById('adsPreview');
    const settingsForm = document.getElementById('settingsForm');

    // Load adsFiles from localStorage if present
    let adsFiles = JSON.parse(localStorage.getItem('adsFiles') || '[]');
    renderAdsPreview();

    // Function to render preview
    function renderAdsPreview() {
        if (adsFiles.length === 0) {
            adsPreview.innerHTML = '<i>No ads uploaded</i>';
            return;
        }

        adsPreview.innerHTML = '';
        adsFiles.forEach((file, index) => {
            const div = document.createElement('div');
            div.style.marginBottom = '10px';
            div.style.display = 'flex';
            div.style.alignItems = 'center';
            div.style.gap = '10px';

            // Determine if image or video
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = file.data;
                img.style.width = '80px';
                img.style.height = '50px';
                img.style.objectFit = 'cover';
                div.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = file.data;
                video.controls = true;
                video.style.width = '120px';
                video.style.height = '70px';
                div.appendChild(video);
            }

            // Add filename text
            const span = document.createElement('span');
            span.textContent = file.name;
            div.appendChild(span);

            // Add delete button
            const delBtn = document.createElement('button');
            delBtn.textContent = '❌';
            delBtn.style.cursor = 'pointer';
            delBtn.onclick = () => {
                adsFiles.splice(index, 1);
                localStorage.setItem('adsFiles', JSON.stringify(adsFiles));
                renderAdsPreview();
            };
            div.appendChild(delBtn);

            adsPreview.appendChild(div);
        });
    }

    // Handle file upload
    adsInput.addEventListener('change', () => {
        const files = Array.from(adsInput.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = e => {
                adsFiles.push({
                    name: file.name,
                    type: file.type,
                    data: e.target.result
                });
                localStorage.setItem('adsFiles', JSON.stringify(adsFiles));
                renderAdsPreview();
            };
            reader.readAsDataURL(file);
        });

        // Reset input so same file can be uploaded again if needed
        adsInput.value = '';
    });

    // Optional: Save settings form normally
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Save other settings like adsEnabled, adInterval, etc.
        localStorage.setItem('adsEnabled', document.getElementById('adsEnabled').checked);
        localStorage.setItem('adInterval', document.getElementById('adInterval').value);
        localStorage.setItem('adRotateInterval', document.getElementById('adRotateInterval').value);
        localStorage.setItem('displayInterval', document.getElementById('displayInterval').value);

        console.log('Settings saved!');
    });
});