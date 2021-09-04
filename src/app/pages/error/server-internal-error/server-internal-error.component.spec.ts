import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerInternalErrorComponent } from './server-internal-error.component';

describe('ServerInternalErrorComponent', () => {
  let component: ServerInternalErrorComponent;
  let fixture: ComponentFixture<ServerInternalErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerInternalErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerInternalErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
