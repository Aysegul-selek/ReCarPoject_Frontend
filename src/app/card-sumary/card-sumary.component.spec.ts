import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSumaryComponent } from './card-sumary.component';

describe('CardSumaryComponent', () => {
  let component: CardSumaryComponent;
  let fixture: ComponentFixture<CardSumaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSumaryComponent]
    });
    fixture = TestBed.createComponent(CardSumaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
