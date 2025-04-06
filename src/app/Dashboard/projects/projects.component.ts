import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';



interface Project {
  ProjectId: number;
  projectCode: string;
  projectName: string;
  country: string;
  status: 'Active' | 'Inactive';
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
 displayedColumns: string[] = ['Project Name', 'Project Code','Country','status', 'actions'];
  dataSource = new MatTableDataSource<Project>([]);
  
  constructor(public ApiService:ApiService) { }

  ngOnInit(): void {
    // Initialize the table data
   this.fetchProjectData();
  }

  
  fetchProjectData(): void {
    console.log("Project data fetched");
   // const formattedDate = this.formatDate(weekStart);
      this.ApiService.getProjects().subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.error('Error fetching Projects data:', err);
        }
      });
    }
  

  // Filter functionality
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Project CRUD operations
  editProject(Project: Project): void {
    console.log('Edit Project:', Project);
    // Implement edit logic or open edit dialog
  }

  deleteProject(Project: Project): void {
    console.log('Delete Project:', Project);
    // Implement delete logic with confirmation
    if (confirm(`Are you sure you want to delete ${Project.projectName} ?`)) {
      this.ApiService.deleteProject(Project.ProjectId).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(emp => emp.ProjectId !== Project.ProjectId);
          console.log('Project deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting Project:', err);
        }
      });
    }
  }

  addNewProject(): void {
    console.log('Add new Project');
    // Implement add logic or open add dialog
  }

}
