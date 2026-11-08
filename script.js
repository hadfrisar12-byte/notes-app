// Ambil elemen dari HTML
const noteForm = document.getElementById("note-form");
const noteTitleInput = document.getElementById("note-title");
const noteContentInput = document.getElementById("note-content");
const notesList = document.getElementById("notes-list");

// Ambil data catatan yang sudah tersimpan di localStorage (jika ada)
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Tampilkan catatan saat halaman pertama kali dimuat
renderNotes();

// Event ketika form disubmit (tambah catatan)
noteForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah halaman reload otomatis

    const title = noteTitleInput.value.trim();
    const content = noteContentInput.value.trim();

    if (title && content) {
        const newNote = {
            id: Date.now(), // ID unik berdasarkan waktu
            title: title,
            content: content
        };

        notes.push(newNote);
        saveAndRender();

        // Kosongkan kembali form input
        noteTitleInput.value = "";
        noteContentInput.value = "";
    }
});

// Fungsi untuk menyimpan ke localStorage dan memperbarui tampilan
function saveAndRender() {
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

// Fungsi untuk menampilkan catatan ke HTML
function renderNotes() {
    notesList.innerHTML = ""; // Bersihkan kontainer sebelum merender ulang

    if (notes.length === 0) {
        notesList.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #888;">Belum ada catatan. Yuk buat catatan pertama Anda!</p>`;
        return;
    }

    notes.forEach((note) => {
        const noteCard = document.createElement("div");
        noteCard.classList.add("note-card");

        noteCard.innerHTML = `
            <div>
                <h3>${escapeHtml(note.title)}</h3>
                <p>${escapeHtml(note.content)}</p>
            </div>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Hapus</button>
        `;

        notesList.appendChild(noteCard);
    });
}

// Fungsi untuk menghapus catatan berdasarkan ID
function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);
    saveAndRender();
}

// Fungsi keamanan sederhana untuk mencegah injeksi teks HTML/script
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}