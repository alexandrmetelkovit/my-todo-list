//инпут
const inputTextTodoNode = document.getElementById("inputTextTodo");
// текст ошибки
const errorMessageNode = document.getElementById("errorMessage");
//кнопка добавить
const addTodoBtnNode = document.getElementById("addTodoBtn");
//
// 1 колонка
const firstTodoOperationNode = document.getElementById("firstTodoOperation");
// 2 колонка
const secondTodoOperationNode = document.getElementById("secondTodoOperation");
// 3 колонка
const thirdTodoOperationNode = document.getElementById("thirdTodoOperation");

//массив тудушек

const firstColumnTodos = [];
const secondColumnTodos = [];
const thirdColumnTodos = [];

//получение текста из поля ввода
const getInputText = () => {
  const text = inputTextTodoNode.value.trim();

  errorMessageNode.classList.add("hidden");
  errorMessageNode.innerText = "";

  if (!text) {
    errorMessageNode.classList.add("error-message");
    errorMessageNode.innerText = "Введите задачу";
    return false;
  }

  return text;
};

//очистка инпута
const clearInput = () => {
  inputTextTodoNode.value = "";
};

const renderFirstColumn = () => {
  firstTodoOperationNode.innerHTML = "";

  firstColumnTodos.forEach((todo, index) => {
    let html = `
		          <li id="${index}" class="todo">
                  <span class="todo-text">${todo.text}</span>
                  <div class="btn-wrap">
                    <button class="move-todo-btn" id="${index}" onclick="moveToSecond(${index})">
                      дальше
                    </button>
                  </div>
              </li> 
		`;
    firstTodoOperationNode.innerHTML += html;
  });
};
const moveToSecond = (index) => {
  // удаляем туду из первой колонки
  const todo = firstColumnTodos.splice(index, 1)[0];
  //добавляем в массив второй колонки
  secondColumnTodos.push(todo);
  // обновляем первую колонку
  renderFirstColumn();
  // обновляем вторую колонку
  renderSecondColumn();
};

const renderSecondColumn = () => {
  secondTodoOperationNode.innerHTML = "";
  secondColumnTodos.forEach((todo, index) => {
    let html = `
		          <li id="${index}" class="todo">
                  <span class="todo-text">${todo.text}</span>
                  <div class="btn-wrap">
                    <button class="back-todo-btn" id="${index}" onclick="backToFirst(${index})">
										назад
                    </button>
                    <button class="move-todo-btn" id="${index}" onclick="moveToThird(${index})">
                      дальше
                    </button>
                  </div>
              </li> 
		`;
    secondTodoOperationNode.innerHTML += html;
  });
};
//
const backToFirst = (index) => {
  const todo = secondColumnTodos.splice(index, 1)[0];
  firstColumnTodos.push(todo);
  renderFirstColumn();
  renderSecondColumn();
};
const moveToThird = (index) => {
  const todo = secondColumnTodos.splice(index, 1)[0];
  thirdColumnTodos.push(todo);
  renderSecondColumn();
  renderThirdColumn();
};

const renderThirdColumn = () => {
  thirdTodoOperationNode.innerHTML = "";
  thirdColumnTodos.forEach((todo, index) => {
    let html = `
		          <li id="${index}" class="todo">
                  <span class="todo-text">${todo.text}</span>
                  <div class="btn-wrap">
                    <button class="back-todo-btn" id="${index}" onclick="moveToSecondBack(${index})">
										назад
                    </button>
                    <button class="move-todo-btn del-todo-btn" id="${index}" onclick="delTodo(${index})">
                      удалить
                    </button>
                  </div>
              </li> 
		`;
    thirdTodoOperationNode.innerHTML += html;
  });
};
const moveToSecondBack = (index) => {
  const todo = thirdColumnTodos.splice(index, 1)[0];
  secondColumnTodos.push(todo);
  renderSecondColumn();
  renderThirdColumn();
};
const delTodo = (index) => {
  thirdColumnTodos.splice(index, 1)[0];
  renderThirdColumn();
};

// Обработчик добавления задачи
const handleInputText = () => {
  const text = getInputText();

  if (!text) {
    return;
  }

  firstColumnTodos.push({ text });
  clearInput();
  renderFirstColumn();
};

// Обработчик событий для кнопки добавления задачи
addTodoBtnNode.addEventListener("click", (e) => {
  e.preventDefault();
  handleInputText();
});
