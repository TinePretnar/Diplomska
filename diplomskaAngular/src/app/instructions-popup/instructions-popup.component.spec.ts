import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsPopupComponent } from './instructions-popup.component';

describe('InstructionsPopupComponent', () => {
  let component: InstructionsPopupComponent;
  let fixture: ComponentFixture<InstructionsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructionsPopupComponent]
    });
    fixture = TestBed.createComponent(InstructionsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
