// --- Navigation ---
function showSection(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.btn').forEach(b => b.classList.remove('current'));
  btn.classList.add('current');
}

// --- Animation coeurs & cookies ---
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = window.innerHeight + "px";
  heart.style.animationDuration = (3 + Math.random() * 3) + "s";
  heart.style.transform = "rotate(45deg) scale("+(0.8+Math.random()*1.5)+")";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}

function createCookie() {
  const cookie = document.createElement("div");
  cookie.className = "cookie";
  cookie.style.left = Math.random() * window.innerWidth + "px";
  cookie.style.top = window.innerHeight + "px";
  cookie.style.animationDuration = (4 + Math.random() * 3) + "s";
  cookie.style.transform = "scale("+(0.7+Math.random()*1.3)+")";
  document.body.appendChild(cookie);
  setTimeout(() => cookie.remove(), 7000);
}

setInterval(createHeart, 400);
setInterval(createCookie, 400);

// --- Musique & Player ---
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  } else {
    audio.pause();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }
});

// Mettre à jour la barre de progression
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// Changer le temps via la barre
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Format mm:ss
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec % 60);
  if (seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
}
