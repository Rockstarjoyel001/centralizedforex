(function(){
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettings = document.getElementById('closeSettings');
  settingsBtn.addEventListener('click', () => {
    settingsModal.style.display = 'block';
    loadDisplaySettings();
  });
  closeSettings.addEventListener('click', () => settingsModal.style.display = 'none');
  window.addEventListener('click', e => { if(e.target === settingsModal) settingsModal.style.display = 'none'; });
  const chunkSizeInput = document.getElementById('chunkSizeInput');
  const flagWidthInput = document.getElementById('flagWidthInput');
  const flagHeightInput = document.getElementById('flagHeightInput');
  const scrollIntervalInput = document.getElementById('scrollIntervalInput');
  const saveBtn = document.getElementById('saveDisplaySettingsBtn');
  const status = document.getElementById('displaySettingsStatus');
  function loadDisplaySettings(){
    chunkSizeInput.value = parseInt(localStorage.getItem("CHUNK_SIZE")) || 16;
    flagWidthInput.value = parseInt(localStorage.getItem("FLAG_WIDTH")) || 80;
    flagHeightInput.value = parseInt(localStorage.getItem("FLAG_HEIGHT")) || 85;
    scrollIntervalInput.value = (parseInt(localStorage.getItem("CURRENCY_ROTATE_INTERVAL")) || 1000)/1000; // convert ms to seconds
  }
  saveBtn.addEventListener('click', ()=>{
    const chunkSize = parseInt(chunkSizeInput.value) || 16;
    const flagWidth = parseInt(flagWidthInput.value) || 80;
    const flagHeight = parseInt(flagHeightInput.value) || 85;
    const intervalSeconds = parseFloat(scrollIntervalInput.value) || 1;
    localStorage.setItem("CHUNK_SIZE", chunkSize);
    localStorage.setItem("FLAG_WIDTH", flagWidth);
    localStorage.setItem("FLAG_HEIGHT", flagHeight);
    localStorage.setItem("CURRENCY_ROTATE_INTERVAL", Math.round(intervalSeconds*1000)); // convert to ms
    status.textContent = "Display settings saved!";
    setTimeout(()=>{status.textContent='';}, 3000);
  });
})();