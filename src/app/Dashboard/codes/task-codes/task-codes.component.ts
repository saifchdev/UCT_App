import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CodeService, TaskCode } from '../../../services/code.service';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-task-codes',
  templateUrl: './task-codes.component.html',
  styleUrls: ['./task-codes.component.css']
})
export class TaskCodesComponent implements OnInit {
  displayedColumns: string[] = ['taskId', 'taskName', 'code', 'description', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<TaskCode>([]);
  
  

  constructor(
    private codeService: CodeService,
    private dialog: MatDialog,
    private ApiService:ApiService
  ) { }

  ngOnInit(): void {
    this.loadTaskCodes();
  }

  loadTaskCodes(): void {
    this.ApiService.getTaskCodes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error fetching employees data:', err);
      }
    });
    
    // For now, using sample data
 //this.taskCodes=this.dataSource.data;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editTaskCode(code: TaskCode): void {
    // Open edit dialog
    console.log('Edit task code:', code);
  }

  deleteTaskCode(code: TaskCode): void {
    if (confirm(`Are you sure you want to delete ${code.taskName}?`)) {
      // In real app: this.codeService.deleteTaskCode(code.id).subscribe(...)
      this.dataSource.data = this.dataSource.data.filter(t => t.id !== code.id);
    }
  }

  addNewTaskCode(): void {
    // Open add dialog
    console.log('Add new task code');
  }
}