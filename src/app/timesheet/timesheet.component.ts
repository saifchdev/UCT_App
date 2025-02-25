import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css'],
  
})

export class timesheetComponent implements OnInit {
  displayedColumns: string[] =
 ['EmployeeId','Country','ProjectCode','ActivityCode', 'Days', 'body','action']; // Define table columns
  dataSource =new MatTableDataSource<any>();
  projectdataSource: any;


  
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchProjects();
    this.fetchData();
    this.fillData();
  }

  fetchData(): void {
    this.apiService.getData("/Timesheet").subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data; // Assign API response to dataSource
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }
  fetchProjects(): void {
    this.apiService.getData("/Project").subscribe({
      next: (projectdata) => {
        console.log(projectdata);
        this.projectdataSource = projectdata; // Assign API response to dataSource
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
    });
  }
  getCountry(projectId: number | undefined): string {
    if (!projectId) return 'N/A';
    const project = this.projectdataSource.find((p: { projectId: number; }) => p.projectId === projectId);
    return project ? project.country : 'N/A';
  }
  getProjectCode(projectId: number | undefined): string {
    if (!projectId) return 'N/A';
    const project = this.projectdataSource.find((p: { projectId: number; }) => p.projectId === projectId);
    return project ? project.projectCode : 'N/A';
  }
  fillData() {
// if (!projectId) return '';
//     const project = this.projectdataSource.find((p: { projectId: number; }) => p.projectId === projectId);
//     return project ? selectedProjectId : 'N/A';
}
}
