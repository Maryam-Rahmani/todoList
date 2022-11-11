// elements
const container = document.querySelector(".container"),
taskContainer = document.querySelector(".task-container"),
taskLists = document.querySelector(".task-lists"),
taskTitle = document.querySelector("#task-title"),
taskDescription = document.querySelector("#task-description"),
addButton = document.querySelector("#btn-add"),
modalInput = document.querySelector("#modal-task-title"),
modalDescription = document.querySelector("#modal-task-description"),
saveEdit =  document.querySelector("#saveEdit"),
alertPlaceInput =  document.querySelector("#useAlertInput"),
alertPlaceDescription =  document.querySelector("#useAlertDescription");

let todoList = JSON.parse(localStorage.getItem("todo-list")),
taskDone = false;


// show task lists
const listShow = () => {
  todoList = JSON.parse(localStorage.getItem("todo-list"));
  let htmlTags = "";
    (todoList && todoList.forEach((taskValue, index) =>{
        htmlTags += `
                      <div class="task">
                        <span class="task-span" id="span-input">${taskValue.name}</span>
                        <span class="task-span" id="span-textarea">${taskValue.explain}</span>
                        <div class="task-div" id="task-div">${taskDone ? `<div id="div-done">Done!</div>` : " "}</div>
                        <div class="btn-div">
                          <button " id="done-button" style="background-color : ${!taskDone ? "#1435eec2" : "#5f6064c2"};" onclick="doneTask()">
                            ${!taskDone ? "Done" : "not done yet"}
                          </button>
                          <button  id="edit" id="${index}" onclick='edit(${index}, "${taskValue.name}"," ${taskValue.explain}")' data-toggle="modal" data-target="#editModal">
                            Edit
                          </button>
                          <button id="remove" onclick="removeTask(${index})">
                            Remove
                          </button>
                        </div>
                      </div>
                    `; 
      }))
  taskLists.innerHTML = htmlTags
}

// click Done button
const doneTask = () => {
  taskDone = (taskDone ? false : true)
  listShow()
}

// click Remove button
const removeTask = (index) => {
  todoList.splice(index, 1);
  localStorage.setItem("todo-list", JSON.stringify(todoList));
  listShow()
}

// click Edit button 
const edit =(index, name, explain) => {
  const todoList = JSON.parse(localStorage.getItem("todo-list"))
  modalInput.value = name
  modalDescription.value = explain
  saveEdit.setAttribute("id", index)
  saveEdit.addEventListener("click", () => {
    let id = saveEdit.id
    if (id == index){
      todoList[index].name = modalInput.value.trim()
      todoList[index].explain = modalDescription.value.trim()
      localStorage.setItem("todo-list", JSON.stringify(todoList));
      listShow()
      saveEdit.setAttribute("data-dismiss", "modal")
    }
  })
}

// set alert
const alert = (item, type, value) => {
  const alertBody = document.createElement('div')
  alertBody.setAttribute("id", "Alert")
  alertBody.innerHTML = `
                        <div class="alert alert-${type}" role="alert">
                          ${value? `Your Task${item} Has Been Successfully`:`${item}Field Must Be Fill`}
                        </div>
                        `;
  if (item ==="input"){
    alertPlaceInput.append(alertBody)
  }else {
    alertPlaceDescription.append(alertBody)
  } 

  function removeAlert() {
    let select = document.querySelector("#Alert")
    select.remove()
  }

  setTimeout(removeAlert, 3000)
}

// click Add Task
addButton.addEventListener("click", () => {
  let title = taskTitle.value
  let description = taskDescription.value

  if ("click" && title !== "" && description !== "") {
      todoList = !todoList ? [] : todoList;
      let todoInfo = {name: title, explain: description.trim(), id:title.trim()}
      todoList.push(todoInfo)
      taskTitle.value = "";
      taskDescription.value = "";
      localStorage.setItem("todo-list", JSON.stringify(todoList));
      listShow()
      alert("input", "success", true)
      alert("description", "success", true)

  } else if("click" && title === "" && description === "") {
    alert("input", "danger", false)
    alert("description", "danger", false)
   
  }else if ("click" && title !== ""){
    alert("input", "success", true)
    alert("description", "danger", false)
    
  }else if ("click" && description !== "") {
    alert("input", "danger", false)
    alert("description", "success", true)
  }
})




