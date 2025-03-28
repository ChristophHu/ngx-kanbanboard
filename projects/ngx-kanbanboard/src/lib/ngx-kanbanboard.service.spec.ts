import { TestBed } from '@angular/core/testing';

import { NgxKanbanboardService } from './ngx-kanbanboard.service';

describe('NgxKanbanboardService', () => {
  let service: NgxKanbanboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxKanbanboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
