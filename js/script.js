"use strict"

let addMessage = document.querySelector('.message'),
    addButton = document.querySelector('.add'),
    searchButton = document.querySelector('.search'),
    todo = document.querySelector('.todo');

let todoList = [];

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages(todoList);
}

searchButton.addEventListener('click', function () {
    if (!addMessage.value) return;
    let foundTodo = [];
    foundTodo = todoList.filter(el => el.todo === addMessage.value);

    if (foundTodo.length > 0) {
        displayMessages(foundTodo);
    }
});

addButton.addEventListener('click', function () {
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    todoList.push(newTodo);
    displayMessages(todoList);
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

function displayMessages(array) {
    let displayMessage = '';
    if (array.length === 0) todo.innerHTML = '';
    array.forEach(function (item, i) {
        displayMessage += `
       <li>
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}'class="${item.important ? 'important' : ''}">${item.todo}</label>
       </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function (event) {
    let valueLabel = todo.querySelector('[for =' + event.target.getAttribute('id') + ']').innerHTML;

    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function (e) {
    event.preventDefault();
    todoList.forEach(function (item, i) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages(todoList);
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});