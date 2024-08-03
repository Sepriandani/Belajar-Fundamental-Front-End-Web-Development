import './js/data/local.js';
import './js/title-app.js';
import './js/add-note.js';
import './js/notes-list.js';
import './css/styles.css';
import { createNote, getNotes, deleteNote, archiveNote, getArchivedNotes, unarchiveNote } from './js/data/api.js';
import Swal from 'sweetalert2';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', async function () {
  const addNoteElement = document.querySelector('add-note');
  const noteForm = addNoteElement ? addNoteElement.querySelector('#noteForm') : null;
  const noteTitleInput = noteForm ? noteForm.querySelector('#noteTitle') : null;
  const noteBodyInput = noteForm ? noteForm.querySelector('#noteBody') : null;
  const noteList = document.getElementById('noteList');
  const archivedNoteList = document.getElementById('archivedNoteList');
  const showArchivedBtn = document.getElementById('showArchivedBtn');
  const showNotesBtn = document.getElementById('showNotesBtn');
  const loadingIndicator = document.getElementById('loadingIndicator');

  if (!addNoteElement || !noteForm || !noteTitleInput || !noteBodyInput) {
    console.error('Form or form elements not found!');
    return;
  }

  await displayNotes();

  noteForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const title = noteTitleInput.value.trim();
    const body = noteBodyInput.value.trim();

    if (title && body) {
      try {
        await createNote({ title, body });
        noteForm.reset();
        await displayNotes();
      } catch (error) {
        console.error('Failed to create note:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to create note',
          text: 'Please try again.'
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid input',
        text: 'Please fill in both title and body.'
      });
    }
  });

  showArchivedBtn.addEventListener('click', async function () {
    document.getElementById('noteList').style.display = 'none';
    document.getElementById('archivedNoteList').style.display = 'block';
    await showArchivedNotes();
  });

  showNotesBtn.addEventListener('click', async function () {
    document.getElementById('noteList').style.display = 'block';
    document.getElementById('archivedNoteList').style.display = 'none';
    await displayNotes();
  });

  async function displayNotes() {
    noteList.innerHTML = '';
    loadingIndicator.style.display = 'block';

    try {
      const notes = await getNotes();
      notes.forEach(note => {
        const noteElement = createNoteElement(note);
        noteList.appendChild(noteElement);
      });
    } catch (error) {
      console.error('Error fetching notes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to load notes',
        text: 'Please try again later.'
      });
    } finally {
      loadingIndicator.style.display = 'none';
    }
  }

  async function showArchivedNotes() {
    archivedNoteList.innerHTML = '';
    loadingIndicator.style.display = 'block';

    try {
      const archivedNotes = await getArchivedNotes();
      archivedNotes.forEach(note => {
        const noteElement = createNoteElement(note);
        archivedNoteList.appendChild(noteElement);
      });
    } catch (error) {
      console.error('Error fetching archived notes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to load archived notes',
        text: 'Please try again later.'
      });
    } finally {
      loadingIndicator.style.display = 'none';
    }
  }

  function createNoteElement(note) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <small>Created at: ${new Date(note.createdAt).toLocaleString()}</small>
      <button class="archiveBtn" data-id="${note.id}">${note.archived ? 'Unarchive' : 'Archive'}</button>
      <button class="deleteBtn" data-id="${note.id}">Delete</button>
    `;

    // Tambahkan animasi pada elemen catatan
    gsap.from(noteElement, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power1.out'
    });

    const archiveBtn = noteElement.querySelector('.archiveBtn');
    archiveBtn.addEventListener('click', async function () {
      const noteId = archiveBtn.getAttribute('data-id');
      const isArchiving = !note.archived;
      const success = await (isArchiving ? archiveNote : unarchiveNote)(noteId);

      if (success) {
        if (isArchiving) {
          gsap.to(noteElement, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power1.out',
            onComplete: () => noteElement.remove()
          });
        } else {
          if (document.getElementById('archivedNoteList').contains(noteElement)) {
            gsap.to(noteElement, {
              opacity: 0,
              y: -20,
              duration: 0.5,
              ease: 'power1.out',
              onComplete: () => noteElement.remove()
            });
          } else {
            archiveBtn.textContent = 'Archive';
          }
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to update note',
          text: 'Please try again.'
        });
      }
    });

    const deleteBtn = noteElement.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', async function () {
      const noteId = deleteBtn.getAttribute('data-id');
      const success = await deleteNote(noteId);
      if (success) {
        gsap.to(noteElement, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power1.out',
          onComplete: () => noteElement.remove()
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete note',
          text: 'Please try again.'
        });
      }
    });

    return noteElement;
  }
});
