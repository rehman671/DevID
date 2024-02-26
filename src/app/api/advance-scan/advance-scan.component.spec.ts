import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceScanComponent } from './advance-scan.component';

describe('AdvanceScanComponent', () => {
  let component: AdvanceScanComponent;
  let fixture: ComponentFixture<AdvanceScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceScanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvanceScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
