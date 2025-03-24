import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimesheetRecord } from '../Models/timesheet-record';

@Injectable({
  providedIn: 'root', // Available app-wide
})
export class ApiService {
  // Replace with your API URL
  private apiUrl = 'https://localhost:7177/api'; // Example API

  constructor(private http: HttpClient) {}

  // Fetch data from API
  getData( ControllerName :string): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl+ControllerName);
    
    
  }

  getDataByWeek( startDate :string): Observable<any[]> {
    //const formattedDate :string=this.formatDateToDateTime(startDate)
   // console.log(this.apiUrl+'/Timesheet/'+formattedDate);
    return this.http.get<any[]>(this.apiUrl+'/Timesheet/'+startDate);
  }


 

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Project`);
  }

  getDisciplineCodes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/DisciplineCodes`);
  }

  getStageCodes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Stages`);
  }

  getTaskCodes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/TaskCodes`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Timesheet/${id}`);
  }

  saveTimesheetRecord(record: TimesheetRecord): Observable<any> {
    console.log(record);
    return this.http.post(`${this.apiUrl}/Timesheet/save-record`, record);
  }
  getAllRecords( projectCode: string,startDate :string|null): Observable<any[]> {
   console.log(this.apiUrl+'/Timesheet/GetData?weekStart='+startDate+'&projCode='+projectCode);
    return this.http.get<any[]>(`${this.apiUrl}/Timesheet/GetData?weekStart=${startDate}&projCode=${projectCode}`);
  }
  formatDateToDateTime(date: Date): string {
    // Option 1: ISO format with time
   // return date.toISOString(); // "2025-03-02T00:00:00.000Z"
  
    // Option 2: Custom format (e.g., "YYYY-MM-DD HH:mm:ss")
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}`; // "2025-03-02 00:00:00"
  }
  
}