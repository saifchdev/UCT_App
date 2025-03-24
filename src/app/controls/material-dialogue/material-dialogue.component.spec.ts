import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDialogueComponent } from './material-dialogue.component';

describe('MaterialDialogueComponent', () => {
  let component: MaterialDialogueComponent;
  let fixture: ComponentFixture<MaterialDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialDialogueComponent]
    });
    fixture = TestBed.createComponent(MaterialDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
