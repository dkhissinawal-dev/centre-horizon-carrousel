// ---------- Les photos du carrousel ----------
let photos = [
  { src: "images/groenland.jpg", title: "Fjord du Groenland", alt: "Fjord du Groenland" },
  { src: "images/vallée-rois.jpg", title: "La vallée des rois", alt: "La vallée des rois" },
  { src: "images/montagnes-chine.jpg", title: "Montagne chinoise", alt: "Montagne chinoise" },
  { src: "images/vallée-autriche.jpg", title: "Vallée autrichienne", alt: "Vallée autrichienne" },
  { src: "images/nouvelle-zelande.jpg", title: "Sources chaudes de Nouvelle-Zélande", alt: "Sources chaudes Nouvelle-Zélande" },
  { src: "images/machu-picchu.jpg", title: "Le Machu Picchu", alt: "Le Machu Picchu" }
];

// ---------- Les éléments de la page ----------
let toolbar = document.getElementById("toolbar");
let toolbarToggle = document.getElementById("toolbar-toggle");
let btnPrevious = document.getElementById("slider-previous");
let btnToggle = document.getElementById("slider-toggle");
let btnNext = document.getElementById("slider-next");
let btnRandom = document.getElementById("slider-random");
let image = document.getElementById("slider-image");
let title = document.getElementById("slider-title");
let counter = document.getElementById("slider-counter");

// ---------- Index et minuteur ----------
let index = 0;        // numéro de la photo affichée
let timer = null;     // le minuteur (null = pas de défilement)

// ---------- Afficher une photo ----------
function showPhoto() {
  image.src = photos[index].src;
  image.alt = photos[index].alt;
  title.textContent = photos[index].title;
  counter.textContent = (index + 1) + " / " + photos.length;
}

// ---------- Photo suivante (en boucle) ----------
function next() {
  index = index + 1;
  if (index >= photos.length) {
    index = 0;                 // après la dernière, on revient à la première
  }
  showPhoto();
}

// ---------- Photo précédente (en boucle) ----------
function previous() {
  index = index - 1;
  if (index < 0) {
    index = photos.length - 1; // avant la première, on va à la dernière
  }
  showPhoto();
}

// ---------- Photo aléatoire (jamais deux fois la même de suite) ----------
function random() {
  let newIndex = index;
  while (newIndex === index) {
    newIndex = Math.floor(Math.random() * photos.length);
  }
  index = newIndex;
  showPhoto();
}

// ---------- Démarrer / arrêter le défilement ----------
function startSlider() {
  if (timer === null) {                 // un seul minuteur à la fois
    timer = setInterval(next, 3000);    // toutes les 3 secondes
    btnToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
}

function stopSlider() {
  clearInterval(timer);
  timer = null;
  btnToggle.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function toggleSlider() {
  if (timer === null) {
    startSlider();
  } else {
    stopSlider();
  }
}

// ---------- Redémarrer le minuteur (si le défilement est actif) ----------
function resetTimer() {
  if (timer !== null) {
    clearInterval(timer);                // on arrête l'ancien minuteur
    timer = setInterval(next, 3000);     // on en relance un seul, de 3 secondes
  }
}

// ---------- Compteur ----------
function countSlider() {
  switch (photos) {
    case 1:
      counter = "1/6";
    case 2:
      counter = "2/6";
  }
}

// ---------- Les clics ----------
toolbarToggle.addEventListener("click", function (event) {
  event.preventDefault();               // le lien ne recharge pas la page
  toolbar.classList.toggle("hidden");
});
btnPrevious.addEventListener("click", function () {
  previous();
  resetTimer();
});
btnNext.addEventListener("click", function () {
  next();
  resetTimer();
});
btnRandom.addEventListener("click", function () {
  random();
  resetTimer();
});
btnToggle.addEventListener("click", toggleSlider);

// ---------- Les flèches du clavier ----------
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    next();
    resetTimer();
  } else if (event.key === "ArrowLeft") {
    previous();
    resetTimer();
  }
});

// ---------- Espace ----------
document.addEventListener("keydown", function (event) {
  if (event.key === " " && (timer === null)) {
    startSlider();
  } else if ((event.key === " ") && (timer !== null)) {
    stopSlider();
  }
});
// ---------- Au chargement ----------
showPhoto();
