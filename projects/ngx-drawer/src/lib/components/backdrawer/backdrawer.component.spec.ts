import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdrawerComponent } from './backdrawer.component';

describe('BackdrawerComponent', () => {
  let component: BackdrawerComponent;
  let fixture: ComponentFixture<BackdrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackdrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackdrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
