import { Injectable } from '@angular/core';
import { Task } from './task/task.model';

// servizio che tiene i dati e fa da tramite tra i componenti
@Injectable({
  providedIn: "root"
})


export class TaskService  {

  taskList: Task[]=this.getLocalStorageData();
  filter:string='all';

  constructor() { }
// resituisce dati localStorage
  getLocalStorageData(){
    if(localStorage.getItem("data")){
      let dati:any=localStorage.getItem("data");
      let datiParsed=JSON.parse(dati);
      console.log(datiParsed);
      let arrayOfTask:Task[]=[];
      datiParsed.forEach((dato: { content: string; id: number; status: string; }) => {
        let newTask = new Task(dato.content, dato.id, dato.status);
        arrayOfTask.push(newTask);

      });
      return arrayOfTask;
    }else{
      return [];
    }
  }
// aggiora il local storage
  updateLocalStorage(){
    localStorage.setItem("data", JSON.stringify(this.taskList));
  }
// usata per impostare i filtri all, done, active
  setFilter(filter:string){
    this.filter=filter;
  }
// utilizzata per fare gli id dinamici
  getId(){
    return this.taskList.length;
  }
// crea un nuovo oggetto Task
  addTask(task:Task){
    this.taskList.push(task);
    this.updateLocalStorage();
  }
// usata nel componente tasklist, restituisce la tasklist da visualizzare sulla base del filtro,
//  in quale è all di default
  getTaskList(){
    if(this.filter=='done'){
      let arrayDone:Task[]=[];
      this.taskList.forEach(task => {
        if(task.status=='checked'){
          arrayDone.push(task);
        }

      });
      return arrayDone;
    }
    if(this.filter=='active'){
      let arrayActive:Task[]=[];
      this.taskList.forEach(task => {
        if(task.status=='unchecked'){
          arrayActive.push(task);
        }

      });
      return arrayActive;
    }

    return this.taskList;

  }
// rimuove tutti i task
  deleteAll(){
    for (let i = this.taskList.length - 1; i >= 0; i--) {
      this.taskList.splice(i, 1);
    }
    this.updateLocalStorage();
  }
// ogni task è impostato a status checked
  checkAll(){

    this.taskList.forEach(task=> {
      task.status="checked";
    });
    this.updateLocalStorage();

  }
// ogni task è impostato a status unchecked
  uncheckAll(){
    this.taskList.forEach(task=>{
      task.status="unchecked";
    });
    this.updateLocalStorage();
  }

  // rimuove i task con status checked
  deleteChecked(){
   let taskChecked:Task[]=[];
    this.taskList.forEach(task => {
      if(task.status=='checked'){
        taskChecked.push(task);
      }
    });
    this.taskList = this.taskList.filter(task => !taskChecked.includes(task));
    console.log(this.taskList);
    this.updateLocalStorage();
  }
// modifica alla premuta della checkbox, lo stato
  changeStatus(taskChanging:Task){
    this.taskList.forEach(task=>{
      if(task.id==taskChanging.id){
        if(taskChanging.status=='unchecked'){
          task.status='checked';
        }else{
          task.status='unchecked';
        }
      }
    })
    this.updateLocalStorage();
  }
// rimuove il singolo task alla premuta del pulsante
  deleteSingleTask(taskDeleteble:Task){

    this.taskList.forEach(task => {
      if(task.id==taskDeleteble.id){
        let indexTask = this.taskList.indexOf(task);
        if (indexTask !== -1) {
          this.taskList.splice(indexTask, 1);
        }
      }
    });
    this.updateLocalStorage();
  }

  // alla premuta del pulsante edit, modifica lo status in edit
  editSingleTask(taskEditable:Task){
    this.taskList.forEach(task => {
      if(task.id==taskEditable.id){
        task.status="edit";
      }
    });

    this.updateLocalStorage();

  }

// rimuove la modalità edit alla premuta del pulsante per tornare indietro (freccia)
undoChanges(taskUndoStatus:Task){
  this.taskList.forEach(task =>{
    if(taskUndoStatus.id==task.id){
      task.status="unchecked";
    }
  });
  this.updateLocalStorage();

}
// attualizza la modifica alla premuta del tasto invio
insertEdit(newContent:string, taskInEdit:Task){
  this.taskList.forEach(task => {
    if(task.id==taskInEdit.id){
      task.content=newContent;
    }

  });
  this.updateLocalStorage();

}

}
