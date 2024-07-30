import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-device-management',
  standalone: true,
  imports: [MatButtonModule , MatProgressSpinnerModule , CommonModule],
  template: `
    <h1>Device Management</h1>
    <div class="main-section">
      <div class="devices-table">
      <mat-spinner *ngIf="!gotData()" class="spinner"></mat-spinner>
    <table *ngIf="gotData()">
      <thead>
        <tr>
          <th>IP Address</th>
          <th>Name</th>
          <th>Mac Address</th>
          <th>OS Details</th>
          <th>OsCpe</th>
          <th>Running Devices</th>
          <th>OS Guesses</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of devices">
          <td>{{ row.ip_address }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.mac_address }}</td>
          <td>{{ row.os_details }}</td>
          <td>{{ row.os_cpe }}</td>
          <td>{{ row.running_device }}</td>
          <td>{{ row.os_guesses }}</td>
          <td><button mat-button color="warn" type="button" (click)="onDelete(row)">
              Delete
            </button></td>
        </tr>
      </tbody>
    </table>
      </div>
      <div class="operational-btn">
        <div class="reset-btn">
          <button mat-raised-button color="primary" (click)="reDeployContract()" [disabled]="disable_btn()">
            Reset Database
          </button>
        </div>
      </div>
    </div>
  `,
  styles: `
  
  .main-section{
    display:flex;
    flex-direction:column-reverse;
    justify-content:space-around;
    align-items:center;
    
  }
  .operational-btn{
    display:flex;
    flex-direction:row;
    justify-content:end;
    align-items:center;
    width:100%;
    >.reset-btn{
      margin:2%;
      >button{
        padding-right:20px;
      }
    }
  }
  td, th {
      padding: 25px;
      border: 2px solid #e7e7e7;
    }
  `
})
export class DeviceManagementComponent {
  url = environment.apiUrl + "api/v1/deploy/";
  deviceURL = environment.apiUrl + 'api/v1/devices/'
  devices: any = [];
  http = inject(HttpClient)
  gotData = signal(false)
  disable_btn = signal(false)
  scanData: any = [];

  ngOnInit(): void {
    this.fetchExistingDevices();

  }

  fetchExistingDevices() {
    this.http.get(this.deviceURL).subscribe((response: any) => {
      console.log(response)
      this.devices = response.devices
    });
    console.log(this.devices)
    this.gotData.set(true)
  }

  
  onDelete(row: any) {
    this.http.delete(this.deviceURL + row.id + "/").subscribe((response:any)=>{
      console.log("Device deleted " , response)
    });
    window.location.reload();

  }
  reDeployContract() {
    this.http.post(this.url, {}).subscribe((scanData: any) => {
      this.scanData = scanData.output
    })
  }

}
