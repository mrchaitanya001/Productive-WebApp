"use strict";
let tasks = [];
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Please enter a task!");
        return;
    }
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(newTask);
    taskInput.value = "";
    displayTasks();
}
function displayTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task";
        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";
        if (task.completed) {
            span.classList.add("completed");
        }
        span.addEventListener("click", () => {
            toggleTask(task.id);
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
    updateTaskCount();
}
function toggleTask(id) {
    tasks = tasks.map((task) => {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }
        return task;
    });
    displayTasks();
}
function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    displayTasks();
}
function clearAllTasks() {
    tasks = [];
    displayTasks();
}
function updateTaskCount() {
    const remainingTasks = tasks.filter((task) => !task.completed).length;
    taskCount.textContent =
        `${remainingTasks} ${remainingTasks === 1 ? "task" : "tasks"} remaining`;
}
addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearAllTasks);
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
displayTasks();
