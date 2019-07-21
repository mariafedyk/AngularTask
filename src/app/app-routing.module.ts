    
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DatabaseComponent} from './database/database.component';
// import {AuthGuardService} from './general_files/services/auth-guard.service';
import {RegistrationComponent} from './registration/registration.component';
import { ShowUserInfoComponent } from './show-user-info/show-user-info.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'database', component: DatabaseComponent},
  {path: 'show-user-info', component: ShowUserInfoComponent},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}