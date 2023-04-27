import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetPortfolioComponent } from './target-portfolio.component';

describe('TargetPortfolioComponent', () => {
  let component: TargetPortfolioComponent;
  let fixture: ComponentFixture<TargetPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetPortfolioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
