import { Component, Inject } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';
import { Queue } from '@models/queue.model';
import { Response } from '@models/response.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';



import { LaserCutterService } from '@services/lasercutter.service';

@Component({
  selector: 'carmichael-root',
  templateUrl: './carmichael.component.html',
  providers: [LaserCutterService],
})


export class Carmichael implements OnInit {

  constructor(
    private router: Router,
    private lasercutter: LaserCutterService,
    private formBuilder: FormBuilder

    //private home: Home,
    //private account: Account,
  ) { }
  lasercutterForm: FormGroup;
  responseAll: Response;
  responseCarmichael: Response;
  responseMurray: Response;
  view: Boolean = false;
  activeMurray: Queue[];
  activeCarmichael: Queue[];
  murrayQueue: Queue[]=[];
  carmichaelQueue: Queue[]=[];

  timeLeft: number = 10;
  interval;

  data: Queue[]=[];

  murrayViewW: Queue[];
  murrayViewO: Queue[];




  ngOnInit() {



    this.lasercutterForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });

    //this.lasercutter.getQueue().subscribe(data => { this.activeQueue = data.data });
    this.lasercutter.getQueueAtLocationAdmin("Carmichael").subscribe(data => { this.carmichaelQueue = data.data, this.newDate(this.carmichaelQueue) });
    this.lasercutter.getQueueAtLocationAdmin("Murray").subscribe(data => { this.murrayQueue = data.data,  this.newDate(this.murrayQueue), this.murrayViewO = this.murrayQueue.slice(0,2), this.murrayViewW = this.murrayQueue.slice(2,)});

    this.timeLeft = 10;
      clearInterval(this.interval)
    console.log(this.view);
    if(this.view == true){
      if(this.viewLocation=="Murray"){
         // this.murrayViewW = this.murrayQueue;
         // this.murrayViewO = this.murrayViewW.splice(0,2)
         console.log(this.murrayViewO)
         console.log(this.murrayViewW)
      }
      this.startTimer(this.view)
    }else{

      clearInterval(this.interval)
    }


  }


  startTimer(bool: Boolean) {

    if(bool == true){
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;

          //console.log(this.timeLeft);
        } else {
          clearInterval(this.interval);
          this.ngOnInit();

        }
      },1000)
    }
    }

   get f() { return this.lasercutterForm.controls; }


   re: String = "7";


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
    if(this.lasercutterForm.controls['location'].value == "Carmichael"){
      this.lasercutterForm.controls['location'].setValue("Carmichael");

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

    this.lasercutter.toggleLive(_id, Date.now().toString()).subscribe(response => { console.log(response), this.update = false,this.ngOnInit() })

    //this.lasercutter.removeUserFromQueueAdmin(_id).subscribe(response => { console.log(response), this.ngOnInit() })

    return true;
  }

  queueUpOrDown(queue: Queue){
    this.haveUntil(queue, Date.now());
    this.lasercutter.toggleOnCutter(queue._id, queue.timeLeft).subscribe(response=>{console.log(response),this.update = false, this.ngOnInit()});
  }



    update: Boolean = false;
    queueToUpdate: Queue;

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
    viewLocation: String;

    openSheet(queue: Queue) {
      console.log(queue);
    this.queueToUpdate = queue;
    this.update = true;
  }


  verify(_id: String){
    this.lasercutter.readyToCut(_id).subscribe(data=>{console.log(data), this.update = false, this.ngOnInit()})
  }

}
