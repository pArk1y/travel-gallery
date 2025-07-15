document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('feedback-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      let valid = true;

      const fields = ['name', 'email', 'message'];
      fields.forEach(function (id) {
        const input = document.getElementById(id);
        const msgBox = input.closest('.text-field').querySelector('.text-field__message');
        if (!input.checkValidity()) {
          msgBox.textContent = 'Это поле обязательное.';
          valid = false;
        } else {
          msgBox.textContent = '';
        }
      });

      if (!valid) {
        e.preventDefault();
      }
    });
  }

  const taskForm = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');
  const deleteSelectedBtn = document.getElementById('delete-selected');
  const sortByDateBtn = document.getElementById('sort-by-date');
  const filterHighBtn = document.getElementById('filter-high');
  const showAllBtn = document.getElementById('show-all');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'task-item';
      if (task.completed) li.classList.add('completed');

      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" />
        <strong>${task.name}</strong> | Дата: ${task.date} | Приоритет: ${task.priority}
        <div>
          <button class="move-up" data-index="${index}">Вверх</button>
          <button class="move-down" data-index="${index}">Вниз</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }

  if (taskForm) {
    taskForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('task-name').value.trim();
      const date = document.getElementById('task-date').value;
      const priority = document.getElementById('task-priority').value;

      if (name && date) {
        tasks.push({ name, date, priority, completed: false });
        saveTasks();
        renderTasks();
        taskForm.reset();
      }
    });
  }

  taskList.addEventListener('change', function (e) {
    if (e.target.type === 'checkbox') {
      const index = parseInt(e.target.getAttribute('data-index'));
      tasks[index].completed = e.target.checked;
      saveTasks();
      renderTasks();
    }
  });

  deleteSelectedBtn?.addEventListener('click', function () {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
  });

  sortByDateBtn?.addEventListener('click', function () {
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    saveTasks();
    renderTasks();
  });

  filterHighBtn?.addEventListener('click', function () {
    renderTasks(tasks.filter(t => t.priority === 'high'));
  });

  showAllBtn?.addEventListener('click', function () {
    renderTasks();
  });

  taskList.addEventListener('click', function (e) {
    if (e.target.classList.contains('move-up')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      if (index > 0) {
        [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
        saveTasks();
        renderTasks();
      }
    } else if (e.target.classList.contains('move-down')) {
      const index = parseInt(e.target.getAttribute('data-index'));
      if (index < tasks.length - 1) {
        [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
        saveTasks();
        renderTasks();
      }
    }
  });

  renderTasks();
});