/* ===== NAMA TAMU ===== */
const params = new URLSearchParams(window.location.search);
const nama = params.get("to");
if (nama) {
  document.getElementById("namaTamu").innerText = decodeURIComponent(nama);
}

/* ===== COUNTDOWN ===== */
const targetDate = new Date("2026-01-11T00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;
  if (diff <= 0) return;

  document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("hours").innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").innerText = Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById("seconds").innerText = Math.floor((diff / 1000) % 60);
}, 1000);

/* ===== COPY REKENING ===== */
function copyRek() {
  navigator.clipboard.writeText(document.getElementById("rekening").innerText);
  alert("Nomor rekening disalin");
}

/* ===== REVEAL ON SCROLL ===== */
function reveal() {
  document.querySelectorAll(".reveal").forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 120) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

function spawnLove(container) {
  const love = document.createElement("span");
  love.className = "love";
  love.innerHTML = "❤";

  // MENGATUR POSISI AGAR TIDAK TERLALU MEPET PINGGIR (Pas untuk Mobile)
  // Kita gunakan rentang 5% sampai 15% dari sisi samping
  const randomSidePos = Math.floor(Math.random() * 10) + 5; // antara 5% - 15%
  
  if (Math.random() < 0.5) {
      love.style.left = randomSidePos + "%";
  } else {
      love.style.right = randomSidePos + "%";
  }

  // Variasi ukuran & waktu agar terlihat alami
  const size = Math.random() * 12 + 15 + "px";
  love.style.fontSize = size;
  love.style.animationDuration = Math.random() * 1 + 3 + "s"; // antara 3s - 4s

  container.appendChild(love);

  // Hapus elemen setelah animasi selesai agar tidak memberatkan HP
  setTimeout(() => {
      love.remove();
  }, 4500);
}

const heartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      const container = entry.target.querySelector('.love-container');
      if (!container) return;

      if (entry.isIntersecting) {
          // LOOPING: Munculkan hati setiap 400ms (0.4 detik)
          // Ini akan membuat sekitar 8-10 hati muncul bersamaan di layar
          if (!entry.target.heartInterval) {
              entry.target.heartInterval = setInterval(() => {
                  spawnLove(container);
              }, 400); 
          }
      } else {
          // Berhenti saat di-scroll ke halaman lain
          clearInterval(entry.target.heartInterval);
          entry.target.heartInterval = null;
      }
  });
}, { threshold: 0.2 });

// Daftarkan semua section
document.querySelectorAll('section').forEach(section => {
  if (section.querySelector('.love-container')) {
      heartObserver.observe(section);
  }
});

const audio = document.getElementById("bgMusic");
const audioBtn = document.getElementById("audioBtn");

let isPlaying = false;

/* AUTOPLAY SAH (SETELAH USER TAP) */
function startAudio() {
  if (isPlaying) return;

  audio.volume = 0.8;
  audio.play().then(() => {
    isPlaying = true;
    audioBtn.innerText = "🔊";
  }).catch(() => {
    console.log("Autoplay blocked");
  });
}

/* TRIGGER GESTURE YANG SAH */
["click", "touchstart"].forEach(evt => {
  document.addEventListener(evt, startAudio, { once: true });
});

/* TOGGLE AUDIO */
audioBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    audioBtn.innerText = "🔊";
  } else {
    audio.pause();
    audioBtn.innerText = "🔇";
  }
});
