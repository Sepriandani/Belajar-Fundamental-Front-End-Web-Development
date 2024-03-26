import './data.js'
import './title-app.js'
import './add-note.js'
import './notes-list.js';

function generateId() {
    return 'notes-' + Math.random().toString(36).substr(2, 9);
}

document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('noteForm');
    const noteTitleInput = document.getElementById('noteTitle');
    const noteBodyInput = document.getElementById('noteBody');
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');

    // Memanggil fungsi untuk menampilkan daftar catatan saat dokumen telah dimuat
    displayNotes();

    noteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = noteTitleInput.value;
        const body = noteBodyInput.value;

        if (title && body) {
            addNoteToList(title, body);
            noteTitleInput.value = '';
            noteBodyInput.value = '';
            errorMsg.style.display = 'none';
        } else {
            errorMsg.textContent = 'Please fill in both title and note.';
            errorMsg.style.display = 'block'; 
        }
    });

    // Menerapkan validasi real-time
    noteTitleInput.addEventListener('input', validateForm);
    noteBodyInput.addEventListener('input', validateForm);

    function validateForm() {
        const title = noteTitleInput.value;
        const body = noteBodyInput.value;

        if (title && body) {
            submitBtn.disabled = false;
            errorMsg.style.display = 'none';
        } else {
            submitBtn.disabled = true;
        }
    }

    // Fungsi untuk menampilkan daftar catatan
    function displayNotes() {
        const noteList = document.getElementById('noteList');
        noteList.innerHTML = '';

        notesData.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.body}</p>
                <small>Created at: ${new Date(note.createdAt).toLocaleString()}</small>
            `;
            noteList.appendChild(noteElement);
        });
    }

    // Fungsi untuk menambahkan catatan ke daftar dan data catatan
    function addNoteToList(title, body) {
        const newNote = {
            id: generateId(),
            title: title,
            body: body,
            createdAt: new Date().toISOString(),
            archived: false
        };

        notesData.push(newNote);

        const noteList = document.getElementById('noteList');
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <h3>${newNote.title}</h3>
            <p>${newNote.body}</p>
            <small>Created at: ${new Date(newNote.createdAt).toLocaleString()}</small>
        `;
        noteList.appendChild(noteElement);
    }
});
