import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageCodesComponent } from './stage-codes.component';

describe('StageCodesComponent', () => {
  let component: StageCodesComponent;
  let fixture: ComponentFixture<StageCodesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StageCodesComponent]
    });
    fixture = TestBed.createComponent(StageCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
