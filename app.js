const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add");
const alertMassage = document.querySelector("#alert-message");
const todosBody = document.querySelector("tbody");
const deleteAll = document.querySelector("#delete-all");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
 console.log(todos);

const generateId = ()=>{
    return Math.round(Math.random() * Math.random() * Math.pow(10,13)).toString();
};


const saveLocalStarge=()=>{
 localStorage.setItem("todos",JSON.stringify(todos));
};


const showAlert = (message , type)=>{
    alertMassage.innerHTML = " ";
    const alarmText = document.createElement("p");
    alarmText.classList.add("alarm");
    alarmText.classList.add(`alarm-${type}`);
    alarmText.innerText = message;
    alertMassage.appendChild(alarmText);
    setTimeout(()=>{
       alarmText.style.display = "none";
    },2000)
   
   };

   const showTodos = (data)=>{
    const todoList = data ? data : todos;
       todosBody.innerHTML = "";
       if(!todoList.length){
           todosBody.innerHTML = " <tr><td colspan='4'>No Task found </td></tr>";
           return;
       }
       
   todoList.forEach(todo => {
       
   
           todosBody.innerHTML += `<tr>
           <td>${todo.task}</td>
           <td>${todo.date || "No Date"}</td>
           <td>${todo.complete ? "complete" : "pending"}</td>
           <td>
           <button onclick = "editHandler('${todo.id}')">Edit</button>
           <button onclick = "doneHandler('${todo.id}')">${todo.complete ? "Undo" : "Do"} </button>
           <button onclick = "deleteHandeler('${todo.id}')">Delete</button>
           </td>
           
           </tr>`;
       });
       
   
   }

const addButtonHandler = ()=>{
    const task = taskInput.value;
    const date = dateInput.value;
    const todo ={
     id: generateId(),
     complete : false,
     task,
     date,
    }
   
    if(task){
        todos.push(todo);
        saveLocalStarge();
        taskInput.value ="";
        dateInput.value ="";
        showTodos();
        showAlert("task add successfully!" , "success"); 
    }else{
        showAlert("please enter your task !" , "error");
        showTodos();
      
       }
 
 };
 const deleteAllHandler = ()=>{
    if(todos.length){
        todos = [];
        saveLocalStarge();
        showTodos();
        showAlert("All tasks are delete !" , "success");

    }else{
        showAlert("No task to delete !" , "error");
    }
 
};

addButton.addEventListener("click" , addButtonHandler);
deleteAll.addEventListener("click" , deleteAllHandler);

