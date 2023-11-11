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
const deleteHandeler =(id)=>{
    const newTodo = todos.filter((todo)=> todo.id !== id);
    todos = newTodo;
    showTodos();
    saveLocalStarge();
    showAlert("the task is deleted successfully!" , "success");
    
    };
    const editHandler = (id)=>{
        const editTodo= todos.find((todo)=> todo.id === id);
         taskInput.value = editTodo.task;
         dateInput.value = editTodo.date;
         editButton.style.display = "inline-block";
         addButton.style.display = "none";
         editButton.dataset.id = id;
      };
      
      const editButtonHandler=(event)=>{
        const id = event.target.dataset.id;
        const editTodo = todos.find((todo)=>todo.id === id);
        editTodo.task = taskInput.value;
        editTodo.date = dateInput.value;
        taskInput.value ="";
        dateInput.value = "";
        saveLocalStarge();
        showTodos();
        showAlert("edit task done successfully" , "success")
      
      
         editButton.style.display = "none";
         addButton.style.display = "inline-block";
      };
      const doneHandler = (id)=>{
        const doneTodo = todos.find((todo)=> todo.id === id);
        doneTodo.complete = !doneTodo.complete;
        saveLocalStarge();
        showTodos();
        showAlert("Todos status change successfully" , "success")
        
        }
    

addButton.addEventListener("click" , addButtonHandler);
deleteAll.addEventListener("click" , deleteAllHandler);
editButton.addEventListener("click" ,editButtonHandler );

