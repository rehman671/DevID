import { Component, OnInit, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ScanDataComponent } from "../../api/scan-data/scan-data.component";
import { AdvanceScanComponent } from "../../api/advance-scan/advance-scan.component";

@Component({
  selector: 'app-scan',
  standalone: true,
  template: `
    <h1>Scan</h1>
    <div class="main-section">
      <div class="operational-buttons">
        <button
          *ngIf="showNmap()"
          mat-raised-button
          color="primary"
          (click)="toggleVisibility(showNmap)"
        >
          Nmap
        </button>
        <button
          *ngIf="!showNmap()"
          mat-stroked-button
          color="primary"
          (click)="toggleVisibility(showNmap)"
        >
          Nmap
        </button>
        <!-- <button
          *ngIf="showModel()"
          mat-raised-button
          color="primary"
          (click)="toggleVisibility(showModel)"
        >
          ML Model
        </button>
        <button
          *ngIf="!showModel()"
          mat-stroked-button
          color="primary"
          (click)="toggleVisibility(showModel)"
        >
          ML Model
        </button> -->
        <button
          *ngIf="showManual()"
          mat-raised-button
          color="primary"
          (click)="toggleVisibility(showManual)"
        >
          Manual
        </button>
        <button
          *ngIf="!showManual()"
          mat-stroked-button
          color="primary"
          (click)="toggleVisibility(showManual)"
        >
          Manual
        </button>
      </div>

      <div
      *ngIf="showNmap()"
      class="nmap-whole"
      [class.background-dim]="progress_spiral()"
      >
      <div class="input-button-container" *ngIf='otherNmapOptions()'>
        <input
        type="text"
        placeholder="Enter IP for further scanning"
        class="input-field"
          style="height:50px;width:400px;background-color:#F5F5F5;border:1px solid #F5F5F5;margin:100px"
        />
        <button mat-raised-button color="primary">Submit</button>
      </div>
      <div class="nmap-content">
        <app-scan-data style="margin: auto;"  *ngIf="normalScanApi()"></app-scan-data>
        <app-advance-scan style="margin: auto;" *ngIf="advanceScanApi()"></app-advance-scan>
        <div *ngIf="!anyapi()" class="nmap-output">
            <p  >Scan output will be displayed here.</p>
          </div>
          <div class="nmap-scan-btns">
            <button
              mat-raised-button
              color="primary"
              style="width: 150px;"
              (click)="normalScan();"
            >
              Normal Scan
            </button>
            <button
              mat-raised-button
              color="primary"
              style="width: 150px;"
              (click)=" advanceScan();"
            >
              Advance Scan
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="showModel()" class="model-content">
        <div class="model-output">
          <p>Model output will be displayed here.</p>
        </div>
        <div class="nmap-scan-btns">
          <button mat-raised-button color="primary" style="width: 150px;">
            Model Detection
          </button>
        </div>
      </div>
      <div class="manual-content" *ngIf="showManual()">
        <div class="input-field-container">
          <mat-form-field appearance="fill">
            <mat-label>Enter Details</mat-label>
            <textarea matInput style="height: 350px;"></textarea>
          </mat-form-field>
          <div class="manual-btn">
            <button mat-raised-button color="primary" style="width: 150px;">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
  button{
    margin:2px;
    width:200px;
  }

  .operational-buttons{
    display:flex;
    flex-direction:row;
  }

  .main-section {
  display: flex;
  flex-direction: column; /* This will stack the buttons and the form vertically */
}

.operational-buttons {
  margin-bottom: 20px; /* Add some space between the buttons and the next section */
}

.model-content{
  display:flex;
  flex-direction:row;
  height:75vh;
  margin:auto;
  justify-content:center;
  align-items:center;
  width:80vw
}


.nmap-whole{
  display:flex;
  flex-direction:column;
  height:100vh;
  margin:auto;
  justify-content:center;
  align-items:center;
  width:80vw;
  padding:2%
}
.nmap-content{
  display:flex;
  flex-direction:row;
  height:100%;
  margin:auto;
  justify-content:center;
  align-items:center;
  width:100%;
  padding:2%

}
.nmap-output{
  background-color:#F5F5F5;
  width:70%;
  padding:2%;
  height:80%;
  margin:auto;
  border-radius:2%;
  display: flex;
  justify-content: center;
  align-items: center; 
  border:1px solid #DEDEDE;
}

.model-output{
  background-color:#F5F5F5;
  width:100%;
  padding:2%;
  height:80%;
  margin:auto;
  border-radius:2%;
  border:1px solid #DEDEDE;
}
.nmap-scan-btns{
  height:80%;
  margin-right:5%;
  display:flex;
  flex-direction:column;

  >button{
    width:250px;
  }
}

.manual-content{
  display:flex;
  flex-direction:row;
  height:70vh;
  // margin:auto;
  justify-content:center;
  align-items:center;
  width:80vw;
}

.manual-btn{
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:flex-end;
}

.manual-input{
  background-color:#F5F5F5;
  width:1000px;
  padding:2%;
  height:80%;
  // margin:auto;
  border-radius:2%;
  border:1px solid #DEDEDE;
}

.input-field-container {
  width: 70vw; /* 70% of the viewport width */
  height: 60vh; /* 60% of the viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

mat-form-field {
  width: 100%; /* Make the mat-form-field fill the container */
}

textarea {
  width: 100%; /* Make the textarea fill the mat-form-field */
  height: 20%; /* Adjust height to fill the container, but consider mat-form-field padding */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

.background-dim {
  background-color: rgba(0, 0, 0, 0.2)
}

  `,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ScanDataComponent,
    AdvanceScanComponent
  ]
})
export class ScanComponent {
  showManual = signal(false);
  showNmap = signal(false);
  showModel = signal(false);
  progress_spiral = signal(false);
  otherNmapOptions = signal(false);
  nmapScanData: any;
  normalScanApi = signal(false)
  advanceScanApi = signal(false)
  anyapi = computed(() => {
    if (this.normalScanApi() || this.advanceScanApi()) {
      return true;
    } else {
      return false;
    }
  });

  normalScan() {
    this.normalScanApi.set(true)
    this.advanceScanApi.set(false)
  }

  advanceScan() {
    this.normalScanApi.set(false)
    this.advanceScanApi.set(true)
  }

  toggleVisibility(state: any) {
    if (state === this.showManual) {
      this.showManual.set(!this.showManual());
      this.showModel.set(false);
      this.showNmap.set(false);
      this.otherNmapOptions.set(false);
    } else if (state === this.showModel) {
      this.showModel.set(!this.showModel());
      this.showManual.set(false);
      this.showNmap.set(false);
      this.otherNmapOptions.set(false);
    } else if (state === this.showNmap) {
      this.showNmap.set(!this.showNmap());
      this.showManual.set(false);
      this.showModel.set(false);
      this.otherNmapOptions.set(false);
    }
  }


  // constructor(private scanData:NmapScanDataService){

  //   scanData.getScans().subscribe((data)=>{
  //     console.log(data)
  //     this.nmapScanData = data
  //   })
  // }
  // ngOnInit(): void {

  // }

}
