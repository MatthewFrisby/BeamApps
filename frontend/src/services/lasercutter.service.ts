import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@models/user.model';
import { Queue } from '@models/queue.model';
import { Response } from '@models/response.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



@Injectable()
export class LaserCutterService  {

private _url: string = "https://beam-lasercutter.herokuapp.com/api/lasercutter"
//private _url: string = "http://localhost:3000/api/lasercutter"

  constructor(private http: HttpClient) { }

  getQueue(): Observable<Response>{
    const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
    return this.http.get<Response>(this._url);
  }

  getQueueAtLocation(location: string): Observable<Response>{
    const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
    return this.http.get<Response>(this._url+'/'+location);
  }

  loginUser(user: User): Observable<User>{
  const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
   return this.http.post<User>(this._url, user)
 }

 getQueueAtLocationAdmin(location: string): Observable<Response>{
   const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
   return this.http.get<Response>(this._url+'/admin'+'/'+location);
 }

 logout(){
   const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});

   return this.http.get(this._url+'/admin/logout', { headers, withCredentials: true });
 }

 addUserToQueueAdmin(queue: Queue): Observable<Queue>{
   const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
   return this.http.post<Queue>(this._url+'/admin', queue);
 }

 removeUserFromQueueAdmin(_id: string): Observable<Response>{
   const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/json'});
    return this.http.delete<Response>(this._url+'/admin'+'/'+_id);
 }

 toggleOnCutter(_id: string, time: string): Observable<Response>{
   return this.http.put<Response>(this._url+'/admin/'+_id, {timeLeft: time});
 }

 toggleLive(_id: string, time: string): Observable<Response>{
   return this.http.put<Response>(this._url+'/admin/remove/'+_id, {remove_date: time});
 }

 getData(): Observable<Response>{
   const headers = new HttpHeaders({'Content-Type': 'Content-Type: application/xls'});
   return this.http.get<Response>(this._url+"/admin");
 }






}
