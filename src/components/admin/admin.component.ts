import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Queue } from '@models/queue.model';
import { Response } from '@models/response.model';




import { LaserCutterService } from '@services/lasercutter.service';

@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html',
  providers: [LaserCutterService],
})


export class Admin implements OnInit {

  constructor(
    private router: Router,
    private lasercutter: LaserCutterService,
    private formBuilder: FormBuilder

    //private home: Home,
    //private account: Account,
  ) { }
  lasercutterForm: FormGroup;
  responseAll: Response;
  responseHanes: Response;
  responseMurray: Response;

  activeMurray: Queue[];
  activeHanes: Queue[];
  murrayQueue: Queue[];
  hanesQueue: Queue[];


  ngOnInit() {

    this.lasercutterForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', [Validators.required]]
    });

    //this.lasercutter.getQueue().subscribe(data => { this.activeQueue = data.data });
    this.lasercutter.getQueueAtLocationAdmin("Hanes").subscribe(data => { this.hanesQueue = data.data, this.newDate(this.hanesQueue) });
    this.lasercutter.getQueueAtLocationAdmin("Murray").subscribe(data => { this.murrayQueue = data.data, this.newDate(this.murrayQueue) });
  }



  newDate(queueArray: Queue[]){
    for (let queue of queueArray) {
      var temp =  new Date(queue.create_date);
      var hour = temp.getHours();
      var time = "AM";
      if (hour > 12){
        hour = hour -12;
        time = "PM"
      }
      var min ="0"+ temp.getMinutes().toString();
      var sec ="0" + temp.getSeconds().toString();
      queue.create_date = hour.toString()+':'+ min.substr(-2)+':' + sec.substr(-2)+' '+time;
    }
  }

  onSubmit() {
    this.lasercutter.addUserToQueueAdmin(this.lasercutterForm.value).subscribe(data=>{console.log(data), this.ngOnInit()});

  }
  onClick() {
    this.lasercutter.logout().subscribe(data => { });
  }


  drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}
  removeFromQueue(queue: Queue) {
    //var target = event.target.attributes.id;
   //var value = target.nodeValue;
    var _id = queue._id;
    console.log(_id);
    this.lasercutter.removeUserFromQueueAdmin(_id).subscribe(response => { console.log(response), this.ngOnInit() })

    return true;
  }



}
