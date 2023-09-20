// javascript code goes here
// elements
const inputElement = document.querySelector('.todo-input');
const todoListElement = document.querySelector('.todo-list');
console.log(window.innerWidth);
console.log(window.innerHeight);
let inputValue = '';
let todoListArray = [];
init();
function init() {
    if (localStorage.getItem('localTodoList')) {
        const storeData = localStorage.getItem('localTodoList');
        console.log(JSON.parse(storeData));
        todoListArray = JSON.parse(storeData);
        renderList();

    } else {
        console.log('no local storage');
    }

}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    inputValue = inputElement.value;
    inputElement.value = "";
    addElement(inputValue);
})



const addElement = (value) => {
    const curId = todoListArray.length === 0 ? 1 : todoListArray[todoListArray.length - 1].id + 1;
    const newItem = { id: curId, item: value, type: 'incomplete' };
    todoListArray.push(newItem);
    renderList();
}

function renderList() {
    todoListElement.innerHTML = '';
    for (const item of todoListArray) {
        const itemDiv = document.createElement('div');
        itemDiv.className = "todo-item";
        itemDiv.innerHTML = `<div class='${item.type}'>${item.item}</div>
        <div>
            <button class='btn complete-btn fa-solid fa-check'  onClick='completeItem(${item.id})'></button>
            <button class='btn trash-btn fa-solid fa-trash'  onClick='deleteItem(${item.id})'></button> 
        </div>`;
        todoListElement.appendChild(itemDiv);
    }
    updateLocalStorageData();
}

function updateLocalStorageData() {
    localStorage.setItem('localTodoList', JSON.stringify(todoListArray));

}

function completeItem(id) {
    for (const item of todoListArray) {
        if (item.id == id) {
            item.type = item.type == 'complete' ? 'incomplete' : 'complete';
            break;
        }
    }
    renderList();
}

function deleteItem(id) {
    console.log('delete');
    const newArray = todoListArray.filter((e) => {
        return e.id != id;
    });
    todoListArray = newArray;
    renderList();
}