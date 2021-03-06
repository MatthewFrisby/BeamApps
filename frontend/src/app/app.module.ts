import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Login } from '@components/login/login.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';

import { Admin } from '@components/admin/admin.component';
import { Murray } from '@components/murrayview/murray.component';
import { Hanes } from '@components/hanesview/hanes.component';
import { Carmichael } from '@components/carmichaelview/carmichael.component';


import { Lasercutter } from '@components/lasercutter/lasercutter.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';






@NgModule({
  declarations: [
    AppComponent,
    Lasercutter,
    Login,
    Admin,
    Hanes,
    Murray,
    Carmichael
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  entryComponents:[

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
