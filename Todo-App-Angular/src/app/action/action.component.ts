import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent {

  constructor(private service:TaskService){}

  deleteAll(){
    console.log("ciao")
    this.service.deleteAll();
  }

  checkAll(){
    this.service.checkAll();
  }

  uncheckAll(){
    this.service.uncheckAll();
  }

  deleteChecked(){
    this.service.deleteChecked();
  }

}
