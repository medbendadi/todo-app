const dateInput = document.querySelector('.datepicker-input');

const tasks_container = document.getElementById("tasks-container")
const taskselec= document.querySelectorAll(".tasks-container")


const activeBtn = document.querySelector(".active")


const input = document.getElementById("input");
const send = document.getElementById("send");

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });        
}
function TimeFix(time){
   if(time < 10){
      time = `0${time}`
   }
   return time
}

function GetTime(){
   var today = new Date();
   var fulldate =  (today.getMonth()+1) +'/'+today.getDate()+'/'+today.getFullYear()
   var fullDay= getDayName(fulldate , "en");
   var day = fullDay.slice(0, 3);
   var hour = TimeFix(today.getHours());
   var minutes = TimeFix(today.getMinutes());
   var time = `${day}, ${hour}:${minutes}`;
   return time

}

let data;

if(localStorage.task != null){
   data = JSON.parse(localStorage.task)
}else{
   data = [];
}


function clearCompleted(){
   let ind= [];
   for(let i =0; i < data.length;i++){
      if(data[i].completed == true){
         ind.push(i)
      }
   }
   console.log(ind)
   for(let i =0; i < ind.length ; i++){
      data.splice(ind[i],1)
   }
   localStorage.setItem('task', JSON.stringify(data))
   setTodo()
}


let x = 0;

function setTodo(){
   let x = 0;
   tasks_container.innerHTML ="";
   for(let i = 0 ; i<data.length; i++){
      if(data[i].completed === true){
         tasks_container.innerHTML += `
         <div class="task active">
            <button class="check check-task">
            <i class="fa-solid fa-check"></i>
            </button>
            <p class="task-text">${data[i].text}</p>
            <p class="time">${data[i].time}</p>
         </div>
         `
      }else {
         x++;
         tasks_container.innerHTML += `
         <div class="task">
            <button class="check check-task">
            <i class="fa-solid fa-check"></i>
            </button>
            <p class="task-text">${data[i].text}</p>
            <p class="time">${data[i].time}</p>
         </div>
         `
      }
   }
   tasks_container.innerHTML +=`
   <div class="tasks-info">
   <h4 class="items-left">${x} items left</h4>
   <div class="lists">
      <ul>
         <li class="all" onclick="setTodo()">All</li>
         <li class="active" onclick="getActive()">Active</li>
         <li class="complet" onclick= "getCompleted()">Completed</li>
      </ul>
      </div>
      <h4 class="clear" onclick="clearCompleted()">
      Clear Completed
   </h4>
   </div>
   `
   const check = document.querySelectorAll(".task")
   

   taskselec.forEach(el => {
      
      
   })
   check.forEach(el => {
      el.addEventListener("click", () => {
         el.classList.toggle("active")
         for(let i =0 ; i<data.length; i++){
                  if(el.classList.contains("active")){
                     x= x-1;
                     setTodo()
                  if(data[i].text === el.querySelector(".task-text").innerHTML && data[i].time === el.querySelector(".time").innerHTML){
                     data[i].completed = true
                     localStorage.setItem('task', JSON.stringify(data))
                     console.log("WO")
                  }
               }else {
                  x++;
                  setTodo()
                  if(data[i].text === el.querySelector(".task-text").innerHTML && data[i].time === el.querySelector(".time").innerHTML){
                     data[i].completed = false
                     localStorage.setItem('task', JSON.stringify(data))
                  }
               }
               
               
            }
         console.log("khdam")
      })
   })
}
setTodo()




function getActive(){
   tasks_container.innerHTML ="";
   for(let i = 0 ; i<data.length; i++){
      if(data[i].completed !== true){
         x++
         tasks_container.innerHTML += `
         <div class="task">
            <button class="check check-task">
            <i class="fa-solid fa-check"></i>
            </button>
            <p class="task-text">${data[i].text}</p>
            <p class="time">${data[i].time}</p>
         </div>
         `
      }}
      tasks_container.innerHTML +=`
      <div class="tasks-info">
      <h4 class="items-left">${x} items left</h4>
      <div class="lists">
         <ul>
            <li class="all" onclick="setTodo()">All</li>
            <li class="active" onclick="getActive()">Active</li>
            <li class="complet" onclick= "getCompleted()">Completed</li>
         </ul>
         </div>
         <h4 class="clear" onclick="clearCompleted()">
         Clear Completed
      </h4>
      </div>
      `
}

function getCompleted(){
      tasks_container.innerHTML ="";
      for(let i = 0 ; i<data.length; i++){
         if(data[i].completed === true){
            tasks_container.innerHTML += `
            <div class="task active">
               <button class="check check-task">
               <i class="fa-solid fa-check"></i>
               </button>
               <p class="task-text">${data[i].text}</p>
               <p class="time">${data[i].time}</p>
            </div>
            `
         }}
         tasks_container.innerHTML +=`
         <div class="tasks-info">
         <h4 class="items-left">${x} items left</h4>
         <div class="lists">
            <ul>
               <li class="all" onclick="setTodo()">All</li>
               <li class="active" onclick="getActive()">Active</li>
               <li class="complet" onclick= "getCompleted()">Completed</li>
            </ul>
            </div>
            <h4 class="clear" onclick="clearCompleted()">
            Clear Completed
         </h4>
         </div>
         `
}


send.addEventListener("click", () =>{
   const check = document.querySelectorAll(".task")
   
   let text = input.value;
   
   const time = GetTime()
   let task = {
      text: text,
      time: time,
      completed: false
   }
   if(task.text !==''){
      data.push(task);
      localStorage.setItem("task", JSON.stringify(data));
      input.value = "";
   }
   
})



const checkBtn = document.getElementById("check-task")

function setActive(clas){
   const el = document.querySelector(clas)
   el.classList.toggle("active")
}

input.addEventListener("keyup", function(event){
   if(event.keyCode === 13){
      let text = input.value;
   const time = GetTime()
      send.click();
      setTodo()
   }
})