// app.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('newTaskForm');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDueDateInput = document.getElementById('taskDueDate');
    const taskPrioritySelect = document.getElementById('taskPriority');
    const taskList = document.getElementById('tasks');
    const showAllTasksBtn = document.getElementById('showAllTasks');
    const showCompletedTasksBtn = document.getElementById('showCompletedTasks');
    const showPendingTasksBtn = document.getElementById('showPendingTasks');

    let tasks = [];

    // Function to render tasks
    function renderTasks(filter) {
        taskList.innerHTML = '';
        const filteredTasks = filterTasks(filter);
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.title} - ${task.dueDate ? `Due: ${task.dueDate}` : 'No Due Date'} - Priority: ${task.priority}</span>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Mark as Pending' : 'Mark as Completed'}</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to filter tasks
    function filterTasks(filter) {
        if (filter === 'completed') {
            return tasks.filter(task => task.completed);
        } else if (filter === 'pending') {
            return tasks.filter(task => !task.completed);
        }
        return tasks;
    }

    // Function to add a task
    function addTask(title, dueDate, priority) {
        const newTask = {
            id: tasks.length + 1,
            title,
            dueDate,
            priority,
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
    }

    // Function to delete a task
    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    // Function to toggle task completion
    window.toggleComplete = function(id) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
        }
    }

    // Handle form submission
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskTitleInput.value;
        const dueDate = taskDueDateInput.value;
        const priority = taskPrioritySelect.value;
        addTask(title, dueDate, priority);
        taskForm.reset();
    });

    // Show all tasks
    showAllTasksBtn.addEventListener('click', () => renderTasks());

    // Show completed tasks
    showCompletedTasksBtn.addEventListener('click', () => renderTasks('completed'));

    // Show pending tasks
    showPendingTasksBtn.addEventListener('click', () => renderTasks('pending'));

    // Initial render
    renderTasks();
});
