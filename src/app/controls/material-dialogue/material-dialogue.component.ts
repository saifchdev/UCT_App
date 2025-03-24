import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { DateService } from '../../services/date-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'material-dialog',
  templateUrl: './material-dialogue.component.html',
})
export class materialDialogue {
  projectCode: string;
  records: any[] = [];
  displayedColumns: string[] =
  ['ActivityCode','Date','Hours Worked','Body','btndelete']; // Define table columns
  isEditing: boolean = false;
  originalRecords: any[];


  ngOnInit(): void {
    
    this.fetchAllRecords();
  }

  constructor(
    private apiService: ApiService,
    private dataService: DateService,
    public dialogRef: MatDialogRef<materialDialogue>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
    
  
  ) {
 
    this.projectCode = data.ProjCode;
    // Deep copy for canceling edits
   this.originalRecords = JSON.parse(JSON.stringify(this.records));
  }

  fetchAllRecords(): void {
    console.log(this.projectCode);
    this.apiService.getAllRecords(this.projectCode,this.dataService.getSelectedDate()).subscribe(
      (res: any) => {
        this.records = res;
        //console.log(res);
        this.originalRecords = JSON.parse(JSON.stringify(this.records));
      },
      (error: any) => {
        console.error('Error fetching project records:', error);
      }
    );
  }

  deleteRecord(timesheetID: number): void {
    this.apiService.deleteUser(timesheetID).subscribe(response => {
      this.snackBar.open('Deleted Succesfully', 'Close', { duration: 3000 });
      this.fetchAllRecords();
    },
    (error: any) => {
      this.snackBar.open('Error in deletion', 'Close', { duration: 3000 });
    }
  );

  
  }
  closeDialog(): void {
    this.dialogRef.close();
  }


  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    // Call your API service to save the updated records
    // this.apiService.updateRecords(this.records).subscribe({
    //   next: () => {
    //     this.isEditing = false; // Exit edit mode on success
    //     this.originalRecords = JSON.parse(JSON.stringify(this.records)); // Update original data
    //     console.log('Changes saved successfully');
    //   },
    //   error: (err) => {
    //     console.error('Error saving changes:', err);
    //   }
    // });
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.records = JSON.parse(JSON.stringify(this.originalRecords)); // Revert to original data
  }
  
}
