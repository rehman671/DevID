import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../enviroments/environment';


@Component({
  selector: 'app-scan-data',
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
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of scanData">
      <td>{{ row.ip }}</td>
      <td>{{ row.mac }}</td>
      <td>{{ row.name }}</td>
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
    border:2px solid grey;
  }
  `
})
export class ScanDataComponent implements OnInit{
  url = environment.apiUrl + 'api/v1/scan/normal/'
  http = inject(HttpClient)
  gotData = signal(false)
  scanData: any = [];

  ngOnInit(): void {
    this.normalScanData();
  
  }

  normalScanData(){
    console.log("Fetch Data called")
    this.http.get(this.url).subscribe((scanData:any)=>{
      console.log(scanData)
      this.scanData = scanData.output
      this.gotData.set(true)
    })
  }
}
