const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Muat tugas tersimpan saat halaman pertama kali dibuka
document.addEventListener('DOMContentLoaded', loadTasks);

// Tambah tugas saat tombol diklik atau menekan Enter
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Tugas tidak boleh kosong!');
        return;
    }

    createTaskElement(taskText, false);
    saveTasks();
    taskInput.value = '';
}

function createTaskElement(text, isCompleted) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = text;
    
    // Klik teks tugas untuk menandai selesai/belum
    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Hapus';
    deleteBtn.className = 'delete-btn';
    
    // Klik tombol hapus untuk menghilangkan tugas
    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Mencegah event klik pada 'li' ikut terpicu
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    savedTasks.forEach(task => createTaskElement(task.text, task.completed));
}
