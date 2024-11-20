// Додаємо обробник події, який виконується, коли сторінка повністю завантажена.
document.addEventListener("DOMContentLoaded", loadTasks);

// Отримуємо елементи списку завдань і поля введення за їхніми id.
const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task-input");

// Функція завантажує завдання з localStorage і додає їх до списку.
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskElement(task));
}

// Функція для збереження завдань у localStorage.
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(taskEl => {
        tasks.push({
            text: taskEl.querySelector(".task-text").innerText,
            date: taskEl.querySelector(".task-date").innerText,
            completed: taskEl.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Додаємо обробник події на поле введення, який реагує на натискання клавіші Enter.
newTaskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && newTaskInput.value.trim() !== "") {
        const task = {
            text: newTaskInput.value,
            date: new Date().toLocaleString(),
            completed: false
        };
        addTaskElement(task);
        saveTasks();
        newTaskInput.value = "";
    }
});

// Функція для створення елементу завдання і додавання його до списку.
function addTaskElement(task) {
    const taskEl = document.createElement("li");
    taskEl.className = "task" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(taskEl));

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;
    taskText.addEventListener("dblclick", () => editTask(taskText));

    const taskDate = document.createElement("span");
    taskDate.className = "task-date";
    taskDate.textContent = task.date;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => {
        // Додаємо підтвердження перед видаленням завдання.
        if (confirm("Ви точно хочете видалити це завдання?")) {
            taskEl.remove();
            saveTasks();
        }
    });

    taskEl.append(checkbox, taskText, taskDate, deleteBtn);
    taskList.prepend(taskEl);
}

// Функція для зміни статусу виконання завдання.
function toggleComplete(taskEl) {
    taskEl.classList.toggle("completed");
    saveTasks();
}

// Функція для редагування тексту завдання.
function editTask(taskText) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = taskText.innerText;
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            taskText.innerText = input.value;
            input.replaceWith(taskText);
            saveTasks();
        }
    });
    taskText.replaceWith(input);
    input.focus();
}

// Функція для сортування завдань за станом виконання.
function sortTasks() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
        return a.classList.contains("completed") - b.classList.contains("completed");
    });
    taskList.innerHTML = "";
    tasks.forEach(task => taskList.append(task));
    saveTasks();
}
