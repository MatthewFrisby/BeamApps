import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '@models/user.model';

import {LaserCutterService } from '@services/lasercutter.service';
import {AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  providers: [LaserCutterService, AuthenticationService]
})


export class Login implements OnInit {
    loginForm: FormGroup;
    loading = false;
    done = false;
    submitted = false;
    check: String;
    user: User;
     returnUrl: string;
     error = '';
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private lasercutter: LaserCutterService,
        private authenticationService: AuthenticationService
    ) {

         this.authenticationService.callCheckAuth().subscribe(data=>{
           if(data.data[0] =="true"){
             this.router.navigate(['/admin']);
           } })


    }




    ngOnInit() {


      this.submitted = false;
      this.loading = false;
        this.loginForm = this.formBuilder.group({
            logusername: ['', Validators.required],
            logpassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;


        this.authenticationService.login(this.f.logusername.value, this.f.logpassword.value)
            .subscribe(
                data => {
                  this.authenticationService.isAuthenticated(), console.log(this.authenticationService.adm), this.router.navigate(["/admin"])
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });


      //  this.lasercutter.loginUser(this.loginForm.value).subscribe( data => {console.log("POST Request is successful ", data),this.done = true});


    }
}
