import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { TimesheetRecord } from '../../Models/timesheet-record';

// Placeholder interfaces for dropdown data (replace with your actual types)
interface Project { projectId: number; country: string; projectCode: string; }
interface DisciplineCode { disciplineCodeId: number; disciplineName: string; }
interface StageCode { stageId: string; stageName: string; }
interface TaskCode { taskId: number; taskName: string; }
@Component({
  selector: 'app-new-record-modal',
  templateUrl: './new-record-modal.component.html',
  styleUrls: ['./new-record-modal.component.css']
})
export class NewRecordModalComponent {
  timesheetForm: FormGroup;
  projects: Project[] = [];
  disciplineCodes: DisciplineCode[] = [];
  stageCodes: StageCode[] = [];
  taskCodes: TaskCode[] = [];
  selectedWeekStart: string; // Start date of the selected week (e.g., Sunday)

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
      status: ['']
    });
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

    const records: TimesheetRecord[] = [];
    days.forEach((day, index) => {
      const hours = formValue[day];
      if (hours > 0) { // Only create a record if hours are entered
        const dateWorked = this.getDateForDay(index);
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
