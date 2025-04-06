import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


interface Employee {
  employeeId: number;
  employeeCode: string;
  name: string;
  lastName: string;
  department: string;
  position: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['Employee Code', 'Name',  'Department', 'Position', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]);
  
  constructor(public ApiService:ApiService) { }

  ngOnInit(): void {
    // Initialize the table data
   this.fetchEmployeeData();
  }

  
  fetchEmployeeData(): void {
    console.log("Employee data fetched");
   // const formattedDate = this.formatDate(weekStart);
      this.ApiService.getEmployees().subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error fetching employees data:', err);
        }
      });
    }
  

  // Filter functionality
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Employee CRUD operations
  editEmployee(employee: Employee): void {
    console.log('Edit employee:', employee);
    // Implement edit logic or open edit dialog
  }

  deleteEmployee(employee: Employee): void {
    console.log('Delete employee:', employee);
    // Implement delete logic with confirmation
    if (confirm(`Are you sure you want to delete ${employee.employeeCode} ?`)) {
      this.ApiService.deleteEmployee(employee.employeeId).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(emp => emp.employeeId !== employee.employeeId);
          console.log('Employee deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
        }
      });
    }
  }

  addNewEmployee(): void {
    console.log('Add new employee');
    // Implement add logic or open add dialog
  }

}