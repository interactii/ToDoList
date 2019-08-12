//   var app = {
//      // Application Constructor
//       initialize: function() {
//           document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//       },

//       // deviceready Event Handler
//       //
//       // Bind any cordova events here. Common events are:
//       // 'pause', 'resume', etc.
//       onDeviceReady: function() {
//         
//         
//         alert('function test success')
//       },

//       // Update DOM on a Received Event
//     //   receivedEvent: function(id) {
//     //     var parentElement = document.getElementById(id);
//     //       var listeningElement = parentElement.querySelector('.listening');
//     //       var receivedElement = parentElement.querySelector('.received');

//     //       listeningElement.setAttribute('style', 'display:none;');
//     //       receivedElement.setAttribute('style', 'display:block;');

//     //       console.log('Received Event: ' + id);
//     //   }
//   };

//   app.initialize();

document.addEventListener('deviceready', init, false);

const dateToday = document.getElementById("date");
const list = document.getElementById("list");
const text_input = document.getElementById("input");

const completed = "completed";
const check = "ui-icon-check";
const uncheck = "ui-icon-clock";


let ToDoList, id;
let dataStore = localStorage.getItem("TODO");

function init(){
    var date = new Date();
    dateToday.innerHTML = date.toLocaleDateString("en-US", { weekday: "long", month:"short", day:"numeric"});
    alert('Success')
}

if(dataStore){
    ToDoList = JSON.parse(dataStore);
    id = ToDoList.length;
    loadList(ToDoList);
}else{
    ToDoList = [];
    id = 0;
}

function loadList(tdList){
    tdList.forEach((item)=>{
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

document.addEventListener("keyup", function(keyEvent){
    if (keyEvent.keyCode == 13 ){
        const todo = text_input.value;
        if(todo){
            addToDo(todo, id, false, false);
            ToDoList.push(
                {
                    name: todo,
                    id: id,
                    done: false,
                    trash: false
                }
            );
            localStorage.setItem("TODO", JSON.stringify(ToDoList));
            id++
        }
        input.value = "";
    }
});

list.addEventListener("click", function(clickEvent){
   let element = clickEvent.target;
   const status = clickEvent.target.attributes.status.value;
   if(status=="Done"){
       toggleTask(element);
   }else if(status=="Delete"){
       deleteTask(element);
   }else if(status=="Complete"){
       completeTask(element);
   }
   localStorage.setItem("TODO", JSON.stringify(ToDoList));
})

function addToDo(todo, id, done, trash){
    if(trash){return;}
    var DONE = done ? check : uncheck;
    var COMPLETE = done ? completed : "";
    const newTask = `<li class="item">
                        <i class="ui-btn ui-shadow ui-corner-all ${DONE} ui-btn-icon-notext ui-btn-inline co" status="Done" id="${id}"></i>
                        <p class="text ${COMPLETE}" id="${id}">${todo}</p>
                        <i class="ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-inline de" status="Delete" id="${id}"></i> 
                    </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, newTask);
}

 toggleTask = (element) => {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(completed);
    ToDoList[element.id].done = ToDoList[element.id].done ? false : true;
}

deleteTask = (element) =>{
    element.parentNode.parentNode.removeChild(element.parentNode);
    ToDoList[element.id].trash = true;
}
