const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

const savedTodos = localStorage.getItem('todos');
let todos = savedTodos ? JSON.parse(savedTodos) : [];
let numb = todos.length;


function newTodo() {
  let text = prompt("enter ToDo")
  if (text) {
    let todo = { id: numb++, text, checked: Math.random()<0.5?true:false}
    todos.push(todo)
    console.log(todos)
    saveTodos();
    render();
    updateCounter();
  }
}

function render(){
  list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
}

function renderTodo(todo){
  return `
<li class="${classNames.TODO_ITEM}">
  <input class="${classNames.TODO_CHECKBOX}" type="checkbox" ${todo.checked?"checked":""} onchange="toggleTodo(${todo.id})"> 
  <span class="${classNames.TODO_TEXT}">${todo.text}</span>
  <button class="${classNames.TODO_DELETE}" onClick="deleteTodo(${todo.id})">delete</button>
</li>
`
}

function updateCounter(){
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length
  uncheckedCountSpan.textContent = todos.reduce((prev, cur) => (prev + (cur.checked?1:0)),0)
}

function deleteTodo(id){
  todos = todos.filter(todo => todo.id !== id);
  render();
  updateCounter();
  saveTodos();
}

function toggleTodo(id){
  todos = todos.map(todo => todo.id === id ? {id: todo.id, text: todo.text, checked: !todo.checked}:todo)
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded', render);
document.addEventListener('DOMContentLoaded', updateCounter);
