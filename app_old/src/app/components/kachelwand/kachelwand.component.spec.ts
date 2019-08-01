import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KachelwandComponent } from './kachelwand.component';

describe('KachelwandComponent', () => {
  let component: KachelwandComponent;
  let fixture: ComponentFixture<KachelwandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KachelwandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KachelwandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
