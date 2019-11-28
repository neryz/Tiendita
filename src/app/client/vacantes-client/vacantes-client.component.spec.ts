import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantesClientComponent } from './vacantes-client.component';

describe('VacantesClientComponent', () => {
  let component: VacantesClientComponent;
  let fixture: ComponentFixture<VacantesClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacantesClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
