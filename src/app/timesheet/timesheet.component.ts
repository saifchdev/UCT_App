import { Component, OnInit,effect,inject   } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DateService } from '../services/date-service.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { materialDialogue } from '../controls/material-dialogue/material-dialogue.component';
import { NewRecordModalComponent } from '../controls/new-record-modal/new-record-modal.component';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  
})

export class timesheetComponent implements OnInit {
  displayedColumns: string[] =
 ['ProjectName','Country','ProjectCode','HoursWorked','action']; // Define table columns
  dataSource =new MatTableDataSource<any>();
  projectdataSource: any;
  currWeek: Date = new Date();
  isAvailable: boolean = false;


  
  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    public dateService: DateService
  ) {
    effect(() => {
      const date = this.dateService.selectedDate().selectedDate;
      if (date) {
        this.fetchTimesheetData(date);
      }
    });
  }

  ngOnInit(): void {
  //  this.fetchProjects();
 // this.monitorDateChanges();
    // Subscribe to date changes or fetch initially
    const initialDate = this.dateService.getSelectedDate();
    if (initialDate) {
      this.fetchTimesheetData(initialDate);
    }
  }


  fetchTimesheetData(weekStart: string): void {
  console.log("Time sheet data fetched");
    this.apiService.getDataByWeek(weekStart).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.isAvailable = true;
      },
      error: (err) => {
        console.error('Error fetching timesheet data:', err);
        this.isAvailable = false;
      }
    });
  }


  openDetailsDialog(ProjectCode: any): void {
    this.dialog.open(materialDialogue, {
      width: '1400px',
      data: {
       ProjCode:ProjectCode,
       weekStart:this.currWeek,
      }
    });
  }

  openNewRecordDialog(): void {
    this.dialog.open(NewRecordModalComponent, {
      width: '1400px',
      data: {
       weekStart:this.currWeek,
      }
    });
  }


  


}
