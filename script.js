// console.log("script.js");
document.getElementById("inputTodo").focus();
//let todoList = localStorage.getItem("todoList");
//if (!todoList) {
todoList = [
  { body: "task 1", done: false },
  { body: "task 2", done: true },
  { body: "task 3", done: true }
];
//}
let todoStatus = "all";
function createTodoObject() {
  let body = document.getElementById("inputTodo").value;
  console.log(`L 11- addTodo value: ${body}`);
  const todoObject = {
    body,
    done: false
  };
  document.getElementById("inputTodo").value = "";
  return todoObject;
  //TODO: add clear input here
}

function addTodo() {
  const newTodo = createTodoObject();
  todoList.push(newTodo);
  console.log(`todoList L-24: ${newTodo.body}`);
  renderTodoList(todoList);
  document.getElementById("inputTodo").focus();
  localStorage.setItem("todoList", todoList);
  checkTodoStatusandRenderList();
}

function keyDowndInInput() {
  if (event.keyCode == 13) {
    document.getElementById("addClick").click();
  }
}

// function renderSingleTodo(newTodo) {
//   let node = document.createElement("LI");
//   let delNode = document.createElement("SPAN");
//   let textnode = document.createTextNode(newTodo.body);
//   let delIcon = document.createTextNode("X");
//   node.appendChild(textnode);
//   delNode.appendChild(delIcon);
//   node.appendChild(delNode);
//   document.getElementById("todoList").appendChild(node);
// }

function renderTodoList(filteredTodoList) {
  document.getElementById("todoList").innerHTML = "";
  const todoHtml = filteredTodoList.map((todo, idx) => {
    const lineThrough = "";
    return `<li class="list-group-item ${
      todo.done ? " list-group-item-secondary" : "list-group-item-success"
    } d-flex justify-content-between align-items-center"><h5 class="${
      todo.done ? "todo-done" : ""
    }" onclick=onToggle(${idx})>${
      todo.body
    }</h5><span><a class="btn btn-outline-success" href="#" onclick=onToggle(${idx})><i class="fa ${
      todo.done ? "fa-check-square" : "fa-square-o"
    }" aria-hidden="true"></i></a><a class="btn btn-outline-danger" href="#" onclick=onDelete(${idx})><i class="fa fa-trash" aria-hidden="true"></i></a></span></li>`;
  });
  document.getElementById("todoList").innerHTML = todoHtml.join("");
  // console.log(`line tod oHtml ${todoHtml}:`);
}

function checkTodoStatusandRenderList() {
  if (todoStatus === "done") {
    doneTodo();
  } else if (todoStatus === "notDone") {
    notDoneTodo();
  } else {
    allTodo();
  }
}

function onDelete(idx) {
  // console.log(`User Click Delete - line58 -idx=${idx}`);
  todoList.splice(idx, 1);
  localStorage.setItem("todoList", todoList);
  checkTodoStatusandRenderList();
}

function onToggle(idx) {
  const newStatus = !todoList[idx].done;
  todoList[idx].done = newStatus;
  console.log(
    `User Click To Toggle - line63 - idx=${idx} and new status is ${newStatus}`
  );
  checkTodoStatusandRenderList();
}
function doneTodo() {
  const doneTodo = todoList.filter(todo => {
    return todo.done === true;
  });
  console.log(`Line-81:User Click Done todo: ${doneTodo}`);
  renderTodoList(doneTodo);
  todoStatus = "done";
}
function notDoneTodo() {
  const notDoneTodo = todoList.filter(todo => {
    return todo.done === false;
  });
  // });
  console.log(`Line-88:User Click Not Done todo: `);
  renderTodoList(notDoneTodo);
  todoStatus = "notDone";
}
function allTodo() {
  console.log(`Line-88:User Click all  todo: `);
  renderTodoList(todoList);
  todoStatus = "all";
}

renderTodoList(todoList);
// localStorage.setItem("todoList", todoList);
