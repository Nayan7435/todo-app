let button = document.getElementById("addBtn");

button.addEventListener("click", function() {
    let input = document.getElementById("forInput");
    let ul = document.getElementById("taskList");

    let li = document.createElement("li");
    let deleteBtn = document.createElement("button");

    li.innerText = input.value;
    deleteBtn.innerText = "❌";

    deleteBtn.addEventListener("click", function() {
        ul.removeChild(li);
    });

    li.appendChild(deleteBtn);
    ul.appendChild(li);
    input.value = "";
});