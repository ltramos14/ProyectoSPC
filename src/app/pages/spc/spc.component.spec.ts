import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpcComponent } from './spc.component';

describe('SpcComponent', () => {
  let component: SpcComponent;
  let fixture: ComponentFixture<SpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
