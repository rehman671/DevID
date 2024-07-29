import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../enviroments/environment';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-scan-data',
  standalone: true,
  imports: [CommonModule , MatProgressSpinnerModule , MatButtonModule],
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
      <td><button
      mat-raised-button
      color="primary"

      >
        Add
      </button></td>
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
    padding:25px;
    border:2px solid #e7e7e7;
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
