//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);


//Functions

function addTodo(e){
    //Prevent form from submitting
    e.preventDefault();
    //Todo div
    const todoDiv = document.createElement('div'); 
    todoDiv.classList.add('todo');
    //Create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add Todo to local storage
    saveLocalTodo(todoInput.value);
    //Completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = `<i class="fas fa-times"></i>`;
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Clear Todo Input value
    todoInput.value = '';  
}

function deleteCheck(e) { 
    const item = e.target;
    //Delete Trash
    if (item.classList.contains('trash-btn')) {
        const todo = item.parentElement;
        //Animation 
        todo.classList.add('fall');
        removeLocalTodo(todo);
        todo.addEventListener('transitionend', e => {
            todo.remove();
        });
    }
    //Check Mark
    if (item.classList.contains('completed-btn')){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }   
        }
    });
}
function saveLocalTodo(todo){
    //Check for todos
    let todos; 
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodo(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    };
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    };
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div'); 
        todoDiv.classList.add('todo') 
        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-times"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);
    });
        
}



    
    
    

