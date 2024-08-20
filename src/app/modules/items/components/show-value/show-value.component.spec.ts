import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowValueComponent } from './show-value.component';
describe('ShowValueComponent', () => {
  let component: ShowValueComponent;
  let fixture: ComponentFixture<ShowValueComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ ShowValueComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
