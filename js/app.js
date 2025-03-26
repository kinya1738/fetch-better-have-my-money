const API_URL = 'http://localhost:4000/todos';


document.addEventListener('DOMContentLoaded', fetchTasks);

const tasksList = document.querySelector('#tasks-list');

function fetchTasks() {
    fetch(API_URL).then((res) => {
        if (res.ok) {
            alert('res.status');
        }
        return res.json();
    }).then(todos => { 
        renderTodos(todos);
        setRemainingTasksCount(todos);
});
}

function renderTodos(todos) {
    tasksList.innerHtml = '';

    todos.forEach((todo) => {
    const todoElement = document.createElement('div');

    todoElement.className = 'task';

    const checkbox =document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox'
    checkbox.checked = todo.completed;

    checkbox.addEventListener('change', () =>toggleTodoCompletionStatus(todo.id, todo.completed));


    const todoText = document.createElement('span');

    todoText.textContent = todo.title;

    const deleteButton = document.createDocumentFragment('button');
    deleteButton.className = 'delete-button';
    deleteButton.innerHtml = '<i class="fa-solid fa-trash"></i>';

    deleteButton.addEventListener("click", () => deleteTodo(todo.id))
if (todo.completed) {
    todoText.style.textDecoration = 'line-through';
    todoElement.style.opacity = '0.3';
}

    todoElement.appendChild(checkbox);
    todoElement.appendChild(todoText);
    todoElement.appendChild(deleteButton);

    tasksList.appendChild(todoElement);
    });
}

const remainingTodosCount = document.querySelector('#tasks-count');
function setRemainingTasksCount(todos) {
  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  remainingTodosCount.textContent = remainingTodos;
}

//POST requests 
const addTodoForm = document.querySelector('#add-task-form');
 
const todoInput = document.querySelector('#task-input');

addTodoForm.addEventListener('submit', CaptureTextInput);

function CaptureTextInput(e) {
    e.preventDefault();

const text = todoInput.value.trim();

if (text) {
    addNewTodo(text);
    e.target.reset();
}
}

//async await fetch syntax
// async function addNewTodo(textFromInput) {
//    try {
//     const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             title: textFromInput,
//             completed: false,
//         })
//     });

// if (!response.ok){
//     alert(response.status);
// }

//     fetchTasks();
//    } catch (error) {
//     alert(error);
//    }

async function toggleTodoCompletionStatus(id, completed) {
    try {
      const response = await  fetch(`${API_URL}/${id}`, {
         method: 'PATCH',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            completed: !completed,
         }),
      })
      if (!response.ok) {
        throw new ERR(response);
      }
    } catch (error) {
        alert(error);
    }
}

async function deleteTodo(id) {
    try {
        const response = await  fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
        });
        if (!response.ok){
            throw new ERR (response);
        }
    } catch (error) {
        alert(error);
    }
}