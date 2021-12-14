import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsStartComponent } from './transactions-start.component';

describe('TransactionsStartComponent', () => {
  let component: TransactionsStartComponent;
  let fixture: ComponentFixture<TransactionsStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
