import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyriathonPageComponent } from './myriathon-page.component';

describe('MyriathonPageComponent', () => {
  let component: MyriathonPageComponent;
  let fixture: ComponentFixture<MyriathonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyriathonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyriathonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
