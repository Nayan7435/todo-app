let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

savedTasks.forEach(function (taskText) {
  let ul = document.getElementById("taskList");
  let li = document.createElement("li");
  let deleteBtn = document.createElement("button");

  li.innerText = taskText;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", function () {
    li.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let index = tasks.indexOf(taskText);
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(deleteBtn);
  ul.appendChild(li);
});

let button = document.getElementById("addBtn");

button.addEventListener("click", function () {
  let input = document.getElementById("forInput");
  let taskText = input.value;
  let ul = document.getElementById("taskList");

  let li = document.createElement("li");
  let deleteBtn = document.createElement("button");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(input.value);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  li.innerText = input.value;
  deleteBtn.innerText = "❌";

  deleteBtn.addEventListener("click", function () {
    // ul.removeChild(li);
    li.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let index = tasks.indexOf(taskText);
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(deleteBtn);
  ul.appendChild(li);
  input.value = "";

  li.addEventListener("click", function () {
    if (li.style.textDecoration === "line-through") {
      li.style.textDecoration = "none";
    } else {
      li.style.textDecoration = "line-through";
    }
  });
});