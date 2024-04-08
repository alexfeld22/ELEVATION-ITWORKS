const state = {
  todos: [],
};

let CONFIG = {
  LocalStorageTodos: 'todos',
}

const CLASS_LISTS = {
  INPUT: { VALID: 'input-valid', INVALID: 'input-invalid' },
  ERROR: { SHOW: 'error-show', HIDE: 'error-hide' },
};

const formEl = document.querySelector('.todo-form');
const titleInputEl = formEl.querySelector('#title');
const descriptionInputEl = formEl.querySelector('#description');
const dateInputEl = formEl.querySelector('#date');
const todoContainerEl = document.querySelector('.todos-container');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  validateInputs(formEl);
});

function validateInputs(formEl) {
  let formState = {
    title: {
      value: titleInputEl.value,
      isValid: false,
      element: titleInputEl,
      errorElement: formEl.querySelector('#title-error'),
    },
    description: {
      value: descriptionInputEl.value,
      isValid: false,
      element: descriptionInputEl,
      errorElement: formEl.querySelector('#description-error'),
    },
    date: {
      value: dateInputEl.value,
      isValid: false,
      element: dateInputEl,
      errorElement: formEl.querySelector('#date-error'),
    },
  };

  Object.values(formState).forEach((obj) => {
    const options = {
      inputEl: obj.element,
      errEl: obj.errorElement,
      isError: true,
    };

    // validation for date input must be future date
    if (obj.element.id === 'date') {
      const currentDate = new Date();
      const selectedDate = new Date(obj.value);
      console.log('🚀 ~ Object.values ~ selectedDate:', { selectedDate, v: obj.value });
      if (!isDateValid(selectedDate) || selectedDate < currentDate) {
        options.msg = 'Please select a future date';
        renderErrorEl(options);
        return;
      }
      // input date is valid!
      options.isError = false;
      obj.isValid = true;
      renderErrorEl(options);
      return;
    }

    // validation for empty input title and description
    if (obj.value.trim() === '') {
      options.msg = 'This field is required';
      renderErrorEl(options);
      return;
    }

    // input valid lets make a todo
    options.isError = false;
    options.msg = '';
    renderErrorEl(options);
    obj.isValid = true;
  });

  const formIsValid = Object.values(formState).every((obj) => obj.isValid);

  if (!formIsValid) {
    return;
  }

  createTodo({
    title: formState.title.value,
    description: formState.description.value,
    date: formState.date.value,
  });
  formEl.reset();
}

function renderErrorEl({ inputEl, errEl, msg, isError }) {
  if (!isError) {
    errEl.classList.add(CLASS_LISTS.ERROR.HIDE);
    errEl.classList.remove(CLASS_LISTS.ERROR.SHOW);
    inputEl.classList.add(CLASS_LISTS.INPUT.VALID);
    inputEl.classList.remove(CLASS_LISTS.INPUT.INVALID);
    return;
  }

  errEl.textContent = msg;
  errEl.classList.remove(CLASS_LISTS.ERROR.HIDE);
  errEl.classList.add(CLASS_LISTS.ERROR.SHOW);
  inputEl.classList.add(CLASS_LISTS.INPUT.INVALID);
  inputEl.classList.remove(CLASS_LISTS.INPUT.VALID);
}

function createTodo({ title, description, date }) {
  const todo = {
    id: makeUUID(),
    title,
    description,
    date,
  };

  state.todos.push(todo);
  updateLS();
  renderTodo(todo);
}

function renderTodo(todo) {
  const todoEl = document.createElement('div');
  todoEl.classList.add('todo-item');
  // add data-todo-id attribute to the todo element
  todoEl.setAttribute('data-todo-id', todo.id);
  // <div class="todo-item" data=todo-id="jdfgjdfk">...</div>
  todoEl.innerHTML = /*html*/ `
      <div class="todo-item-content">
        <h2>${todo.title}</h2>
        <p>${todo.description}</p>
        <p>${todo.date}</p>
      </div>
      <button class="delete-todo">🗑️</button>
      <!-- <button class="delete-todo" onclick="removeTodo('${todo.id}')">Delete</button> -->
  `;
  const deleteButton = todoEl.querySelector('.delete-todo');
  deleteButton.addEventListener('click', () => removeTodo(todo.id));
  todoContainerEl.appendChild(todoEl);
}

function removeTodo(id) {
  const todoEl = document.querySelector(`[data-todo-id="${id}"]`);
  todoEl.remove();
  state.todos = state.todos.filter((todo) => todo.id !== id);
  updateLS();
}

function makeUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function isDateValid(dateStr) {
  //01-01
  return !isNaN(new Date(dateStr));
}


function updateLS(){
  const todosJson = JSON.stringify(state.todos)
  localStorage.setItem(CONFIG.LocalStorageTodos, todosJson);
}

function initToDos(){
  const todos = localStorage.getItem(CONFIG.LocalStorageTodos);
  if (todos === null) return;

  const todosJson = JSON.parse(todos);
  if (todosJson.length === 0) return;

  state.todos = todosJson;
  state.todos.forEach((todo) => {if (isTodoValid(todo)) renderTodo(todo)});
}

function isTodoValid({id ,title, description, date}){
  return checkUUID(id) && 
    (typeof(title) == 'string'? title.length > 0 : false) &&
    (typeof(description) == 'string'? description.length > 0 : false) &&
    isDateValid(date);
}

function checkUUID(uuid){
  const regEx = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regEx.test(uuid);
}

initToDos();