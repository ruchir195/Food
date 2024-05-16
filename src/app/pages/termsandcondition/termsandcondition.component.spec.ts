import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsandconditionComponent } from './termsandcondition.component';

describe('TermsandconditionComponent', () => {
  let component: TermsandconditionComponent;
  let fixture: ComponentFixture<TermsandconditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsandconditionComponent]
    });
    fixture = TestBed.createComponent(TermsandconditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
