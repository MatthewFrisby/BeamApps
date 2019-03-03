import { Observable } from 'rxjs';
import { timer } from 'rxjs';


export class Queue {
  location: string;
  _id: string;
  create_date: string;
  name: string;
  on_cutter: boolean;
  timeLeft: string = 'null';
  remove_date: string;
  waiting: boolean;
  check_in_time: Number;
  start_cut_time:Number;
  finish_cut_time: Number;
  checks_complete: boolean;
    }
