document.addEventListener("DOMContentLoaded", function () {
  const adContainer = document.getElementById("adContainer");
  const adsEnabled = localStorage.getItem("adsEnabled") === "true";

  if (adsEnabled) {
    adContainer.style.display = "flex";   // force show
  } else {
    adContainer.style.display = "none";   // force hide
  }

  console.log("adsEnabled =", adsEnabled, "| display =", adContainer.style.display);
});