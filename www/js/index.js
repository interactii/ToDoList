
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);
    },
    onDeviceReady: function() {
        getDate();
        loadToDo();
        alert("Device Ready");
    },
    onPause: function() {
        
    },
    onResume: function() {
        navigator.notification.alert('Welcome Back!');
    }
}

app.initialize();

const dateToday = document.getElementById("date");
const list = document.getElementById("list");
const text_input = document.getElementById("input");
const completed = "completed";
const check = "ui-icon-check";
const uncheck = "ui-icon-clock";
let ToDoList, id;
let dataStore = localStorage.getItem("TODO");

loadToDo =()=> {
    "use strict";
    if(dataStore){
        ToDoList = JSON.parse(dataStore);
        id = ToDoList.length;
        loadList(ToDoList);
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
            toggleTask(element);
        }else if(status=="Delete"){
            deleteTask(element);
        }
        localStorage.setItem("TODO", JSON.stringify(ToDoList));
     });
    }

    function loadList(tdList){
        tdList.forEach((item)=>{
            addToDo(item.name, item.id, item.done, item.trash);
        });
    }

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

    toggleTask = (element) =>{
        element.classList.toggle(check);
        element.classList.toggle(uncheck);
        element.parentNode.querySelector(".text").classList.toggle(completed);
        ToDoList[element.id].done = ToDoList[element.id].done ? false : true;
    }
    
    deleteTask=(element)=>{
        element.parentNode.parentNode.removeChild(element.parentNode);
        ToDoList[element.id].trash = true;
    }

    getDate = () =>{
        var date = new Date();
        dateToday.innerHTML = date.toLocaleDateString("en-US", { 
            weekday: "long",
            month:"short",
            day:"numeric"
        })
    }



/*
* This works on web browser
*

const dateToday = document.getElementById("date");
const list = document.getElementById("list");
const text_input = document.getElementById("input");

let ToDoList, id;
let dataStore = localStorage.getItem("TODO");

const completed = "completed";
const check = "ui-icon-check";
const uncheck = "ui-icon-clock";

let app = {
    initialize: function() {
        this.bindEvents();
        this.getDate();
        this.loadToDo();
    },
    bindEvents: function() {
        // Here we register our callbacks for the lifecycle events we care about
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('pause', this.onPause, false);
        document.addEventListener('resume', this.onResume, false);
    },
    onDeviceReady: function() {
        
    },
    onPause: function() {

    },
    onResume: function() {
        navigator.notification.alert('Welcome Back!');
    },

    loadToDo: function(){
        "use strict";
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
                    app.addToDo(todo, id, false, false);
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

    toggleTask:  function(element){
        element.classList.toggle(check);
        element.classList.toggle(uncheck);
        element.parentNode.querySelector(".text").classList.toggle(completed);
        ToDoList[element.id].done = ToDoList[element.id].done ? false : true;
    },
    
    deleteTask: function(element){
        element.parentNode.parentNode.removeChild(element.parentNode);
        ToDoList[element.id].trash = true;
    },
    
    getDate: function(){
        var date = new Date();
        dateToday.innerHTML = date.toLocaleDateString("en-US", { 
        weekday: "long",
        month:"short",
        day:"numeric"
    })
    }
}

app.initialize();
*/