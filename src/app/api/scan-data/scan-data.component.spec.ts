import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanDataComponent } from './scan-data.component';

describe('ScanDataComponent', () => {
  let component: ScanDataComponent;
  let fixture: ComponentFixture<ScanDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScanDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
