import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoPageComponent } from './add-video-page.component';

describe('AddVideoPageComponent', () => {
  let component: AddVideoPageComponent;
  let fixture: ComponentFixture<AddVideoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVideoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVideoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
