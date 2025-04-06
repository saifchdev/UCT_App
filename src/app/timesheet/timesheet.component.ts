import { Component, OnInit,effect,inject  ,Injectable } from '@angular/core';
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
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDateRangePicker } from '@angular/material/datepicker';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class FiveDayRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
//above is andObject that can be provided in order to customize the date range selection behavior.
{
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }
 
  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }
/* Below is the main code */
  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const dayOfWeek = this._dateAdapter.getDayOfWeek(date); // 0 (Sunday) to 6 (Saturday)
      const start = this._dateAdapter.addCalendarDays(date, -dayOfWeek);
      const end = this._dateAdapter.addCalendarDays(date, 6-dayOfWeek);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
   providers: [
      {
        provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
        useClass: FiveDayRangeSelectionStrategy,
      },
    ],
})


export class timesheetComponent implements OnInit {
  displayedColumns: string[] =
 ['ProjectName','Country','ProjectCode','HoursWorked','action']; // Define table columns
  dataSource =new MatTableDataSource<any>();
  projectdataSource: any;
  currWeek: string = '';
  isAvailable: boolean = false;
  timesheetForm: FormGroup;


  
  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    public dateService: DateService,
    private fb: FormBuilder,
  ) {
    effect(() => {
      const date = this.dateService.selectedDate().selectedDate;
      if (date) {
        this.fetchTimesheetData(date);
      }
    });

    this.timesheetForm = this.fb.group({
      taskId: [''],
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
  dateClass = (date: Date): string => {
    const range = this.timesheetForm.get('weekRange')?.value;
    if (range && range.start && range.end) {
      const sunday = this.getStartOfWeek(range.start);
      const saturday = new Date(sunday);
      saturday.setDate(sunday.getDate() + 6);
      if (date >= sunday && date <= saturday) {
        return 'mat-calendar-body-selected';
      }
    }
    return '';
  };

  private getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }

    private formatDate(date: Date): string {
      return date.toISOString().split('T')[0]; // e.g., "2025-03-02"
    }


    getDatabyWeek(weekStart: Date): void {
     
      const formattedDate = this.formatDate(weekStart);
      this.fetchTimesheetData(formattedDate);
      this.currWeek=formattedDate;
    }

    
  fetchTimesheetData(weekStart: string): void {
  console.log("Time sheet data fetched");
 // const formattedDate = this.formatDate(weekStart);
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
