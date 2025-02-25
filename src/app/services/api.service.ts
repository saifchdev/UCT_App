import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}