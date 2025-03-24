import { Injectable, signal } from '@angular/core';

/**
 * Interface for the date state, optional for type safety.
 * Here, we assume the date is stored as a string (e.g., "2025-03-02"),
 * but it could be a Date object depending on your needs.
 */
export interface DateState {
  selectedDate: string | null;
}

/**
 * Service to manage the selected date state using Angular Signals.
 * This service is provided at the root level, making it a singleton
 * accessible throughout the application.
 */
@Injectable({
  providedIn: 'root'
})
export class DateService {
  // Signal to hold the selected date, initialized as null
  private selectedDateSignal = signal<DateState>({ selectedDate: null });

  // Public method to get the current selected date
  getSelectedDate(): string | null {
    return this.selectedDateSignal().selectedDate;
  }

  // Public method to set a new selected date
  setSelectedDate(date: string): void {
    this.selectedDateSignal.set({ selectedDate: date });
  }

  // Optional: Clear the selected date (e.g., reset to null)
  clearSelectedDate(): void {
    this.selectedDateSignal.set({ selectedDate: null });
  }

  // Optional: Expose the Signal directly for reactive use in templates or computed signals
  selectedDate = this.selectedDateSignal.asReadonly();
}