import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TischKachelComponent } from './tisch-kachel.component';

describe('TischKachelComponent', () => {
  let component: TischKachelComponent;
  let fixture: ComponentFixture<TischKachelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TischKachelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TischKachelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
