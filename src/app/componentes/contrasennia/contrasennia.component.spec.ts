import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrasenniaComponent } from './contrasennia.component';

describe('ContrasenniaComponent', () => {
  let component: ContrasenniaComponent;
  let fixture: ComponentFixture<ContrasenniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContrasenniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrasenniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
