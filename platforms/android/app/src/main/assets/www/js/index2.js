
/*
var app = {
    initialize: function() {
      document.addEventListener('deviceready', app.init);
    },
    
    onDeviceReady: function() {
        var date = new Date();
        dateToday.innerHTML = date.toLocaleDateString("en-US", { weekday: "long", month:"short", day:"numeric"});
    },
    onPause: function() {
        
    },
    onResume: function(event) {
        navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
    }
}
*/

let app = {
    initialize: function(){
        document.addEventListener('deviceready', app.init);
        let p = document.querySelector('#status p');
        let data = localStorage.getItem('PauseApp');
        if (data){
            p.textContent("PAUSED")
        }else{
            p.textContent("OK")
        }
    },
    init:function(){
        document.addEventListener('pause', app.paused);
        document.addEventListener('resume', app.resume);
    },
    paused: function(event){
        console.dir(event);
        localStorage.setItem("PauseApp");
    },
    resumed: function(event){
        console.dir(event);
        let p = document.querySelector('#status p');
        let data = localStorage.getItem('PauseApp');
        if (data){
            p.textContent("PAUSED")
        }else{
            p.textContent("OK")
        }
    },

    loadToDo: function(){
        const dateToday = document.getElementById("date");
        const list = document.getElementById("list");
        const text_input = document.getElementById("input");

        const completed = "completed";
        const check = "ui-icon-check";
        const uncheck = "ui-icon-clock";

        let ToDoList, id;
        let dataStore = localStorage.getItem("TODO");

        if(dataStore){
            ToDoList = JSON.parse(dataStore);
            id = ToDoList.length;
            app.loadList(ToDoList);
        }else{
            ToDoList = [];
            id = 0;
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
                app.toggleTask(element);
            }else if(status=="Delete"){
                app.deleteTask(element);
            }
            localStorage.setItem("TODO", JSON.stringify(ToDoList));
         });
    },

    loadList: function(tdList){
        tdList.forEach((item)=>{
            app.addToDo(item.name, item.id, item.done, item.trash);
        });
    },

    addToDo: function(todo, id, done, trash){
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
    },

    toggleTask = (element) => {
        element.classList.toggle(check);
        element.classList.toggle(uncheck);
        element.parentNode.querySelector(".text").classList.toggle(completed);
        ToDoList[element.id].done = ToDoList[element.id].done ? false : true;
    },
    
    deleteTask = (element) =>{
        element.parentNode.parentNode.removeChild(element.parentNode);
        ToDoList[element.id].trash = true;
    }
};

app.initialize();
