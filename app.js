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

$("open-btn").addEventListener("click", () => {
  $("envelope").hidden = true;
  $("card").hidden = false;
  musicBtn.hidden = false;
  music.play().then(() => { musicBtn.textContent = "🔊"; }).catch(() => {});
});

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play().catch(() => {});
    musicBtn.textContent = "🔊";
  } else {
    music.pause();
    musicBtn.textContent = "🔇";
  }
});
