import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../enviroments/environment';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-advance-scan',
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
          <th>Device Type</th>
          <th>Running Device</th>
          <th>OsCpe</th>
          <th>OS Details</th>
          <th>OS Guesses</th>
          <th>Action</th>
        </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of scanData">
      <td>{{ row.ip }}</td>
      <td>{{ row.mac }}</td>
      <td>{{ row.device_type }}</td>
      <td>{{ row.running_device }}</td>
      <td>{{ row.oscpe }}</td>
      <td>{{ row.os_details }}</td>
      <td>{{ row.os_guess }}</td>
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
.main{
  margin-right:65px;
  display:flex;
  align-items:center;
  justify-content:center;
}
td , th{
  padding:15px;
    border:1px solid grey;
  }
  `
})
export class AdvanceScanComponent implements OnInit {
  url = environment.apiUrl + 'api/v1/scan/advance/' // Should be changed according to your server
  deviceURL = environment.apiUrl + 'api/v1/devices/';
  http = inject(HttpClient)
  scanData: any = [];
  gotData = signal(false)
  existingMacs: string[] = [];
  router = inject(Router);

  ngOnInit(): void {
    this.fetchExistingDevices();
    this.advanceScanData();

  }

  fetchExistingDevices() {
    this.http.get(this.deviceURL).subscribe((response: any) => {
      console.log("Fetched response:", response);

      // Access the 'devices' array from the response
      if (response && response.devices && Array.isArray(response.devices)) {
        this.existingMacs = response.devices.map((device: any) => device.mac);
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


  advanceScanData() {
    console.log("Fetch Data called")
    this.http.get(this.url).subscribe((scanData: any) => {
      console.log(scanData)
      this.scanData = scanData.output
      this.gotData.set(true)
    })
  }

  onAdd(row: any) {
    this.http.post(this.deviceURL, {
      "ip_address": row.ip,
      "name": row.device_type,
      "os_cpe": row.oscpe,
      "mac_address": row.mac,
      "running_device": row.running_device,
      "os_details": row.os_details,
      "os_guesses": row.os_guess
    }).subscribe((response: any) => {
      console.log("Added Device: ", response)
    })
    this.router.navigate(['device']); // Adjust the route as per your routing setup

  }
}
