import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirflightAddEditComponent } from './cliente-add-edit.component';

describe('ClienteAddEditComponent', () => {
  let component: AirflightAddEditComponent;
  let fixture: ComponentFixture<AirflightAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirflightAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirflightAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
