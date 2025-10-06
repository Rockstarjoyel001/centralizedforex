(function(){
  let FLAG_WIDTH = parseInt(localStorage.getItem("FLAG_WIDTH")) || 80;
  let FLAG_HEIGHT = parseInt(localStorage.getItem("FLAG_HEIGHT")) || 85;
  let CHUNK_SIZE = parseInt(localStorage.getItem("CHUNK_SIZE")) || 16; // number of visible rows
  let SCROLL_INTERVAL = parseInt(localStorage.getItem("CURRENCY_ROTATE_INTERVAL")) || 1000; // 5s
  let allRates = JSON.parse(localStorage.getItem("currencies")) || [];
  const tbody = document.getElementById("country-rates-body");
  if(!tbody) return; 
  let startIndex = 0;
  let currentChunk = [];
  function getNextChunk(){
    const chunk = [];
    for(let i=0; i<CHUNK_SIZE; i++){
      if(allRates.length === 0) break;
      const index = (startIndex + i) % allRates.length;
      chunk.push(allRates[index]);
    }
    return chunk;
  }
  function renderChunk(chunk){
    tbody.innerHTML = ''; // clear previous
    chunk.forEach(rate => {
      const tr = document.createElement("tr");
      const tdCurrency = document.createElement("td");
      tdCurrency.style.display = "flex";
      tdCurrency.style.alignItems = "center";
      tdCurrency.style.gap = "5px";
      const code = rate["Currency Code"] || "";
      const name = rate["Currency Name"] || "";
      const img = document.createElement("img");
      if(code) img.src = `/FLAGS/${code.slice(0,2).toLowerCase()}.png`;
      img.alt = name;
      img.width = FLAG_WIDTH;
      img.height = FLAG_HEIGHT;
      tdCurrency.appendChild(img);
      const span = document.createElement("span");
      span.textContent = name;
      tdCurrency.appendChild(span);
      tr.appendChild(tdCurrency);
      ["Buy Rate", "Sell Rate", "TTRemittance Rate"].forEach(key=>{
        const td = document.createElement("td");
        td.textContent = rate[key] || 0;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }
  currentChunk = getNextChunk();
  renderChunk(currentChunk);
  startIndex = (startIndex + 1) % allRates.length;
  setInterval(()=>{
    if(allRates.length === 0) return;
    currentChunk.shift();
    currentChunk.push(allRates[startIndex]);
    renderChunk(currentChunk);
    startIndex = (startIndex + 1) % allRates.length;
  }, SCROLL_INTERVAL);
})();