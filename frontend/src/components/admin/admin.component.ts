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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { timer } from 'rxjs';






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
  murrayQueue: Queue[]=[];
  hanesQueue: Queue[]=[];

  timeLeft: number = 60;
  interval;

  data: Queue[]=[];






  ngOnInit() {

    this.lasercutterForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });

    //this.lasercutter.getQueue().subscribe(data => { this.activeQueue = data.data });
    this.lasercutter.getQueueAtLocationAdmin("Hanes").subscribe(data => { this.hanesQueue = data.data, this.newDate(this.hanesQueue) });
    this.lasercutter.getQueueAtLocationAdmin("Murray").subscribe(data => { this.murrayQueue = data.data, this.newDate(this.murrayQueue) });




  }

   get f() { return this.lasercutterForm.controls; }


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
    if(this.lasercutterForm.controls['location'].value == "Hanes Art Center"){
      this.lasercutterForm.controls['location'].setValue("Hanes");

    }
    this.lasercutter.addUserToQueueAdmin(this.lasercutterForm.value).subscribe(data=>{console.log(data), this.ngOnInit()});

  }
  onClick() {
    this.lasercutter.logout().subscribe(data => { });
  }


  drop(event: CdkDragDrop<Queue[]>) {
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

    this.lasercutter.toggleLive(_id, Date.now().toString()).subscribe(response => { console.log(response), this.ngOnInit() })

    //this.lasercutter.removeUserFromQueueAdmin(_id).subscribe(response => { console.log(response), this.ngOnInit() })

    return true;
  }

  queueUpOrDown(queue: Queue){
    this.haveUntil(queue, Date.now());
    this.lasercutter.toggleOnCutter(queue._id, queue.timeLeft).subscribe(response=>{console.log(response), this.ngOnInit()});
  }


  startTimer() {
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 60;
          this.ngOnInit();
        }
      },1000)
    }

    haveUntil(queue: Queue, date: any){

      var plus = date + 5400000;
      var temp =  new Date(plus);
      var hour = temp.getHours();
      var time = "AM";
      if (hour > 12){
        hour = hour -12;
        time = "PM"
      }
      var min ="0"+ temp.getMinutes().toString();
      var sec ="0" + temp.getSeconds().toString();
      queue.timeLeft = hour.toString()+':'+ min.substr(-2)+':' + sec.substr(-2)+' '+time;
    }


    getData(){

      this.lasercutter.getData().subscribe(res=>{this.data = res.data});

    }







}
