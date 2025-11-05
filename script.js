// Pixelated effect on photo
const photo = document.querySelector(".photo");
const cardContent = document.querySelector(".card-content");

// Create canvas for pixelation
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.transition = "opacity 0.4s ease";
canvas.style.zIndex = "1";

let pixelSize = 24;

function pixelateImage() {
  const w = photo.naturalWidth || photo.width;
  const h = photo.naturalHeight || photo.height;

  canvas.width = w;
  canvas.height = h;

  // Draw pixelated version
  ctx.imageSmoothingEnabled = false;

  // Draw image small
  ctx.drawImage(photo, 0, 0, w / pixelSize, h / pixelSize);
  // Scale up
  ctx.drawImage(canvas, 0, 0, w / pixelSize, h / pixelSize, 0, 0, w, h);
}

photo.addEventListener("load", () => {
  cardContent.appendChild(canvas);
  pixelateImage();
});

// If image already loaded
if (photo.complete) {
  cardContent.appendChild(canvas);
  pixelateImage();
}

// Redraw on window resize
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    pixelateImage();
  }, 100);
});

const photoCard = document.querySelector(".photo-card");
photoCard.addEventListener("mouseenter", () => {
  canvas.style.opacity = "0";
});

photoCard.addEventListener("mouseleave", () => {
  canvas.style.opacity = "1";
});
