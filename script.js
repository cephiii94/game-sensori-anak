// Dapatkan semua elemen layar
const mainMenuScreen = document.getElementById('main-menu');
const gameScreen = document.getElementById('game-screen');
const profileScreen = document.getElementById('profile-screen');
const infoScreen = document.getElementById('info-screen');

// Dapatkan tombol-tombol menu
const startGameButton = document.getElementById('start-game');
const playerProfileButton = document.getElementById('player-profile');
const aboutInfoButton = document.getElementById('about-info');

// Dapatkan semua tombol kembali
const backButtons = document.querySelectorAll('.back-button');

// Fungsi untuk menampilkan layar yang dipilih dan menyembunyikan yang lain
function showScreen(screenToShow) {
    const allScreens = [mainMenuScreen, gameScreen, profileScreen, infoScreen];
    allScreens.forEach(screen => {
        screen.classList.add('hidden');
    });
    screenToShow.classList.remove('hidden');
}

// Tambahkan "pendengar" ke setiap tombol
startGameButton.addEventListener('click', () => {
    showScreen(gameScreen);
    // Di sini nanti kita akan memuat konten game
});

playerProfileButton.addEventListener('click', () => {
    showScreen(profileScreen);
});

aboutInfoButton.addEventListener('click', () => {
    showScreen(infoScreen);
});

// Tambahkan "pendengar" ke tombol kembali
backButtons.forEach(button => {
    button.addEventListener('click', () => {
        showScreen(mainMenuScreen);
    });
});

// Tampilkan layar menu utama saat pertama kali dimuat
showScreen(mainMenuScreen);