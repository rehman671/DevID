import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { environment } from '../../enviroments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



declare var require: any;
if (typeof document === 'object' && !!document) {
  var CanvasJS = require('./../../../../node_modules/@canvasjs/charts');
  CanvasJS.addColorSet("customColorSet", ["#ffcb06", "#ce1249", "#3a943c", "#7f3e83", "#812900", "#2078b6", "#df7f2e", "#e3e3e3"]);
}

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule , MatProgressSpinnerModule],
  template: `
   <div  id='pieChartContainer'>
  </div>  
  <div class="spinner" *ngIf="!gotData()" >
    <mat-spinner  style="zoom:0.5" class="spinner"></mat-spinner>
  </div>
  `,
  styles: `
  .spinner{
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
  }
  `
})
export class PieChartComponent implements OnInit {
  url = environment.apiUrl + '/api/v1/dashboard/piechart/';
  dataPoints: any = [];
  chartOptions: any;
  chart: any;
  gotData = signal(false)


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDatapoints();
  }

  fetchDatapoints() {
    this.http.get(this.url).subscribe((scanData: any) => {
      console.log(scanData.datapoints);
      this.dataPoints = scanData.datapoints;
      this.gotData.set(true)
      this.initializeChart();

    });
  }

  initializeChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chartOptions = {
      animationEnabled: true,
      theme: "white",
      colorSet: "customColorSet",
      title: {
        text: "Most Common Devices"
      },
      data: [{
        type: "doughnut",
        indexLabel: "{name}: {y}",
        innerRadius: "90%",
        yValueFormatString: "#,##0.00'%'",
        dataPoints: this.dataPoints
      }]
    };
  
    const chartContainer = document.getElementById("pieChartContainer");
    if (chartContainer) {
      chartContainer.style.position = "relative";
    }
  
    this.chart = new CanvasJS.Chart("pieChartContainer", this.chartOptions);
    this.chart.render();
  }
}