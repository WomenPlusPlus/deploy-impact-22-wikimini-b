import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageWelcomeComponent } from './homepage-welcome.component';

describe('HomepageWelcomeComponent', () => {
  let component: HomepageWelcomeComponent;
  let fixture: ComponentFixture<HomepageWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageWelcomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
