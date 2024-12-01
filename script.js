// DOM Elements
const addNoteButton = document.getElementById('add-note');
const notesContainer = document.getElementById('notes-container');
const themeToggle = document.getElementById('theme-toggle');

// Load Notes from Local Storage
window.onload = function () {
  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  savedNotes.forEach(note => createNoteElement(note.title, note.description));
  const theme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', theme === 'dark');
};

// Add New Note
addNoteButton.addEventListener('click', () => createNoteElement());

// Toggle Light/Dark Mode
themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Create Note Element
function createNoteElement(title = '', description = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  // Title input
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Title';
  titleInput.value = title;
  titleInput.classList.add('note-title');
  titleInput.addEventListener('input', saveNotes);

  // Description textarea
  const descriptionTextarea = document.createElement('textarea');
  descriptionTextarea.placeholder = 'Description';
  descriptionTextarea.value = description;
  descriptionTextarea.classList.add('note-description');
  descriptionTextarea.addEventListener('input', saveNotes);

  // Delete button
  const deleteButton = document.createElement('div');
  deleteButton.classList.add('delete-note');
  deleteButton.innerText = 'X';
  deleteButton.addEventListener('click', () => {
    note.remove();
    saveNotes();
  });

  note.appendChild(titleInput);
  note.appendChild(descriptionTextarea);
  note.appendChild(deleteButton);
  notesContainer.appendChild(note);
  saveNotes();
}

// Save Notes to Local Storage
function saveNotes() {
  const notes = Array.from(notesContainer.querySelectorAll('.note')).map(note => {
    return {
      title: note.querySelector('.note-title').value,
      description: note.querySelector('.note-description').value,
    };
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}






function createNoteElement(title = '', description = '') {
    const note = document.createElement('div');
    note.classList.add('note');
  
    // Title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Title';
    titleInput.value = title;
    titleInput.classList.add('note-title');
  
    // Dynamically reduce title font size after typing
    titleInput.addEventListener('blur', () => {
      if (titleInput.value.trim() !== '') {
        titleInput.style.fontSize = '1.2rem'; // Smaller font size after typing
      } else {
        titleInput.style.fontSize = '1.8rem'; // Reset to default if empty
      }
    });
  
    // Reset size while typing
    titleInput.addEventListener('focus', () => {
      titleInput.style.fontSize = '1.8rem'; // Larger font size when typing
    });
  
    // Description textarea
    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.placeholder = 'Description';
    descriptionTextarea.value = description;
    descriptionTextarea.classList.add('note-description');
    descriptionTextarea.addEventListener('input', saveNotes);
  
    // Timestamp
    const timestamp = document.createElement('div');
    timestamp.classList.add('note-timestamp');
    const now = new Date();
    const formattedTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    timestamp.innerText = `Created on: ${formattedTime}`;
  
    // Delete button
    const deleteButton = document.createElement('div');
    deleteButton.classList.add('delete-note');
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', () => {
      note.remove();
      saveNotes();
    });
  
    note.appendChild(titleInput);
    note.appendChild(descriptionTextarea);
    note.appendChild(timestamp);
    note.appendChild(deleteButton);
    notesContainer.appendChild(note);
    saveNotes();
  }
  