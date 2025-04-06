import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CodeService, StageCode } from '../../../services/code.service';
import { ApiService } from '../../../services/api.service';



@Component({
  selector: 'app-stage-codes',
  templateUrl: './stage-codes.component.html',
  styleUrls: ['./stage-codes.component.css']
})
export class StageCodesComponent implements OnInit {
  displayedColumns: string[] = ['stageId', 'stageName',  'isActive', 'actions'];
  dataSource = new MatTableDataSource<StageCode>([]);
  
  

  constructor(
    private codeService: CodeService,
    private dialog: MatDialog,
    private ApiService:ApiService
  ) { }

  ngOnInit(): void {
    this.loadstageCodes();
  }

  loadstageCodes(): void {
    this.ApiService.getStageCode().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error fetching employees data:', err);
      }
    });
    
    // For now, using sample data
 //this.stageCodes=this.dataSource.data;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editstageCode(code: StageCode): void {
    // Open edit dialog
    console.log('Edit stage code:', code);
  }

  deletestageCode(code: StageCode): void {
    if (confirm(`Are you sure you want to delete ${code.stageName}?`)) {
      // In real app: this.codeService.deletestageCode(code.id).subscribe(...)
      this.dataSource.data = this.dataSource.data.filter(t => t.id !== code.id);
    }
  }

  addNewstageCode(): void {
    // Open add dialog
    console.log('Add new stage code');
  }
}