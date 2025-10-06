
const uploadBtn = document.getElementById('uploadCsvBtn');
const fileInput = document.getElementById('currencyCsvInput');
const csvStatus = document.getElementById('csvStatus');
const previewHead = document.getElementById('previewHead');
const previewBody = document.getElementById('previewBody');
function renderPreview(data) {
  previewHead.innerHTML = '';
  previewBody.innerHTML = '';
  if(!data.length) return;
  const headers = Object.keys(data[0]);
  previewHead.innerHTML = '<tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr>';
  previewBody.innerHTML = data.map(row => '<tr>' + headers.map(h => `<td>${row[h]}</td>`).join('') + '</tr>').join('');
}
function loadStoredCurrencies() {
  const stored = localStorage.getItem('currencies');
  if(stored){
    const data = JSON.parse(stored);
    renderPreview(data);
  } else {
    previewHead.innerHTML = '';
    previewBody.innerHTML = '';
  }
}
uploadBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if(!file){
    csvStatus.style.color = 'red';
    csvStatus.textContent = 'Please select a CSV file first!';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e){
    const text = e.target.result.trim();
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== '');
    if(!lines.length) return;
    const delimiter = lines[0].includes(',') ? ',' : '\t';
    const headers = lines[0].split(delimiter).map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(delimiter).map(v => v.trim());
      let obj = {};
      headers.forEach((h,i) => obj[h] = values[i]);
      return obj;
    });
    localStorage.setItem('currencies', JSON.stringify(data));
    renderPreview(data);
    csvStatus.style.color = 'green';
    csvStatus.textContent = 'CSV uploaded and saved successfully!';
  };
  reader.readAsText(file);
});