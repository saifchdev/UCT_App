import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineCodesComponent } from './discipline-codes.component';

describe('DisciplineCodesComponent', () => {
  let component: DisciplineCodesComponent;
  let fixture: ComponentFixture<DisciplineCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplineCodesComponent]
    });
    fixture = TestBed.createComponent(DisciplineCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
