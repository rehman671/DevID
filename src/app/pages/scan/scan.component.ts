import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ScanDataComponent } from '../../api/scan-data/scan-data.component';
import { MatSnackBar } from '@angular/material/snack-bar'; // Optional for notifications
import { AdvanceScanComponent } from '../../api/advance-scan/advance-scan.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ScanDataComponent,
    AdvanceScanComponent,
  ],
  template: `
    <h1>Scan</h1>
    <div class="main-section">
      <div class="operational-buttons">
        <button mat-raised-button color="primary" (click)="normalScan()">
          Basic Scan
        </button>
        <button mat-raised-button color="primary" (click)="advanceScan()">
          Advance Scan
        </button>
        <div class="tooltip">
          <button (click)="toggleForm()" class="add-device-btn tooltip">
            <span class="material-symbols-outlined "> add </span>
          </button>
          <span class="tooltiptext">Add Manual</span>
        </div>
      </div>
      <div class="nmap-content">
        <app-scan-data
          style="margin: auto;"
          *ngIf="normalScanApi()"
        ></app-scan-data>
        <app-advance-scan
          style="margin: auto;"
          *ngIf="advanceScanApi()"
        ></app-advance-scan>
        <div *ngIf="showForm" class="add-device-form">
  <form [formGroup]="addDeviceForm" (ngSubmit)="onSubmit()">
    <div class="form-fields">
      <div class="left-fields">
        <mat-form-field>
          <mat-label>Device IP</mat-label>
          <input matInput formControlName="ip_address" placeholder="192.168.0.0" required />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Device Name</mat-label>
          <input matInput formControlName="name" placeholder="" required />
        </mat-form-field>
        <mat-form-field>
          <mat-label>OsCpe</mat-label>
          <input matInput formControlName="os_cpe" placeholder="" />
        </mat-form-field>
      </div>
      <div class="right-fields">
        <mat-form-field>
          <mat-label>Mac Address</mat-label>
          <input matInput formControlName="mac_address" placeholder="" required />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Running Device</mat-label>
          <input matInput formControlName="running_device" placeholder="" />
        </mat-form-field>
        <mat-form-field>
          <mat-label>OS detail</mat-label>
          <input matInput formControlName="os_details" placeholder="" />
        </mat-form-field>
      </div>
    </div>
    <div class="form-btn">
      <button mat-raised-button color="primary" type="submit">Add</button>
      <button mat-button color="warn" type="button" (click)="toggleForm()">Cancel</button>
    </div>
  </form>
</div>
      </div>
    </div>

    <!-- Device Add Form -->

    <!-- Add Device Form -->
  `,
  styles: `
  @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

.material-symbols-outlined {
  transform:scale(2);

  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
}

  button{
    margin:2px;
    width:200px;
  }

  .operational-buttons{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
  }

  .main-section {
  display: flex;
  height:80vh;
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
  padding:2%;

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

.add-device-btn{
  border:0px;
  border-radius:100%;
  width:fit-content;
  font-size:30px;
  margin-left:25%;
}
@keyframes spin {
    from {
        transform: rotate(0deg) ;
    }
    to {
        transform: rotate(360deg);
    }
}

.add-device-btn:hover{
  animation: spin 0.5s ease-in-out forwards;
  cursor:pointer;
}

.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltiptext {
  opacity: 0;
  width: 120px;
  background-color: grey;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  transition:all 0.5s ease;
}

.tooltip:hover .tooltiptext {
  opacity: 1;
}

.add-device-form{
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
}
.form-fields{
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  >.left-fields{
    margin:10px;
    width:40%;
  }
  >.right-fields{
    margin:10px;
    width:40%;
  }
}
.form-btn{
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  >button{
    margin:10px;
  }
}
  `,
})
export class ScanComponent {
  progress_spiral = signal(false);
  otherNmapOptions = signal(false);
  nmapScanData: any;
  normalScanApi = signal(false);
  advanceScanApi = signal(false);
  showForm = false;
  addDeviceForm: FormGroup;
  http = inject(HttpClient);
  deviceURL = environment.apiUrl + 'api/v1/devices/'


  anyapi = computed(() => {
    if (this.normalScanApi() || this.advanceScanApi()) {
      return true;
    } else {
      return false;
    }
  });

  normalScan() {
    this.showForm = false;
    this.normalScanApi.set(true);
    this.advanceScanApi.set(false);
  }

  advanceScan() {
    this.showForm = false;
    this.normalScanApi.set(false);
    this.advanceScanApi.set(true);
  }

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.addDeviceForm = this.fb.group({
      ip_address: ['', Validators.required],
      name: ['', Validators.required],
      os_cpe: [''],
      mac_address: ['', Validators.required],
      running_device: [''],
      os_details: ['']
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    if (this.addDeviceForm.valid) {
      const formData = this.addDeviceForm.value;
      console.log("Form Data:", formData);
      // Add device logic here
      this.http.post(this.deviceURL, formData).subscribe(response => {
        console.log("Device added successfully:", response);
        this.snackBar.open('Device added successfully!', 'Close', {
          duration: 3000
        });
      });
      this.showForm = false;

      //     // Optionally, reload or refresh data
      //     this.fetchExistingDevices();
      //     this.normalScanData();
      //     this.toggleForm();
      //   }, error => {
      //     console.error("Error adding device:", error);
      //     this.snackBar.open('Error adding device!', 'Close', {
      //       duration: 3000
      //     });
      //   });
      // } else {
      //   this.snackBar.open('Please fill all required fields!', 'Close', {
      //     duration: 3000
      //   });
      // }
    }
  }
  // addDevice(){
  //   this.http.post(this.deviceURL , {
  //     "name":row.name,
  //     "ip_address": row.ip,
  //     "mac_address":row.mac
  //   } ).subscribe((response:any)=>{
  //     console.log("Added Device: " , response)
  //   })
  //   window.location.reload();
  // }
  // constructor(private scanData:NmapScanDataService){

  //   scanData.getScans().subscribe((data)=>{
  //     console.log(data)
  //     this.nmapScanData = data
  //   })
  // }
  // ngOnInit(): void {

  // }
}
