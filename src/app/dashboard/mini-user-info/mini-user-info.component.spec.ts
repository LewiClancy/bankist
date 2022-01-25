import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniUserInfoComponent } from './mini-user-info.component';

describe('MiniUserInfoComponent', () => {
  let component: MiniUserInfoComponent;
  let fixture: ComponentFixture<MiniUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
