import { Component, OnInit ,Injectable} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, forkJoin } from 'rxjs';
import { TimesheetRecord } from '../../Models/timesheet-record';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDateRangePicker } from '@angular/material/datepicker';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import { ViewChild } from '@angular/core';


// Placeholder interfaces for dropdown data (replace with your actual types)
interface Project { projectId: number; country: string; projectCode: string; }
interface DisciplineCode { disciplineCodeId: number; disciplineName: string; }
interface StageCode { stageId: string; stageName: string; }
interface TaskCode { taskId: number; taskName: string; }


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
  selector: 'app-new-record-modal',
  templateUrl: './new-record-modal.component.html',
  styleUrls: ['./new-record-modal.component.css'],
    providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
})

export class NewRecordModalComponent {
  timesheetForm: FormGroup;
  projects: Project[] = [];
  disciplineCodes: DisciplineCode[] = [];
  stageCodes: StageCode[] = [];
  taskCodes: TaskCode[] = [];
  selectedWeekStart: string; // Start date of the selected week (e.g., Sunday)
  weekDates: string[] = []; // Array to hold formatted dates (e.g., "03/09")
  weekDateObjects: Date[] = []; // Full Date objects for saving
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.selectedWeekStart = this.getCurrentWeekStart(); // Default to current week
    this.timesheetForm = this.fb.group({
      projectId: ['', Validators.required],
      country: [{ value: '', disabled: true }],
      projectCode: [{ value: '', disabled: true }],
      disciplineCodeId: ['', Validators.required],
      stageId: ['', Validators.required],
      taskId: ['', Validators.required],
      sun: [0, [Validators.min(0), Validators.max(24)]],
      mon: [0, [Validators.min(0), Validators.max(24)]],
      tue: [0, [Validators.min(0), Validators.max(24)]],
      wed: [0, [Validators.min(0), Validators.max(24)]],
      thu: [0, [Validators.min(0), Validators.max(24)]],
      fri: [0, [Validators.min(0), Validators.max(24)]],
      sat: [0, [Validators.min(0), Validators.max(24)]],
      remarks: [''],
      status: [''],
    });
    this.setWeekDates(new Date()); // Initialize with current week
  }

  ngOnInit(): void {
    this.loadDropdownData();
    this.setupProjectChangeListener();
  }

  // Load data for dropdowns
  loadDropdownData(): void {
    this.apiService.getProjects().subscribe(projects => this.projects = projects);
    this.apiService.getDisciplineCodes().subscribe(codes => this.disciplineCodes = codes);
    this.apiService.getStageCodes().subscribe(codes => this.stageCodes = codes);
    this.apiService.getTaskCodes().subscribe(codes => this.taskCodes = codes);
  }

  // Auto-populate country and projectCode when projectId changes
  setupProjectChangeListener(): void {
    this.timesheetForm.get('projectId')?.valueChanges.subscribe(projectId => {
      const selectedProject = this.projects.find(p => p.projectId === projectId);
      if (selectedProject) {
        this.timesheetForm.patchValue({
          country: selectedProject.country,
          projectCode: selectedProject.projectCode
        });
      } else {
        this.timesheetForm.patchValue({ country: '', projectCode: '' });
      }
    });
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
  onWeekSelected(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    if (selectedDate) {
      const startOfWeek = this.getStartOfWeek(selectedDate);
      this.setWeekDates(startOfWeek);
    }
  }

  // Calculate the start of the week (Sunday)
  private getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  }

  // Set dates for the week (Sun to Sat)
  private setWeekDates(startOfWeek: Date): void {
    this.weekDates = [];
    this.weekDateObjects = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      this.weekDateObjects.push(new Date(date)); // Store full Date object
      this.weekDates.push(this.formatDate(date)); // Store formatted label
    }
  }

  // Format date as MM/DD
  private formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: '2-digit',
      day: '2-digit'
    };
    return date.toLocaleDateString('en-US', options).replace(/,/, ''); // e.g., "Sun 03/23"
  }
  // Handle form submission
  onSubmit(): void {
    if (this.timesheetForm.valid) {
      const formValue = this.timesheetForm.getRawValue();
      const records = this.createRecordsFromForm(formValue);

      if (records.length === 0) {
        this.snackBar.open('No hours entered for any day', 'Close', { duration: 3000 });
        return;
      }

      //Save all records concurrently
      const saveRequests = records.map(record => this.apiService.saveTimesheetRecord(record));
      forkJoin(saveRequests).subscribe({
        next: () => {
          this.snackBar.open(`${records.length} timesheet record(s) saved successfully!`, 'Close', { duration: 3000 });
          this.timesheetForm.reset({ sun: 0, mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0 });
        },
        error: (err) => {
          this.snackBar.open('Error saving timesheet records', 'Close', { duration: 3000 });
          console.error('Error:', err);
        }
      });
    } else {
      this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 3000 });
    }
  }

  // Create records for each day with hours
  private createRecordsFromForm(formValue: any): TimesheetRecord[] {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const baseRecord = {
      employeeId: 3, // Replace with actual employee ID
      ProjectID: formValue.projectId,
      country: formValue.country,
      projectCode: formValue.projectCode,
      disciplineCodeId: formValue.disciplineCodeId,
      stageId: formValue.stageId,
      taskId: formValue.taskId,
      remarks: formValue.remarks,
      status: 'DummyStatuss',

    };
    const records: any[] = [];
    days.forEach((day, index) => {
      const hours = formValue[day];
      if (hours > 0) {
        const date = this.weekDateObjects[index]; // Use the full Date object
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const dayOfMonth = date.getDate().toString().padStart(2, '0');
        const dateWorked = `${year}-${month}-${dayOfMonth}`; // e.g., "2025-03-23"
        records.push({
          ...baseRecord,
          hoursWorked: hours,
          dateWorked: dateWorked
        });
      }
    });
    return records;
  }

  // Calculate the date for a given day of the week
  private getDateForDay(dayIndex: number): string {
    const weekStart = new Date(this.selectedWeekStart);
    const recordDate = new Date(weekStart);
    recordDate.setDate(weekStart.getDate() + dayIndex); // Add days from Sunday
    return recordDate.toISOString().split('T')[0]; // Return YYYY-MM-DD
  }

  // Get the current week's Sunday as default
  private getCurrentWeekStart(): string {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek); // Set to Sunday
    return startOfWeek.toISOString().split('T')[0];
  }
}
