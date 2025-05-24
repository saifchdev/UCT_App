import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ChartData, ChartOptions } from 'chart.js';
 
@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})

export class WelcomeScreenComponent {
 private breakpointObserver = inject(BreakpointObserver);
 
 public chartNames :string[]= ['Timeline', 'Employee', 'Project'];
 public chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false
};
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Timesheet', cols: 1, rows: 1 },
          { title: 'Projects', cols: 1, rows: 1 },
          { title: 'Employees', cols: 1, rows: 1 },

        ];
      }

      return [
        { title: 'Timesheet', cols: 2, rows: 1 },
        { title: 'Projects', cols: 1, rows: 1 },
        { title: 'Employees', cols: 1, rows: 1 },
      ]
    })
  );
  public barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',  'November'],
    datasets: [
      {
        data: [65, 59, 80,75,89,47,22,76,110, 45,240],  
        label: 'Project Hours',
        backgroundColor: '#857449'
      }
    ]
  };
 
  
  public barChartData2: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',  'November'],
    datasets: [
      {
        data: [11, 14, 23,87,11,24,65,76,110, 45,240],  
        label: 'Project Hours',
        backgroundColor: '#857449'
      }
    ]
  };
  
  
}
