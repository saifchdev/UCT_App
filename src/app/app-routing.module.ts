import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './Dashboard/main/main.component'; // your home page
import { AuthGuard } from './guards/auth.guard'; // see next step
import { timesheetComponent } from './Dashboard/timesheet/timesheet.component'; // your timesheet page
import { WelcomeScreenComponent } from './Dashboard/welcome-screen/welcome-screen.component';
import { NewrecordComponent } from './Dashboard/timesheet/newrecord/newrecord.component'; 
import { EmployeeComponent } from './Dashboard/employee/employee.component'; 
import{ProjectsComponent} from './Dashboard/projects/projects.component' // your welcome screen page
import { CodesComponent } from './Dashboard/codes/codes.component';
// your welcome screen page

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'welcome',
        component: WelcomeScreenComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: 'timesheet',
        component: timesheetComponent,
        children: [
          { path: 'newrecord',
            component: NewrecordComponent,
          }
        ],
        canActivate: [AuthGuard] 
      },
      {
        path: 'newrecord',
        component: NewrecordComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: 'project',
        component: ProjectsComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: 'codes',
        component: CodesComponent,
        canActivate: [AuthGuard] 
      },

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
