import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template10Component } from './template10.component';

describe('Template10Component', () => {
  let component: Template10Component;
  let fixture: ComponentFixture<Template10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Template10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
