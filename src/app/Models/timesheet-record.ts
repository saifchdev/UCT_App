// src/app/models/timesheet-record.ts
export interface TimesheetRecord {
  ProjectID: number;
    country?: string;        // Auto-populated from project
    projectCode?: string;    // Auto-populated from project
    disciplineCodeId: string;
    stageId: string;
    taskId: string;
    hoursWorked: number;     // Hours worked on the specific day
    dateWorked: string;      // Date in YYYY-MM-DD format (e.g., "2025-03-09")
    remarks: string;
  }