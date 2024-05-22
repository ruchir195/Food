import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickBookComponent } from './quick-book.component';

describe('QuickBookComponent', () => {
  let component: QuickBookComponent;
  let fixture: ComponentFixture<QuickBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickBookComponent]
    });
    fixture = TestBed.createComponent(QuickBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
