import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGraphicComponent } from './item-graphic.component';

describe('ItemGraphicComponent', () => {
  let component: ItemGraphicComponent;
  let fixture: ComponentFixture<ItemGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
