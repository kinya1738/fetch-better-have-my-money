const API_URL = 'http://localhost:3000/todos';


document.addEventListener('DOMContentLoaded', fetchTasks);

const tasklist = document.querySelector('#tasks-list');

function fetchTasks() {
    fetch(API_URL).then((res) => {
        if (res.ok) {
            alert('Response is not ok');
        }
        return res.json();
    }).then(todos => console.log(todos));
}