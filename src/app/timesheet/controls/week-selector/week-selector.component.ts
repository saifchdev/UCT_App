import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { DateService } from '../../../services/date-service.service';

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.css']
})


  export class WeekSelectorComponent implements OnInit {
    

  constructor(private apiService: ApiService,  private dateService: DateService) {}
    dataSource: any[] = []; // Your table data
    weekStarts: Date[] = []; // Array to hold week-start dates
    selectedWeekStart: Date | null = null; // Selected week-start date
  
    ngOnInit(): void {
      this.calculateWeekStarts();
      if (this.weekStarts.length > 0) {
        this.dateService.setSelectedDate(this.formatDate(this.weekStarts[0]));
      }
    }
    private formatDate(date: Date): string {
      return date.toISOString().split('T')[0]; // e.g., "2025-03-02"
    }
    calculateWeekStarts(): void {
      const today = new Date(); // Current date: Feb 23, 2025
      const year = today.getFullYear();
      const month = today.getMonth(); // 1 for February
      const firstDay = new Date(year, month, 1); // Feb 1, 2025
      const lastDay = new Date(year, month + 1, 0); // Feb 28, 2025
  
      // Find the first Sunday on or before the 1st
      const dayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
      let firstSunday = new Date(firstDay);
      if (dayOfWeek !== 0) { // If not Sunday
        firstSunday.setDate(firstDay.getDate() - dayOfWeek); // Go back to previous Sunday
      }
  
      // Collect all Sundays in the month
      const weekStarts: Date[] = [];
      let currentSunday = new Date(firstSunday);
      while (currentSunday <= lastDay) {
        if (currentSunday >= firstDay || currentSunday.getMonth() === month) {
          weekStarts.push(new Date(currentSunday));
        }
        currentSunday.setDate(currentSunday.getDate() + 7); // Next Sunday
      }
  
      this.weekStarts = weekStarts;
      this.selectedWeekStart = weekStarts[0]; // Default to first week
    }
    onWeekChange(weekStart: Date): void {
      const formattedDate = this.formatDate(weekStart);
      this.dateService.setSelectedDate(formattedDate); // Update the Signal
    }
  
    // Optional: Handle selection change
  //   onWeekChange(weekStart: string): void {
  //     const formattedDate = this.formatDate(weekStart);
  //     this.dateService.setSelectedDate(formattedDate); // Update the Sig
      
  //     // Add logic here to filter/update table data based on selected week
  //     this.apiService.getDataByWeek(weekStart).subscribe(summarisedData => {
  //       //this.dataSource = summarisedData;
  //       this.dataEvent.emit( summarisedData );

  //     //console.log('Selected week start:', summarisedData);
  //   });
  // }


  }