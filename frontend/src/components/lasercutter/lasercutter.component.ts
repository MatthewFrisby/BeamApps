import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Queue } from '@models/queue.model';
import { Response } from '@models/response.model';




import {LaserCutterService } from '@services/lasercutter.service';

@Component({
  selector: 'lasercutter-root',
  templateUrl: './lasercutter.component.html',
  providers: [LaserCutterService],
})


export class Lasercutter implements OnInit{

  constructor(
      private router: Router,
      private lasercutter: LaserCutterService,
      //private home: Home,
      //private account: Account,
  ) {}
  responseAll: Response;
  responseHanes: Response;
  responseMurray: Response;

  activeMurray: Queue[];
  activeHanes: Queue[];
  murrayQueue: Queue[] = [];
  hanesQueue: Queue[] = [];

  hanesBool: Boolean;
  murrayBool: Boolean;
  timeLeft: number = 20;
  interval;

  ngOnInit() {
    //this.lasercutter.getQueue().subscribe(data=>{this.activeQueue=data.data});
    this.timeLeft = 20;
    this.lasercutter.getQueueAtLocation("Hanes").subscribe(data=>{this.hanesQueue = data.data, this.newDate(this.hanesQueue), this.lasercutter.getQueueAtLocation("Murray").subscribe(data=>{this.murrayQueue = data.data, this.newDate(this.murrayQueue), this.startTimer(true)});});




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
startTimer(bool: Boolean) {
  if(bool == true){
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        //console.log(this.timeLeft);
      } else {
        this.ngOnInit();
        clearInterval(this.interval);
      }
    },1000)
  }
  }





}
