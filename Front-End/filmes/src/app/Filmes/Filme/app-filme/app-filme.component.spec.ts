import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFilmeComponent } from './app-filme.component';

describe('AppFilmeComponent', () => {
  let component: AppFilmeComponent;
  let fixture: ComponentFixture<AppFilmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFilmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
