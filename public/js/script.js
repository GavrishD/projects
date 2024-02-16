// Finding elements on the page
const form = document.querySelector("#todoForm");
const taskInput = document.querySelector("#task");
const tasksList = document.querySelector("#tasksList");
const submitButton = document.querySelector(".task-button");

let tasks = [];

checkEmptyList();
checkCleanButton();

// Adding a task
form.addEventListener("submit", addTask);

function addTask(event) {
    // event.preventDefault();

    // Get the task text from the input field
    const inputText = taskInput.value;

    let taskToSave;

    const taskElement = document.querySelector(".edit-item");

    if (taskElement) {
        tasks = tasks.map((task) => { 
            if (task.id === taskElement.id) {
                task.text = taskInput.value;
                taskToSave = task;
            } 
            return task;
        });
        const taskTitle = taskElement.querySelector(".todo-title");
        taskTitle.innerText = taskToSave.text;
        taskElement.classList.remove('edit-item');
        
        submitButton.classList.remove("edit");
        submitButton.textContent = "Save";
    } else {
        // Describe the task as an object
        taskToSave = {
            id: Date.now().toString(),
            text: inputText,
            done: false,
        }

        // Adding a task to an array with tasks
        tasks.push(taskToSave);

        // Function for generating markup for a new task
        renderTask(taskToSave);

        console.log(taskToSave);
    }

    // Clear the input field and return focus to it
    taskInput.value = "";
    taskInput.focus();

    checkEmptyList();
    checkCleanButton();

    
    // console.log(todoList);
}

function deleteTask(event, taskId) {
    // const parentNode = event.target.closest(".todo-item");
    const parentNode = document.getElementById(taskId);

    // Delete a task through array filtering
    tasks = tasks.filter((task) => task.id !== taskId);

    // Remove a task from the markup
    parentNode.remove();

    checkEmptyList();
    checkCleanButton();

    event.stopPropagation();
}

function doneTask(event, taskId) {
    const parentNode = document.getElementById(taskId);

    // Defining task IDs
    tasks = tasks.map((task) => {
        if (task.id === taskId) {
            task.done = !task.done;
        } 
        return task;
    });

    const todoTitle = parentNode.querySelector('.todo-title');
    todoTitle.classList.toggle("todo-title-done");

    const buttonDone = parentNode.querySelector(".button-done");
    buttonDone.classList.toggle("checked");

    checkCleanButton();
    event.stopPropagation();
}

function checkEmptyList() {
    const emptyList = document.querySelector("#emptyList");
    emptyList.classList.remove("none-empty-list");
    checkCleanButton();

    if (tasks.length > 0) {
        emptyList.classList.add('none-empty-list');
    }
}

function renderTask(task) {
    // Form a CSS class for the task title and button "safe"
    const cssClassTitle = task.done ? "todo-title todo-title-done" : "todo-title";
    const cssClassButton = task.done ? "button-done checked" : "button-done";

    // Generating markup for a new task
    const toDoItemHTML = `
        <li id=${task.id} class="todo-item" onclick="chooseTask('${task.id}')">
            <div class="${cssClassTitle}">${task.text}</div>
            <div class="todo-buttons">
                <button type="button" class="${cssClassButton}" onclick="doneTask(event, '${task.id}')"><span class="icon-done"></span>Done</button>
                <button type="button" class="button-delete" onclick="deleteTask(event, '${task.id}')"><span class="icon-delete"></span>Delete</button>
            </div>
        </li>
    `;

    // Add a task to a page
    tasksList.insertAdjacentHTML("afterbegin", toDoItemHTML);
}

function checkCleanButton() {
    const cleanButton = document.querySelector(".clean-button");
    cleanButton.classList.remove("visible-button");

    if (tasks.length > 0) {
        cleanButton.classList.add("visible-button");
    } 
}

function chooseTask(taskId) {
    const obj = tasks.find((task) => task.id == taskId);
    taskInput.value = obj.text;

    const toDoItem = document.getElementById(taskId);

    const prevEditItem = tasksList.querySelector(".edit-item");
    if (prevEditItem && prevEditItem.id !== taskId) {
        prevEditItem.classList.remove("edit-item");
    }

    const editTask = toDoItem.classList.toggle("edit-item");
    submitButton.classList.toggle("edit");

    submitButton.textContent = editTask ? "Edit" : "Save";
    taskInput.value = editTask ? taskInput.value : "";
}

function clear(elem) {
    elem.innerHTML = '';
}

function cleanAllTasks() {
    checkCleanButton();

    clear(tasksList);
    tasks.splice(0);

    checkEmptyList();
}