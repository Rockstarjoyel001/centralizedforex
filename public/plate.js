const nameplate = document.getElementById('nameplate');
  const nameplateInput = document.getElementById('nameplateFontSizeInput');
  const saveBtn = document.getElementById('saveTableSettingsBtn');
  const status = document.getElementById('tableSettingsStatus');
  let savedFontSize = localStorage.getItem('nameplateFontSize') || '24';
  nameplate.style.fontSize = savedFontSize + 'px';
  nameplateInput.value = savedFontSize;
  saveBtn.addEventListener('click', () => {
    let newFontSize = nameplateInput.value;
    if (newFontSize && !isNaN(newFontSize)) {
      nameplate.style.fontSize = newFontSize + 'px';
      localStorage.setItem('nameplateFontSize', newFontSize);
      status.textContent = `Nameplate font size saved: ${newFontSize}px`;
      setTimeout(() => { status.textContent = ''; }, 3000);
    } else {
      status.textContent = 'Enter a valid number';
      setTimeout(() => { status.textContent = ''; }, 3000);
    }
  });