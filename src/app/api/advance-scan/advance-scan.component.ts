import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../enviroments/environment';

@Component({
  selector: 'app-advance-scan',
  standalone: true,
  imports: [CommonModule , MatProgressSpinnerModule],
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
    </tr>
  </tbody>
</table>
</div>
`,
  styles: `
.main{
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
  http = inject(HttpClient)
  scanData: any = [];
  gotData = signal(false)

  ngOnInit(): void {
    this.advanceScanData();
  
  }


  advanceScanData(){
    console.log("Fetch Data called")
    this.http.get(this.url).subscribe((scanData:any)=>{
      console.log(scanData)
      this.scanData = scanData.output
      this.gotData.set(true)
    })
  }

}
