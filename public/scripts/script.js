const taskName = document.querySelector(".task-name");
const tasks = document.querySelector(".tasks");

/* сохранение в браузер */
const saveButton = document.querySelector(".actions__save");

function save() {
  // сохранение задач в локальное хранилище
  localStorage.setItem("tasks", tasks.innerHTML);
}
saveButton.addEventListener("click", save);

/* удаление задачи из списка */
function listenDeleteTodo(element) {
  element.addEventListener("click", function deleteElement(evt) {
    element.parentElement.remove();
    evt.stopPropagation();
  });
}

/* добавление задачи в список */
function createTodo() {
  // создать элемент для таски
  const item = document.createElement("li");
  item.classList.add("tasks__item", "task");

  // заполнить его свойства
  item.innerHTML = `
    <span class="task__text"></span>
    <span class="task__trash">
      <i class="fas fa-trash-alt"></i>
    </span>
  `;

  // ищем именно в item, т.к. иначе будет найдена первая задача в списке
  const taskText = item.querySelector(".task__text");
  taskText.append(taskName.value);

  // добавляем событие для удаления элемента
  listenDeleteTodo(item.querySelector(".task__trash"));

  // положить в общий список
  tasks.appendChild(item);

  // занулить значение
  taskName.value = "";
}

function onEnter(evt) {
  const keyEnter = 13;
  // если нажали Enter
  if (evt.which == keyEnter) {
    // добавляем задачу
    createTodo();
  }
}
// прослушиваем нажатие клавиши Enter
taskName.addEventListener("keypress", onEnter);

/* загрузка задач из хранилища */
function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks.innerHTML = data;
  }
}

loadTasks();
