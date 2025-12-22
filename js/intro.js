const video = document.getElementById("introVideo");
const button = document.getElementById("openInvitation");

video.addEventListener("timeupdate", () => {
    if (video.currentTime >= 6) {
        button.classList.add("show");
    }
});
/* ===== LOGIKA PENERUS NAMA (TAMBAHKAN INI) ===== */
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');

if (guestName) {
    // Jika ada nama tamu di URL index.html, selipkan ke link tombol
    button.href = `invitation.html?to=${encodeURIComponent(guestName)}`;
}