import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CodeService, DisciplineCode } from '../../../services/code.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-discipline-codes',
  templateUrl: './discipline-codes.component.html',
  styleUrls: ['./discipline-codes.component.css']
})
export class DisciplineCodesComponent implements OnInit {
  displayedColumns: string[] = ['disciplineId', 'disciplineName', 'code', 'description', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<DisciplineCode>([]);
  
  

  constructor(
    private codeService: CodeService,
    private dialog: MatDialog,
    private ApiService:ApiService
  ) { }

  ngOnInit(): void {
    this.loaddisciplineCodes();
  }

  loaddisciplineCodes(): void {
    this.ApiService.getdisciplineCodes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error fetching employees data:', err);
      }
    });
    
    // For now, using sample data
 //this.disciplineCodes=this.dataSource.data;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editdisciplineCode(code: DisciplineCode): void {
    // Open edit dialog
    console.log('Edit discipline code:', code);
  }

  deletedisciplineCode(code: DisciplineCode): void {
    if (confirm(`Are you sure you want to delete ${code.disciplineName}?`)) {
      // In real app: this.codeService.deletedisciplineCode(code.id).subscribe(...)
      this.dataSource.data = this.dataSource.data.filter(t => t.id !== code.id);
    }
  }

  addNewdisciplineCode(): void {
    // Open add dialog
    console.log('Add new discipline code');
  }
}