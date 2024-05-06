import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnaliserComponent } from './personnaliser.component';

describe('PersonnaliserComponent', () => {
  let component: PersonnaliserComponent;
  let fixture: ComponentFixture<PersonnaliserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnaliserComponent]
    });
    fixture = TestBed.createComponent(PersonnaliserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
