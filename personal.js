const desktop = document.querySelector(".desktop");
const card = document.querySelector(".card");
const windowBar = document.querySelector(".window-bar");
const trafficLights = document.querySelector(".traffic-lights");
// const closeButton = document.querySelector(".close");
// const minimizeButton = document.querySelector(".minimize");
// const maximizeButton = document.querySelector(".maximize");
// const openCard = document.querySelector(".open-card");
// const minimizedWindow = document.querySelector(".minimized-window");

// function showCard() {
//   card.hidden = false;
//   desktop.classList.remove("is-closed", "is-minimized");
// }

if (card && windowBar) {
  let originX = 0;
  let originY = 0;
  let startX = 0;
  let startY = 0;
  let dragging = false;

  trafficLights.addEventListener("pointerdown", (event) => event.stopPropagation());

  windowBar.addEventListener("pointerdown", (event) => {
    if (card.classList.contains("is-maximized")) return;
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    windowBar.setPointerCapture(event.pointerId);
    card.classList.add("is-dragging");
  });

  windowBar.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const x = originX + event.clientX - startX;
    const y = originY + event.clientY - startY;
    card.style.transform = `translate(${x}px, ${y}px)`;
  });

  const stopDragging = (event) => {
    if (!dragging) return;
    originX += event.clientX - startX;
    originY += event.clientY - startY;
    dragging = false;
    card.classList.remove("is-dragging");
    if (windowBar.hasPointerCapture(event.pointerId)) windowBar.releasePointerCapture(event.pointerId);
  };

  windowBar.addEventListener("pointerup", stopDragging);
  windowBar.addEventListener("pointercancel", stopDragging);
}

// closeButton.addEventListener("click", () => {
//   card.hidden = true;
//   desktop.classList.add("is-closed");
//   desktop.classList.remove("is-minimized");
// });

// minimizeButton.addEventListener("click", () => {
//   card.hidden = true;
//   desktop.classList.add("is-minimized");
//   desktop.classList.remove("is-closed");
// });

// maximizeButton.addEventListener("click", () => {
//   const maximized = card.classList.toggle("is-maximized");
//   maximizeButton.setAttribute("aria-pressed", maximized);
//   card.style.transform = "";
// });

// openCard.addEventListener("click", showCard);
// minimizedWindow.addEventListener("click", showCard);
