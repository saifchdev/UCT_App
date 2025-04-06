import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCodesComponent } from './task-codes.component';

describe('TaskCodesComponent', () => {
  let component: TaskCodesComponent;
  let fixture: ComponentFixture<TaskCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCodesComponent]
    });
    fixture = TestBed.createComponent(TaskCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
