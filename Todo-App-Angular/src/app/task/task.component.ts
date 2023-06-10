import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!:Task;
  @ViewChild ('checkbox') checkbox!: ElementRef <HTMLInputElement>;


  constructor(private taskService:TaskService){
  }

  changeStatus(){
      this.taskService.changeStatus(this.task);

  }

  editTask(){
    this.taskService.editSingleTask(this.task);
  }

  deleteTask(){
    this.taskService.deleteSingleTask(this.task);
  }

  undoChanges(){
    this.taskService.undoChanges(this.task);
  }
// se il tasto premuto è uguale a invio, chiamo il metodo del servizio e attualizzo la modifica
  actualizeEdit(evento: KeyboardEvent){
    console.log(evento);
    if(evento.code=="Enter"){
      this.taskService.insertEdit((<HTMLInputElement>evento.target).value, this.task)
      this.taskService.undoChanges(this.task);
    }
  }

}
