const TAKEOFF = new Date("2026-11-29T10:30:00+07:00");
const $ = (id) => document.getElementById(id);

function tick() {
  const ms = TAKEOFF - Date.now();
  if (ms <= 0) {
    $("cd-val").textContent = "🎓 Hôm nay rồi! Hẹn gặp mọi người!";
    clearInterval(timer);
    return;
  }
  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const pad = (n) => String(n).padStart(2, "0");
  $("cd-val").textContent = `${d} ngày ${pad(h)}:${pad(m)}:${pad(s % 60)}`;
}
const timer = setInterval(tick, 1000);
tick();

const music = $("music");
const musicBtn = $("music-btn");

// Cánh hoa / ánh vàng rơi nhẹ ở nền
for (let i = 0; i < 24; i++) {
  const p = document.createElement("span");
  p.className = "petal";
  p.style.left = Math.random() * 100 + "vw";
  p.style.animationDuration = 6 + Math.random() * 6 + "s";
  p.style.animationDelay = -Math.random() * 10 + "s";
  p.style.opacity = 0.25 + Math.random() * 0.45;
  $("petals").appendChild(p);
}

function confetti() {
  const colors = ["#c99a45", "#8b1e24", "#fdf8ee", "#e8b04a"];
  for (let i = 0; i < 55; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = 2 + Math.random() * 2 + "s";
    c.style.animationDelay = Math.random() * 0.4 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4500);
  }
}

let opened = false;
const openTipTimer = setTimeout(() => {
  if (!opened) $("open-tip").hidden = false;
}, 15000);

function openCard() {
  if (opened) return;
  opened = true;
  clearTimeout(openTipTimer);
  $("open-tip").hidden = true;
  $("envelope").hidden = true;
  $("card").hidden = false;
  musicBtn.hidden = false;
  confetti();
  music.play().then(() => { musicBtn.textContent = "🔊"; }).catch(() => {});
}

const openBtn = $("open-btn");
let startY = null;

openBtn.addEventListener("pointerdown", (e) => {
  startY = e.clientY;
  openBtn.setPointerCapture(e.pointerId);
});
openBtn.addEventListener("pointermove", (e) => {
  if (startY === null) return;
  const dy = Math.min(0, e.clientY - startY);
  openBtn.style.transform = `translateY(${dy * 0.45}px)`;
  if (dy < -55) {
    startY = null;
    openCard();
  }
});
openBtn.addEventListener("pointerup", () => {
  if (startY !== null) {
    startY = null;
    openBtn.style.transform = "";
  }
});
openBtn.addEventListener("click", openCard);

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => {});
    musicBtn.textContent = "🔊";
  } else {
    music.pause();
    musicBtn.textContent = "🔇";
  }
});

$("to-back").addEventListener("click", () => {
  $("front-page").hidden = true;
  $("back-page").hidden = false;
});

$("to-front").addEventListener("click", () => {
  $("back-page").hidden = true;
  $("front-page").hidden = false;
});
