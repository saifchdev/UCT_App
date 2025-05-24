import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Add this
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { timesheetComponent } from './Dashboard/timesheet/timesheet.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NavBarComponent } from './Dashboard/Layout/nav-bar/nav-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { materialDialogue } from './controls/material-dialogue/material-dialogue.component';
import { NewRecordModalComponent } from './controls/new-record-modal/new-record-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import{MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './Dashboard/main/main.component';
import { WelcomeScreenComponent } from './Dashboard/welcome-screen/welcome-screen.component';
import { NewrecordComponent } from './Dashboard/timesheet/newrecord/newrecord.component';
import { EmployeeComponent } from './Dashboard/employee/employee.component';
import { ProjectsComponent } from './Dashboard/projects/projects.component';
import { CodesComponent } from './Dashboard/codes/codes.component';
import { TaskCodesComponent } from './Dashboard/codes/task-codes/task-codes.component';
import { DisciplineCodesComponent } from './Dashboard/codes/discipline-codes/discipline-codes.component';
import { StageCodesComponent } from './Dashboard/codes/stage-codes/stage-codes.component';
import { TestdbComponent } from './testdb/testdb.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { NgChartsModule } from 'ng2-charts';


//To test
@NgModule({
  declarations: [AppComponent, timesheetComponent, NavBarComponent,materialDialogue, NewRecordModalComponent, LoginComponent, MainComponent, WelcomeScreenComponent, NewrecordComponent, EmployeeComponent, ProjectsComponent, CodesComponent, TaskCodesComponent, DisciplineCodesComponent, StageCodesComponent, TestdbComponent],
  imports: [
    BrowserModule,
    HttpClientModule, // Added here
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatTabsModule,
    MatChipsModule,
    MatGridListModule,
    MatMenuModule,
    NgChartsModule

   
  ],
  bootstrap: [AppComponent,timesheetComponent],
  providers: [
   
  ],
})
export class AppModule {}