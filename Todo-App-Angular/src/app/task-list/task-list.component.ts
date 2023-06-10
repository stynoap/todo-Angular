import { Component, DoCheck } from '@angular/core';
import { Task } from '../task/task.model';
import { TaskService } from '../task.service';




@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements DoCheck {
  taskList!: Task[];

  constructor(private taskService:TaskService){
    // recupera l'array di task dal servizio
   this.taskList=this.taskService.getTaskList();
  }
  ngDoCheck(): void {
    this.taskList=this.taskService.getTaskList();
  }





}
