let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const dueDate = document.getElementById("dueDate");


// SAVE TASKS
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// DISPLAY TASKS
function renderTasks(filter = "all") {

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    if (
      (filter === "completed" && !task.completed) ||
      (filter === "pending" && task.completed)
    ) {
      return;
    }

    let li = document.createElement("li");

    li.className =
      "bg-gray-700 p-4 rounded-lg flex justify-between items-center";

    let leftDiv = document.createElement("div");

    let taskText = document.createElement("p");
    taskText.innerText = task.text;

    if (task.completed) {
      taskText.classList.add("completed");
    }

    let dateText = document.createElement("small");
    dateText.innerText = "Due: " + task.date;

    leftDiv.appendChild(taskText);
    leftDiv.appendChild(dateText);

    // BUTTONS
    let btnDiv = document.createElement("div");
    btnDiv.className = "flex gap-2";

    // COMPLETE BUTTON
    let completeBtn = document.createElement("button");
    completeBtn.innerText = "✔";
    completeBtn.className =
      "bg-green-500 hover:bg-green-600 px-3 py-1 rounded";

    completeBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // EDIT BUTTON
    let editBtn = document.createElement("button");
    editBtn.innerText = "✏";
    editBtn.className =
      "bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded";

    editBtn.addEventListener("click", () => {

      let newTask = prompt("Edit Task", task.text);

      if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask;
        saveTasks();
        renderTasks();
      }
    });

    // DELETE BUTTON
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";

    deleteBtn.className =
      "bg-red-500 hover:bg-red-600 px-3 py-1 rounded";

    deleteBtn.addEventListener("click", () => {

      tasks.splice(index, 1);

      saveTasks();

      renderTasks();
    });

    btnDiv.appendChild(completeBtn);
    btnDiv.appendChild(editBtn);
    btnDiv.appendChild(deleteBtn);

    li.appendChild(leftDiv);
    li.appendChild(btnDiv);

    taskList.appendChild(li);

  });
}


// ADD TASK
addBtn.addEventListener("click", () => {

  if (taskInput.value.trim() === "") {
    alert("Please enter task");
    return;
  }

  tasks.push({
    text: taskInput.value,
    date: dueDate.value || "No Date",
    completed: false,
  });

  saveTasks();

  renderTasks();

  taskInput.value = "";
  dueDate.value = "";
});


// FILTER
document.querySelectorAll(".filterBtn").forEach((btn) => {

  btn.addEventListener("click", () => {

    let filter = btn.dataset.filter;

    renderTasks(filter);
  });
});


// INITIAL RENDER
renderTasks();