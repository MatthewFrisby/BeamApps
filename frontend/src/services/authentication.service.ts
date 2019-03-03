import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '@models/response.model';
import { map } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { User } from '@models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private router: Router;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
//private _url: string = "http://localhost:3000/api/lasercutter"
private _url: string = "https://beam-lasercutter.herokuapp.com/api/lasercutter"

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }



    login(logusername: string, logpassword: string) {
        return this.http.post<any>(this._url, { logusername, logpassword }, { observe: 'response' });
    }

      callCheckAuth(): Observable<Response>{
      return this.http.get<Response>(this._url+"/admin/auth", {withCredentials: true });

      }
      public adm: String;

      public isAuthenticated(): any{
        this.callCheckAuth().subscribe(data=>{this.adm = data.data[0] });
        return;
      }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
