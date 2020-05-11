const taskName = document.querySelector(".task-name");
const tasks = document.querySelector(".tasks");

// находим кнопку по классу .actions__save
const saveButton = document.querySelector(".actions__save");

// сохранить задачи в локальное хранилище
function save() {
  localStorage.setItem("tasks", tasks.innerHTML);
}
saveButton.addEventListener("click", save);

// навесить на элемент удаление по клику
function listenDeleteTodo(element) {
  element.addEventListener("click", function deleteElement(evt) {
    element.parentElement.remove();
    evt.stopPropagation();
  });
}

// добавление задачи в список
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

// функция обработчик нажатия клавиши Enter
function onEnter(evt) {
  const keyEnter = 13;
  // если нажали Enter
  if (evt.which == keyEnter) {
    // добавляем задачу
    createTodo();
  }
}
// на инпут для ввода имени подключаем прослушивание нажатия кнопки
taskName.addEventListener("keypress", onEnter);

// загрузить задачи из локального хранилища
function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks.innerHTML = data;
  }

  // добавить на каждый элемент удаление
  const deleteButtons = document.querySelectorAll(".task__trash");
  for (const button of deleteButtons) {
    listenDeleteTodo(button);
  }
}

loadTasks();
