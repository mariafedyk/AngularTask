import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserInfoComponent } from './show-user-info.component';

describe('ShowUserInfoComponent', () => {
  let component: ShowUserInfoComponent;
  let fixture: ComponentFixture<ShowUserInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUserInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
