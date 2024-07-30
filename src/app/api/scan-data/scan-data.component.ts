import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../enviroments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-data',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule],
  template: `
  <div class="main">
    <mat-spinner *ngIf="!gotData()" class="spinner"></mat-spinner>
    <table *ngIf="gotData()">
      <thead>
        <tr>
          <th>IP</th>
          <th>Mac</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of scanData">
          <td>{{ row.ip }}</td>
          <td>{{ row.mac }}</td>
          <td>{{ row.name }}</td>
          <td>
            <button
              *ngIf="!isMacExisting(row.mac)"
              mat-raised-button
              color="primary"
              (click)="onAdd(row)"
            >
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `,
  styles: `
    .main {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    td, th {
      padding: 25px;
      border: 2px solid #e7e7e7;
    }
  `
})
export class ScanDataComponent implements OnInit {
  url = environment.apiUrl + 'api/v1/scan/normal/';
  deviceURL = environment.apiUrl + 'api/v1/devices/';
  http = inject(HttpClient);
  gotData = signal(false);
  scanData: any = [];
  existingMacs: string[] = [];
  router = inject(Router);

  ngOnInit(): void {
    this.fetchExistingDevices();
    this.normalScanData();
  }

  normalScanData() {
    console.log("Fetch Data called");
    // this.http.get(this.url).subscribe((scanData: any) => {
    //   console.log(scanData);
    //   this.scanData = scanData.output;
    //   this.gotData.set(true);
    // });
    this.scanData = [
      {
        "id": 1,
        "ip": "192.168.222.1",
        "mac": "00:50:56:C0:00:08",
        "name": "VMware"
      },
      {
        "id": 2,
        "ip": "192.168.222.2",
        "mac": "00:50:56:E5:8B:D8",
        "name": "VMware"
      },
      {
        "id": 3,
        "ip": "192.168.222.254",
        "mac": "00:50:56:EA:59:5C",
        "name": "VMware"
      }
    ];
    this.gotData.set(true);
  }
  fetchExistingDevices() {
    this.http.get(this.deviceURL).subscribe((response: any) => {
      console.log("Fetched response:", response);
      
      // Access the 'devices' array from the response
      if (response && response.devices && Array.isArray(response.devices)) {
        this.existingMacs = response.devices.map((device: any) => device.mac_address);
      } else {
        console.error("Unexpected response format:", response);
      }
    }, error => {
      console.error("Error fetching devices:", error);
    });
  }

  isMacExisting(mac: string): boolean {
    return this.existingMacs.includes(mac);
  }

  onAdd(row: any) {
    this.http.post(this.deviceURL , {
      "name":row.name,
      "ip_address": row.ip,
      "mac_address":row.mac
    } ).subscribe((response:any)=>{
      console.log("Added Device: " , response)
    })
    this.router.navigate(['device']); // Adjust the route as per your routing setup
    
  }
}