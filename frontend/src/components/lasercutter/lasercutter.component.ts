import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Queue } from '@models/queue.model';
import { Response } from '@models/response.model';
import {AuthenticationService } from '@services/authentication.service';





import {LaserCutterService } from '@services/lasercutter.service';

@Component({
  selector: 'lasercutter-root',
  templateUrl: './lasercutter.component.html',
  providers: [LaserCutterService],
})


export class Lasercutter implements OnInit{

  private sub: Subscription;

  constructor(
      private router: Router,
      private lasercutter: LaserCutterService,
      private authenticationService: AuthenticationService

      //private home: Home,
      //private account: Account,
  ) {this.authenticationService.isAuthenticated();}
  responseAll: Response;
  responseHanes: Response;
  responseMurray: Response;
  responseCmike: Response;


  activeMurray: Queue[];
  activeCmike: Queue[];
  activeHanes: Queue[];
  murrayQueue: Queue[] = [];
  hanesQueue: Queue[] = [];
  cmikeQueue: Queue[] = [];


  hanesBool: Boolean;
  murrayBool: Boolean;
  cmikeBool: Boolean;
  timeLeft: number = 10;
  interval;
  stop: Boolean = false;

  ngOnInit() {
    //this.lasercutter.getQueue().subscribe(data=>{this.activeQueue=data.data});


    this.timeLeft = 5;
    this.sub = this.lasercutter.getQueueAtLocation("Hanes")
            .subscribe(data=>{
                this.hanesQueue = data.data,
                this.newDate(this.hanesQueue),
                this.lasercutter.getQueueAtLocation("Murray")
                      .subscribe(data=>{
                          this.murrayQueue = data.data,
                          this.newDate(this.murrayQueue),
                          this.lasercutter.getQueueAtLocation("Carmichael")
                          .subscribe(data=>{
                            this.cmikeQueue = data.data,
                            this.newDate(this.cmikeQueue),
                              this.startTimer(true)
                          })
                        });
                      });
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
  if(bool == true || this.stop == false){
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

ngOnDestroy(){
  this.stop = true;
  clearInterval(this.interval);
  this.sub.unsubscribe();
}



}
