// Variabel untuk melacak status game
let levelCompletionStatus = {}; // Untuk menyimpan level yg sudah selesai
let currentLevel = null;      // Untuk menyimpan level yg sedang aktif

// === LOGIKA GAME MENCOCOKKAN WARNA DAN BENTUK ===

// Dapatkan semua elemen yang dibutuhkan untuk game
const levelCards = document.querySelectorAll('.level-card');
const draggableShapes = document.querySelectorAll('.shape');
const dropZones = document.querySelectorAll('.drop-zone');
const feedbackMessage = document.getElementById('feedback-message');

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
    currentLevel = level; // Simpan level yang aktif

    // PERIKSA APAKAH LEVEL SUDAH SELESAI
    if (levelCompletionStatus[level]) {
        // Jika sudah, tampilkan notifikasi SweetAlert2
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
                resetLevel();
                showScreen(gamePlayColorShapeScreen);
            }
        });

    } else {
        // Jika level belum selesai, langsung mulai
        resetLevel();
        showScreen(gamePlayColorShapeScreen);
    }
}

function resetLevel() {
    console.log("Mereset level...");
    const shapeContainer = document.getElementById('shape-pieces-container');
    const blueSquare = document.getElementById('piece-blue-square');
    const redCircle = document.getElementById('piece-red-circle');

    // Kembalikan kepingan ke kontainer awal
    shapeContainer.appendChild(blueSquare);
    shapeContainer.appendChild(redCircle);
    
    // Aktifkan kembali semua kepingan
    const allShapes = [blueSquare, redCircle];
    allShapes.forEach(shape => {
        shape.setAttribute('draggable', 'true');
        shape.style.cursor = 'grab';
    });

    // Kosongkan area target dari isinya
    dropZones.forEach(zone => {
        if(zone.firstChild){
            zone.innerHTML = '';
        }
    });
}

// Tambahkan event listener untuk semua kepingan yang bisa diseret
draggableShapes.forEach(shape => {
    shape.addEventListener('dragstart', () => {
        shape.classList.add('dragging');
    });
    shape.addEventListener('dragend', () => {
        shape.classList.remove('dragging');
    });
});

// Tambahkan event listener untuk semua area target
dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggingShape = document.querySelector('.dragging');
        
        if (draggingShape.dataset.shape === zone.dataset.shape && draggingShape.dataset.color === zone.dataset.color) {
            zone.appendChild(draggingShape);
            draggingShape.setAttribute('draggable', 'false');
            draggingShape.style.cursor = 'default';
            checkWinCondition();
        } else {
            showFeedback('Ups, coba lagi! 🤔', 'error');
        }
    });
});

function checkWinCondition() {
    const filledZones = document.querySelectorAll('.drop-zone .shape');
    
    if (filledZones.length === dropZones.length) {
        levelCompletionStatus[currentLevel] = true;
        console.log("Status Penyelesaian Level:", levelCompletionStatus);
        
        // Ganti feedback dengan SweetAlert
        Swal.fire({
            title: 'Hore, Level Selesai!',
            text: 'Kamu Hebat! 🎉',
            icon: 'success',
            confirmButtonText: 'Lanjut'
        });
    }
}

// Fungsi untuk menampilkan pesan feedback (untuk pesan error singkat)
function showFeedback(message, type) {
    // Kita bisa tetap gunakan ini untuk feedback cepat seperti "Coba lagi"
    // atau menggantinya juga dengan SweetAlert jika diinginkan
    const feedbackEl = document.getElementById('feedback-message');
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback ${type}`;
    feedbackEl.classList.remove('hidden');

    setTimeout(() => {
        feedbackEl.classList.add('hidden');
    }, 1500);
}