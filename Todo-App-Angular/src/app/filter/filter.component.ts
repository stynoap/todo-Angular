import { Component, Input } from '@angular/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {


  constructor(private service:TaskService){}

// i seguenti metodi impostano il filtro
all(){
  this.service.setFilter('all');
}
done(){
  this.service.setFilter('done');
}
active(){
  this.service.setFilter('active');
}

}
