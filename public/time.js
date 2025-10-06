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
hours = hours % 12 || 12; 
const formattedDate = `${monthName} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
document.getElementById('update-time').textContent = 'UPDATED AS ON: ' + formattedDate;
}
  updateTimestamp();
      const updateTimeTd = document.getElementById("update-time");
  function formatDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
  }
  function updateTime() {
    updateTimeTd.textContent = "UPDATED AS ON: " + formatDateTime();
  }
  updateTime();
  setInterval(updateTime, 60000);