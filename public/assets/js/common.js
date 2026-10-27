const loadingScreen = document.getElementById("loading-screen");
const loadingTextEl = document.getElementById("loading-text");
if (loadingTextEl) {
  const loadingTexts = ["Bunnies", "bunnz", "v2", "hop on"];
  loadingTextEl.textContent = loadingTexts[Math.floor(Math.random() * loadingTexts.length)];
}
if (loadingScreen) {
  const hideLoading = () => {
    loadingScreen.classList.add("hidden");
    setTimeout(() => {
      loadingScreen.remove();
    }, 650);
  };

  if (document.readyState === "complete") {
    hideLoading();
  } else {
    window.addEventListener("load", hideLoading, { once: true });
  }
}
