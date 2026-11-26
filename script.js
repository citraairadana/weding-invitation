// --- 1. PENGATURAN AUDIO & MUSIK LATAR ---
let bgMusic = document.getElementById("bg-music");
let btnMusik = document.getElementById("btn-musik");
let isPlaying = false;

function bukaUndangan() {
    document.getElementById("cover").style.display = "none";
    document.getElementById("konten").style.display = "block";
    
    if (bgMusic) {
        bgMusic.play().then(() => {
            isPlaying = true;
            btnMusik.style.display = "block";
        }).catch(err => {
            console.log("Autoplay dicegah browser: ", err);
        });
    }
}

function toggleMusik() {
    if (isPlaying) {
        bgMusic.pause();
        btnMusik.innerHTML = "🔇";
        isPlaying = false;
    } else {
        bgMusic.play();
        btnMusik.innerHTML = "🎵";
        isPlaying = true;
    }
}


// --- 2. FUNGSI SALIN REKENING / E-WALLET ---
function salinTeks(teks, pesanSukses) {
    navigator.clipboard.writeText(teks).then(() => {
        alert(pesanSukses + "\n" + teks);
    }).catch(err => {
        console.error('Gagal menyalin teks: ', err);
    });
}


// --- 3. FUNGSI HITUNG MUNDUR (COUNTDOWN) ---
const tanggalPernikahan = new Date("December 20, 2026 08:00:00").getTime();

const hitungMundur = setInterval(function() {
    const sekarang = new Date().getTime();
    const selisih = tanggalPernikahan - sekarang;

    if (selisih < 0) {
        clearInterval(hitungMundur);
        document.getElementById("hari").innerHTML = "00";
        document.getElementById("jam").innerHTML = "00";
        document.getElementById("menit").innerHTML = "00";
        document.getElementById("detik").innerHTML = "00";
        return;
    }

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    document.getElementById("hari").innerHTML = hari < 10 ? "0" + hari : hari;
    document.getElementById("jam").innerHTML = jam < 10 ? "0" + jam : jam;
    document.getElementById("menit").innerHTML = menit < 10 ? "0" + menit : menit;
    document.getElementById("detik").innerHTML = detik < 10 ? "0" + detik : detik;
}, 1000);


// --- 4. FUNGSI LIGHTBOX GALERI & AMBIL NAMA TAMU ---
document.addEventListener("DOMContentLoaded", function() {
    // Galeri foto klik untuk memperbesar
    const galeriImages = document.querySelectorAll(".galeri-item img");
    const modal = document.getElementById("modal-galeri");
    const modalImg = document.getElementById("img-perbesar");

    if (modal && modalImg) {
        galeriImages.forEach(img => {
            img.addEventListener("click", function() {
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });
    }

    // Ambil nama tamu dari URL (Parameter ?to=...)
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to');
    const tampilNamaTamu = document.getElementById("tampil-nama-tamu");

    if (namaTamu && tampilNamaTamu) {
        tampilNamaTamu.innerText = namaTamu.replace(/[\+_]/g, ' ');
    }
});

function tutupModal() {
    const modal = document.getElementById("modal-galeri");
    if (modal) {
        modal.style.display = "none";
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("modal-galeri");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// --- 5. FUNGSI KONFIRMASI KEHADIRAN & MUNCUL DI BAWAH ---
function kirimKonfirmasi(event) {
    event.preventDefault(); // Mencegah halaman reload

    let nama = document.getElementById("input-nama").value;
    let kehadiran = document.getElementById("input-kehadiran").value;
    let jumlah = document.getElementById("input-jumlah").value;
    let pesan = document.getElementById("input-pesan").value;

    let containerPesan = document.getElementById("container-pesan");

    // Jika ini adalah ucapan pertama, hapus teks panduan
    if (containerPesan && containerPesan.innerHTML.includes("Belum ada ucapan")) {
        containerPesan.innerHTML = "";
    }

    // Tentukan warna badge status kehadiran
    let warnaBadge = kehadiran === "Hadir" ? "#27ae60" : "#c0392b";

    // Buat elemen HTML kartu ucapan baru
    let cardUcapan = document.createElement("div");
    cardUcapan.style.cssText = "background: #fdfaf2; border: 1px solid #e6d5a9; padding: 12px 15px; border-radius: 8px; margin-bottom: 12px;";
    
    cardUcapan.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <strong style="font-size: 14px; color: #2c3e50;">${nama}</strong>
            <span style="background: ${warnaBadge}; color: white; font-size: 11px; padding: 2px 8px; border-radius: 4px;">${kehadiran} (${jumlah})</span>
        </div>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #555; line-height: 1.4;">"${pesan}"</p>
    `;

    // Masukkan kartu ucapan baru ke paling atas daftar
    if (containerPesan) {
        containerPesan.prepend(cardUcapan);
    }

    // Tampilkan pesan pop-up sukses
    alert(`Terima kasih, ${nama}! Konfirmasi dan ucapan Anda berhasil dikirim.`);

    // Reset/kosongkan kembali isi form
    event.target.reset();
}