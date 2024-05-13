import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTPValidationComponent } from './otp-validation.component';

describe('OTPValidationComponent', () => {
  let component: OTPValidationComponent;
  let fixture: ComponentFixture<OTPValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OTPValidationComponent]
    });
    fixture = TestBed.createComponent(OTPValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
