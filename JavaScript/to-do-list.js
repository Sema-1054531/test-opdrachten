const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    // create li element
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    // create checkbox to mark todo as completed
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleCompletion(index));

    const label = document.createElement("label");
    label.textContent = todo.text;

    // create delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTodo(index));

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// render todos on page load
function addTodo(text) {
  todos.push({ text, completed: false });
  renderTodos();
  saveTodos();
}

// toggle todo completion
function toggleCompletion(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
  saveTodos();
}

// delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
  saveTodos();
}

// save todos to local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// add todo on form submit
addButton.addEventListener("click", (event) => {
    event.preventDefault();
  const text = todoInput.value.trim();
  if (text !== "") {
    addTodo(text);
    todoInput.value = "";
  }
});

// add todo on enter key press
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addButton.click();
  }
});

renderTodos();
