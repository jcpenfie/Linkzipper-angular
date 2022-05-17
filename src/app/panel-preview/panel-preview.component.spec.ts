import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPreviewComponent } from './panel-preview.component';

describe('PanelPreviewComponent', () => {
  let component: PanelPreviewComponent;
  let fixture: ComponentFixture<PanelPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
