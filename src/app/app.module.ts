import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Add this
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { timesheetComponent } from './timesheet/timesheet.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { WeekSelectorComponent } from './timesheet/controls/week-selector/week-selector.component';
import { materialDialogue } from './controls/material-dialogue/material-dialogue.component';
import { NewRecordModalComponent } from './controls/new-record-modal/new-record-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import{MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [AppComponent, timesheetComponent, NavBarComponent, WeekSelectorComponent,materialDialogue, NewRecordModalComponent],
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
    MatInputModule
   
  ],
  bootstrap: [AppComponent,timesheetComponent],
})
export class AppModule {}