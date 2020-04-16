import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarathonsPageComponent } from './marathons-page.component';

describe('MarathonsPageComponent', () => {
  let component: MarathonsPageComponent;
  let fixture: ComponentFixture<MarathonsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarathonsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarathonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
