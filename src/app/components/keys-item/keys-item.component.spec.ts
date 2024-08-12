import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KeysItemComponent } from './keys-item.component';

describe('KeysItemComponent', () => {
  let component: KeysItemComponent;
  let fixture: ComponentFixture<KeysItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KeysItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeysItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
