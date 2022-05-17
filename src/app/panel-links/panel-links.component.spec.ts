import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelLinksComponent } from './panel-links.component';

describe('PanelLinksComponent', () => {
  let component: PanelLinksComponent;
  let fixture: ComponentFixture<PanelLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
