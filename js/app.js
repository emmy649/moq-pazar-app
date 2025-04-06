function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.add('hidden');
  });
  document.getElementById(tabId).classList.remove('hidden');
}

// === Покупки ===
function addShopping() {
  const input = document.getElementById('shoppingInput');
  const value = input.value.trim();
  if (value) {
    createShoppingItem(value);
    input.value = '';
    saveShopping();
  }
}

function createShoppingItem(text, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;
  span.onclick = () => {
    li.classList.toggle('completed');
    saveShopping();
  };

  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';
  delBtn.className = 'icon-delete';
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveShopping();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  document.getElementById('shoppingList').appendChild(li);
}

function saveShopping() {
  const items = Array.from(document.querySelectorAll('#shoppingList li')).map(li => ({
    text: li.querySelector('span').textContent.trim(),
    checked: li.classList.contains('completed')
  }));
  localStorage.setItem('shoppingItems', JSON.stringify(items));
}

function loadShopping() {
  const items = JSON.parse(localStorage.getItem('shoppingItems')) || [];
  items.forEach(item => createShoppingItem(item.text, item.checked));
}

// === Месечни ===
function addMonthly() {
  const input = document.getElementById('monthlyInput');
  const value = input.value.trim();
  if (value) {
    createMonthlyItem(value);
    input.value = '';
    saveMonthly();
  }
}

function createMonthlyItem(text) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;

  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';
  delBtn.className = 'icon-delete';
  delBtn.onclick = () => {
    li.remove();
    saveMonthly();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  document.getElementById('monthlyList').appendChild(li);
}

function saveMonthly() {
  const items = Array.from(document.querySelectorAll('#monthlyList li')).map(li =>
    li.querySelector('span').textContent.trim()
  );
  localStorage.setItem('monthlyItems', JSON.stringify(items));
}

function loadMonthly() {
  const items = JSON.parse(localStorage.getItem('monthlyItems')) || [];
  items.forEach(item => createMonthlyItem(item));
}

// === Бележки ===
function addNote() {
  const input = document.getElementById('noteInput');
  const value = input.value.trim();
  if (value) {
    const date = new Date();
    const formattedDate = formatDate(date);
    createNote(value, formattedDate);
    input.value = '';
    saveNotes();
  }
}

function createNote(text, date) {
  const noteBox = document.createElement('div');
  noteBox.className = 'note-box';

  const delBtn = document.createElement('button');
  delBtn.textContent = '✕';
  delBtn.className = 'icon-delete';
  delBtn.onclick = () => {
    noteBox.remove();
    saveNotes();
  };

  const dateEl = document.createElement('div');
  dateEl.className = 'note-date';
  dateEl.textContent = `${date}`;

  const content = document.createElement('div');
  content.className = 'note-content';
  content.textContent = text;

  noteBox.appendChild(delBtn);
  noteBox.appendChild(dateEl);
  noteBox.appendChild(content);

  document.getElementById('notesList').appendChild(noteBox);
}

function saveNotes() {
  const notes = Array.from(document.querySelectorAll('#notesList .note-box')).map(box => ({
    text: box.querySelector('.note-content').textContent,
    date: box.querySelector('.note-date').textContent
  }));
  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(note => createNote(note.text, note.date));
}

function formatDate(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = String(date.getFullYear()).toString().slice(-2);
  return `${d}.${m}.${y} г.`;
}

// === Старт ===
window.onload = () => {
  loadShopping();
  loadMonthly();
  loadNotes();
};
