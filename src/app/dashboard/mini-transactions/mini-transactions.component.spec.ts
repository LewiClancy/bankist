import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTransactionsComponent } from './mini-transactions.component';

describe('MiniTransactionsComponent', () => {
  let component: MiniTransactionsComponent;
  let fixture: ComponentFixture<MiniTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
