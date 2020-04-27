//selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const todoFilter = document.querySelector('.filter-todo')

// event listeners
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteTodo)
todoFilter.addEventListener('click', filterTodo)
document.addEventListener('DOMContentLoaded', getTodos)



// functions
function addTodo(e) {
    e.preventDefault()
    // console.log('click')
    if (todoInput.value != '') {
        const div = document.createElement('div')
        div.classList.add('todo');

        const li = document.createElement('li')
        li.classList.add('todo-item')
        li.innerText = todoInput.value;
        div.appendChild(li)

        const completeButton = document.createElement('button')
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add('complete-btn')
        div.appendChild(completeButton)

        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('delete-btn')
        div.appendChild(trashButton)
        saveToLocalStorate(todoInput.value)
        // todoList.appendChild(div)
        todoList.insertBefore(div,todoList.children[0])
        todoInput.value = '';
    }
}
function deleteTodo(e) {
    const item = e.target;
    if (item.classList.contains('delete-btn')) {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodo(todo)
        setTimeout((i) => {
            todo.remove();
        }, 400)
    }
    if (item.classList.contains('complete-btn')) {
        console.log(item.parentElement)
        const itemText = item.parentElement.children[0].innerText
        item.parentElement.classList.toggle('completed')
        if (item.parentElement.classList.contains('completed')) {
            updateComplete(itemText, 't')
        } else {
            updateComplete(itemText, 'f')
        }
    }
}

function filterTodo(e) {
    console.log(e.target.value)
    const todos = todoList.children;
    console.log(todos)

    Array.from(todos).forEach((i) => {
        // console.log(i)
        switch (e.target.value) {
            case 'all':
                i.style.display = 'flex';
                break;
            case 'completed':
                if (i.classList.contains('completed')) {
                    i.style.display = 'flex'
                } else i.style.display = 'none';
                break;
            case 'incomplete':
                if (!i.classList.contains('completed')) {
                    i.style.display = 'flex'
                } else i.style.display = 'none'
                break;
        }
    })
}

function saveToLocalStorate(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoItem = { isComplete: 'f', item: todo }
    todos.unshift(todoItem);
    localStorage.setItem('todos', JSON.stringify(todos))
}


function getTodos() {
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((m) => {
        // console.log(m)
        const div = document.createElement('div')
        div.classList.add('todo');

        const li = document.createElement('li')
        li.classList.add('todo-item')
        li.innerText = m.item;
        div.appendChild(li)
        const completeButton = document.createElement('button')
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add('complete-btn')
        div.appendChild(completeButton)

        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('delete-btn')
        div.appendChild(trashButton)
        console.log(div.classList)
        
        // div.children[0].classList.toogle('completed')
        if(m.isComplete==='t'){
            div.classList.toggle('completed')
        }
        todoList.appendChild(div)
    })
}
function removeLocalTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const childText = todo.children[0].innerText;
    todos.forEach((i) => {
        console.log('running: '+i)
        if (i.item === childText) {
            const todoIndex = todos.indexOf(i)
            todos.splice(todoIndex,1)
            localStorage.setItem('todos',JSON.stringify(todos))
        } 
    })
}

function updateComplete(myItem, isComplete) {
    console.log('complete given: ' + isComplete)
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((i) => {
        if (i.item === myItem) {
            const updateIndex = todos.indexOf(i)
            todos[updateIndex].isComplete = isComplete;
            
            localStorage.setItem('todos',JSON.stringify(todos))
        } 
    })

}