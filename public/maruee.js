 const marquee = document.getElementById("marqueeText");
  const MARQUEE_KEY = "marqueeText";
  function loadMarquee() {
    const saved = localStorage.getItem(MARQUEE_KEY);
    if (saved !== null && saved.trim() !== "") {
      marquee.textContent = saved;
    }
  }
  function saveMarquee() {
    const value = marquee.textContent.trim();
    localStorage.setItem(MARQUEE_KEY, value);
    console.log("Saved marquee:", value);
  }
  marquee.addEventListener("click", () => {
    marquee.stop(); // stop marquee
    marquee.setAttribute("contenteditable", "true");
    marquee.focus();
  });
  marquee.addEventListener("blur", () => {
    marquee.removeAttribute("contenteditable");
    marquee.start(); 
    saveMarquee();
  });
  loadMarquee();