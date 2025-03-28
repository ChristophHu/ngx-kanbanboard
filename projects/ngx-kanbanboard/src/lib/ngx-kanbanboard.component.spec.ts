import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxKanbanboardComponent } from './ngx-kanbanboard.component';

describe('NgxKanbanboardComponent', () => {
  let component: NgxKanbanboardComponent;
  let fixture: ComponentFixture<NgxKanbanboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxKanbanboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxKanbanboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
