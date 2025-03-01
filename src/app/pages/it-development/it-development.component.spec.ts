import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItDevelopmentComponent } from './it-development.component';

describe('ItDevelopmentComponent', () => {
  let component: ItDevelopmentComponent;
  let fixture: ComponentFixture<ItDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItDevelopmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
