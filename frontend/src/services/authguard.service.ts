import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { first } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';
import { timer } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }
  global: boolean;

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {


    this.auth.adm;

    return this.auth.callCheckAuth().pipe(map(data=>{
      this.auth.adm = data.data[0],

      this.auth.isAuthenticated();
      if (!this.auth.adm) {
        console.log(this.auth.adm);
        this.router.navigate(['login']);
        return false;
        
      } else if (this.auth.adm == "true") {
        console.log(this.auth.adm);
        return true;
      }
    }));
  }
}
