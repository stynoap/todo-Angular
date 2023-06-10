import { Component, ElementRef, ViewChild } from '@angular/core';
import { Task } from '../task/task.model';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {



  @ViewChild("input") inputRef!:ElementRef<HTMLInputElement>;

  constructor(private servizio: TaskService){

  }
// usata per aggiungere nuovo task, chiama il metodo del servizio
  add(){
    let task:Task = new Task(this.inputRef.nativeElement.value, this.servizio.getId(), "unchecked");
    if(this.inputRef.nativeElement.value==""){
      return;
    }
    this.servizio.addTask(task);
    this.inputRef.nativeElement.value="";
  }

  addWithEnter(e:KeyboardEvent){
    if(e.key=="Enter"){
      this.add();
    }

  }

}
