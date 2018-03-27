import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostInformationComponent } from './host-information.component';

describe('HostInformationComponent', () => {
  let component: HostInformationComponent;
  let fixture: ComponentFixture<HostInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
