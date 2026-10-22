// Dapatkan semua elemen layar utama
const mainMenuScreen = document.getElementById('main-menu');
const gameScreen = document.getElementById('game-screen');
const profileScreen = document.getElementById('profile-screen');
const infoScreen = document.getElementById('info-screen');

// Dapatkan semua elemen layar untuk game "Mencocokkan Warna & Bentuk"
const levelSelectColorShapeScreen = document.getElementById('level-select-color-shape-screen');
const gamePlayColorShapeScreen = document.getElementById('game-play-color-shape-screen');

// Dapatkan tombol-tombol menu utama
const startGameButton = document.getElementById('start-game');
const playerProfileButton = document.getElementById('player-profile');
const aboutInfoButton = document.getElementById('about-info');

// Dapatkan tombol untuk masuk ke game "Mencocokkan Warna & Bentuk"
const colorShapeGameButton = document.getElementById('game-color-shape');

// Dapatkan semua tombol kembali dari semua layar
const backButtons = document.querySelectorAll('.back-button');

// --- FUNGSI UTAMA UNTUK NAVIGASI ---

// Fungsi untuk menampilkan layar yang dipilih dan menyembunyikan yang lain
function showScreen(screenToShow) {
    const allScreens = [
        mainMenuScreen,
        gameScreen,
        profileScreen,
        infoScreen,
        levelSelectColorShapeScreen,
        gamePlayColorShapeScreen
    ];
    allScreens.forEach(screen => {
        screen.classList.add('hidden');
    });
    screenToShow.classList.remove('hidden');
}

// --- PENGATURAN EVENT LISTENER UNTUK TOMBOL ---

// Tambahkan "pendengar" ke setiap tombol menu utama
startGameButton.addEventListener('click', () => {
    showScreen(gameScreen);
});

playerProfileButton.addEventListener('click', () => {
    showScreen(profileScreen);
});

aboutInfoButton.addEventListener('click', () => {
    showScreen(infoScreen);
});

// Tambahkan pendengar untuk tombol game "Mencocokkan Warna & Bentuk"
colorShapeGameButton.addEventListener('click', () => {
    showScreen(levelSelectColorShapeScreen);
});

// Tambahkan "pendengar" ke semua tombol kembali
backButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Logika untuk menentukan harus kembali ke layar mana
        const parentScreen = button.closest('.screen'); // Cari tahu tombol ini ada di layar mana
        
        if (parentScreen.id === 'game-play-color-shape-screen') {
            showScreen(levelSelectColorShapeScreen); // Dari game, kembali ke pilih level
        } else if (parentScreen.id === 'level-select-color-shape-screen') {
            showScreen(gameScreen); // Dari pilih level, kembali ke pilih game
        } else if (parentScreen.id === 'game-screen' || parentScreen.id === 'profile-screen' || parentScreen.id === 'info-screen') {
            showScreen(mainMenuScreen); // Dari layar lain, kembali ke menu utama
        }
    });
});

// Tampilkan layar menu utama saat pertama kali dimuat
showScreen(mainMenuScreen);