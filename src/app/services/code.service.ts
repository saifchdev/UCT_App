import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Base interface for all code types
export interface CodeBase {
  id: number;
  code: string;
  description: string;
  isActive: boolean;
}

export interface TaskCode extends CodeBase {
  taskId: number;
  taskName: string;
  // Any task-specific fields
}

export interface DisciplineCode extends CodeBase {
  disciplineCodeId: number;
  disciplineName: string;
  // Any discipline-specific fields
}

export interface StageCode extends CodeBase {
  stageId: number;
  stageName: string;
  // Any stage-specific fields
}

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private apiUrl = 'https://localhost:7177/api'; // Example API


  constructor(private http: HttpClient) { }

  // Generic methods that can be used by all code types
  
  // Task codes
  getTaskCodes(): Observable<TaskCode[]> {
    return this.http.get<TaskCode[]>(`${this.apiUrl}/task-codes`);
  }

  createTaskCode(code: Partial<TaskCode>): Observable<TaskCode> {
    return this.http.post<TaskCode>(`${this.apiUrl}/task-codes`, code);
  }
  
  updateTaskCode(id: number, code: Partial<TaskCode>): Observable<TaskCode> {
    return this.http.put<TaskCode>(`${this.apiUrl}/task-codes/${id}`, code);
  }
  
  deleteTaskCode(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/task-codes/${id}`);
  }

  // Discipline codes
  getDisciplineCodes(): Observable<DisciplineCode[]> {
    return this.http.get<DisciplineCode[]>(`${this.apiUrl}/discipline-codes`);
  }
  
  // Similar CRUD methods for discipline codes...

  // Stage codes
  getStageCodes(): Observable<StageCode[]> {
    return this.http.get<StageCode[]>(`${this.apiUrl}/stage-codes`);
  }
  
  // Similar CRUD methods for stage codes...
}