import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssaisComponent } from './essais.component';

describe('EssaisComponent', () => {
  let component: EssaisComponent;
  let fixture: ComponentFixture<EssaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EssaisComponent]
    });
    fixture = TestBed.createComponent(EssaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
