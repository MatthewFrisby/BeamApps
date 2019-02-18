import { Observable } from 'rxjs';
import { timer } from 'rxjs';


export class Queue {
  location: string;
  _id: string;
  create_date: string;
  name: string;
  in_queue: boolean;
  timeLeft: string = 'null';
    }
