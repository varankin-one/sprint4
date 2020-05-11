const taskName = document.querySelector(".task-name");
const tasks = document.querySelector(".tasks");

function deleteElement(evt){
  console.log("remove", evt);
  element.parentElement.remove();
  evt.stopPropagation();
}

function listenDeleteTodo(element) {
    element.addEventListener("click", deleteElement);
  }

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

taskName.addEventListener("keypress", (keyPressed) => {
  console.log(keyPressed);
  const keyEnter = 13;
  if (keyPressed.which == keyEnter) {
    createTodo();
  }
});

