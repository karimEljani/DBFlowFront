import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametreCompteComponent } from './parametre-compte.component';

describe('ParametreCompteComponent', () => {
  let component: ParametreCompteComponent;
  let fixture: ComponentFixture<ParametreCompteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametreCompteComponent]
    });
    fixture = TestBed.createComponent(ParametreCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
