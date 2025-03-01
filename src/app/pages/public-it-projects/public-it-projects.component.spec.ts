import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicItProjectsComponent } from './public-it-projects.component';

describe('PublicItProjectsComponent', () => {
  let component: PublicItProjectsComponent;
  let fixture: ComponentFixture<PublicItProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicItProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicItProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
