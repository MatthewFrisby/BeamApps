import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { Login } from '@components/login/login.component';
import { Lasercutter } from '@components/lasercutter/lasercutter.component';
import { Admin } from '@components/admin/admin.component';
import { Murray } from '@components/murrayview/murray.component';
import { Hanes } from '@components/hanesview/hanes.component';
import { Carmichael } from '@components/carmichaelview/carmichael.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from '@services/authguard.service';






const routes: Routes = [
  {path: '', redirectTo:'lasercutter', pathMatch: 'full'},
  {path: 'lasercutter', component: Lasercutter},
  {path: 'login', component: Login},
  {path: 'admin', component: Admin, canActivate: [AuthGuardService] },
  {path: 'admin/hanes', component: Hanes, canActivate: [AuthGuardService] },
  {path: 'admin/murray', component: Murray, canActivate: [AuthGuardService] },
  {path: 'admin/carmichael', component: Carmichael, canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
