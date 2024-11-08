document.addEventListener("DOMContentLoaded", loadTasks);
const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task-input");
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskElement(task));
}
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
        taskEl.remove();
        saveTasks();
    });

    taskEl.append(checkbox, taskText, taskDate, deleteBtn);
    taskList.prepend(taskEl);
}
function toggleComplete(taskEl) {
    taskEl.classList.toggle("completed");
    taskEl.querySelector("input[type='checkbox']").style.display = "none";
    saveTasks();
}
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
function sortTasks() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
        return a.classList.contains("completed") - b.classList.contains("completed");
    });
    taskList.innerHTML = "";
    tasks.forEach(task => taskList.append(task));
    saveTasks();
}
