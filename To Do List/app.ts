interface Task {
    id: number;
    text: string;
    completed: boolean;
}

let tasks: Task[] = [];

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement;
const taskList = document.getElementById("taskList") as HTMLUListElement;
const taskCount = document.getElementById("taskCount") as HTMLSpanElement;

function addTask(): void {
    const text: string = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask: Task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    displayTasks();
}

function displayTasks(): void {
    taskList.innerHTML = "";

    tasks.forEach((task: Task) => {
        const li: HTMLLIElement = document.createElement("li");
        li.className = "task";

        const span: HTMLSpanElement = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";

        if (task.completed) {
            span.classList.add("completed");
        }

        span.addEventListener("click", () => {
            toggleTask(task.id);
        });

        const deleteBtn: HTMLButtonElement =
            document.createElement("button");

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

function toggleTask(id: number): void {
    tasks = tasks.map((task: Task) => {
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

function deleteTask(id: number): void {
    tasks = tasks.filter((task: Task) => task.id !== id);

    displayTasks();
}

function clearAllTasks(): void {
    tasks = [];

    displayTasks();
}

function updateTaskCount(): void {
    const remainingTasks: number = tasks.filter(
        (task: Task) => !task.completed
    ).length;

    taskCount.textContent =
        `${remainingTasks} ${remainingTasks === 1 ? "task" : "tasks"} remaining`;
}

addBtn.addEventListener("click", addTask);

clearBtn.addEventListener("click", clearAllTasks);

taskInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        addTask();
    }
});

displayTasks();