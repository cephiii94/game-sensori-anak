// Variabel untuk melacak status game
let levelCompletionStatus = {}; // Untuk menyimpan level yg sudah selesai
let currentLevel = null;      // Untuk menyimpan level yg sedang aktif

// "NASKAH" UNTUK SEMUA LEVEL
// Di sinilah Anda akan mendefinisikan semua level baru di masa depan.
const LEVEL_CONFIG = {
    '1': {
        pieces: [
            { id: 'piece-red-circle', shape: 'circle', color: 'red' },
            { id: 'piece-blue-square', shape: 'square', color: 'blue' }
        ]
    },
    '2': {
        pieces: [
            { id: 'piece-blue-square', shape: 'square', color: 'blue' },
            { id: 'piece-red-circle', shape: 'circle', color: 'red' }
            // Level 2 bisa kita buat sama, tapi mungkin urutan kepingannya terbalik
        ]
    },
    '3': {
        pieces: [
            { id: 'piece-red-circle', shape: 'circle', color: 'red' },
            { id: 'piece-blue-square', shape: 'square', color: 'blue' },
            { id: 'piece-green-triangle', shape: 'triangle', color: 'green' }
        ]
    }
    // Tambahkan Level 4, 5, dst. di sini
};

// Dapatkan elemen kartu level dari HTML
const levelCards = document.querySelectorAll('.level-card');

// Tambahkan event listener untuk setiap kartu level
levelCards.forEach(card => {
    if (!card.classList.contains('level-locked')) {
        card.addEventListener('click', () => {
            const level = card.dataset.level;
            startGameColorShape(level);
        });
    }
});

function startGameColorShape(level) {
    currentLevel = level;

    if (levelCompletionStatus[level]) {
        Swal.fire({
            title: 'Sudah Selesai!',
            text: "Level ini sudah pernah kamu selesaikan. Ingin main lagi?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4CAF50',
            cancelButtonColor: '#f44336',
            confirmButtonText: 'Ya, main lagi!',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if (result.isConfirmed) {
                generateLevel(level);
                showScreen(gamePlayColorShapeScreen);
            }
        });
    } else {
        generateLevel(level);
        showScreen(gamePlayColorShapeScreen);
    }
}

function generateLevel(level) {
    console.log(`Membangun level ${level}...`);
    
    const dropContainer = document.getElementById('drop-zones-container');
    const shapeContainer = document.getElementById('shape-pieces-container');

    dropContainer.innerHTML = '';
    shapeContainer.innerHTML = '';

    const levelData = LEVEL_CONFIG[level];
    if (!levelData) {
        console.error(`Data untuk level ${level} tidak ditemukan!`);
        return;
    }

    levelData.pieces.forEach(piece => {
        // Buat div untuk target (drop zone)
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.dataset.shape = piece.shape;
        dropZone.dataset.color = piece.color;
        if (piece.shape === 'triangle') dropZone.classList.add('triangle');

        // Buat div untuk kepingan (shape)
        const shape = document.createElement('div');
        shape.id = piece.id;
        shape.className = `shape ${piece.shape} ${piece.color}`;
        shape.draggable = true;
        shape.dataset.shape = piece.shape;
        shape.dataset.color = piece.color;
        
        dropContainer.appendChild(dropZone);
        shapeContainer.appendChild(shape);
    });

    // Tambahkan kembali event listener ke elemen-elemen yang baru dibuat
    addDragDropListeners();
}

function addDragDropListeners() {
    const newShapes = document.querySelectorAll('#game-play-color-shape-screen .shape');
    const newDropZones = document.querySelectorAll('#game-play-color-shape-screen .drop-zone');

    newShapes.forEach(shape => {
        shape.addEventListener('dragstart', () => shape.classList.add('dragging'));
        shape.addEventListener('dragend', () => shape.classList.remove('dragging'));
    });

    newDropZones.forEach(zone => {
        zone.addEventListener('dragover', e => e.preventDefault());
        zone.addEventListener('drop', e => {
            e.preventDefault();
            const draggingShape = document.querySelector('.dragging');
            
            if (draggingShape && draggingShape.dataset.shape === zone.dataset.shape && draggingShape.dataset.color === zone.dataset.color) {
                zone.appendChild(draggingShape);
                draggingShape.draggable = false;
                draggingShape.style.cursor = 'default';
                checkWinCondition();
            } else {
                showFeedback('Ups, coba lagi! 🤔', 'error');
            }
        });
    });
}

function checkWinCondition() {
    const totalZones = document.querySelectorAll('#game-play-color-shape-screen .drop-zone').length;
    const filledZones = document.querySelectorAll('#game-play-color-shape-screen .drop-zone .shape').length;
    
    // Periksa apakah semua target sudah terisi
    if (filledZones === totalZones && totalZones > 0) {
        levelCompletionStatus[currentLevel] = true;
        console.log("Status Penyelesaian Level:", levelCompletionStatus);

        // Cari tahu apakah ada level berikutnya
        const nextLevel = parseInt(currentLevel) + 1;
        const isNextLevelAvailable = !!LEVEL_CONFIG[nextLevel];

        // Siapkan konfigurasi untuk notifikasi
        let swalConfig = {
            title: 'Hore, Level Selesai!',
            text: 'Kamu Hebat! 🎉',
            icon: 'success',
            allowOutsideClick: false, // Mencegah pemain menutup notif tanpa memilih
            allowEscapeKey: false,
        };

        if (isNextLevelAvailable) {
            // Jika ada level berikutnya, tampilkan 2 tombol
            swalConfig.showDenyButton = true;
            swalConfig.confirmButtonText = `Lanjut ke Level ${nextLevel}`;
            swalConfig.denyButtonText = 'Pilih Level Lain';
        } else {
            // Jika ini level terakhir, hanya tampilkan 1 tombol
            swalConfig.title = 'Selamat!';
            swalConfig.text = 'Kamu telah menyelesaikan semua level!';
            swalConfig.confirmButtonText = 'Kembali ke Menu';
        }

        // Tampilkan notifikasi dengan konfigurasi yang sudah disiapkan
        Swal.fire(swalConfig).then((result) => {
            if (result.isConfirmed) {
                // Jika pemain mengklik tombol utama ("Lanjut" atau "Kembali ke Menu")
                if (isNextLevelAvailable) {
                    startGameColorShape(nextLevel);
                } else {
                    showScreen(levelSelectColorShapeScreen);
                }
            } else if (result.isDenied) {
                // Jika pemain mengklik tombol sekunder ("Pilih Level Lain")
                showScreen(levelSelectColorShapeScreen);
            }
        });
    }
}

function showFeedback(message, type) {
    const feedbackEl = document.getElementById('feedback-message');
    feedbackEl.textContent = message;
    // Kita tambahkan class `feedback` agar bisa diberi style umum jika perlu
    feedbackEl.className = `feedback ${type}`; 
    feedbackEl.classList.remove('hidden');

    setTimeout(() => {
        feedbackEl.classList.add('hidden');
    }, 1500);
}