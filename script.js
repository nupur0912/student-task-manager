let tasks = [];

function addTask() {

    const input = document.getElementById("taskInput");

    const taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        completed: false
    };

    tasks.push(task);

    input.value = "";

    displayTasks();
}


function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.name}</span>

            <div>

                <button
                    class="complete-btn"
                    onclick="completeTask(${task.id})">
                    Complete
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}


function completeTask(id) {

    const task = tasks.find(function(task) {
        return task.id === id;
    });

    if (task) {
        task.completed = !task.completed;
    }

    displayTasks();
}


function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    displayTasks();
}
