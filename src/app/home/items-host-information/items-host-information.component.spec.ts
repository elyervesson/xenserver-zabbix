import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsHostInformationComponent } from './items-host-information.component';

describe('ItemsHostInformationComponent', () => {
  let component: ItemsHostInformationComponent;
  let fixture: ComponentFixture<ItemsHostInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsHostInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsHostInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
