import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


@Component({
  selector: 'app-linechart',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CanvasJSAngularChartsModule],
  template: `
    <div>
    <canvasjs-chart [options]="chartOptions" [styles]="{width: '100%', height:'360px'}"></canvasjs-chart>    
</div>  
  `,
  styles: ``
})
export class LinechartComponent {
  chartOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Scan Runs - 2023"
    },
    axisX: {
      valueFormatString: "MMM",
      intervalType: "month",
      interval: 1
    },
    axisY: {
      title: "Number of Scan Runs"
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: function(e: any) {
        if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: [{
      type: "line",
      name: "Normal Scan Runs",
      showInLegend: true,
      yValueFormatString: "#",
      dataPoints: [
        { x: new Date(2021, 0, 1), y: 10 },
        { x: new Date(2021, 1, 1), y: 15 },
        { x: new Date(2021, 2, 1), y: 20 },
        { x: new Date(2021, 3, 1), y: 18 },
        { x: new Date(2021, 4, 1), y: 22 },
        { x: new Date(2021, 5, 1), y: 5 },
        { x: new Date(2021, 6, 1), y: 30 },
        { x: new Date(2021, 7, 1), y: 28 },
        { x: new Date(2021, 8, 1), y: 32 },
        { x: new Date(2021, 9, 1), y: 3 },
        { x: new Date(2021, 10, 1), y: 35 },
        { x: new Date(2021, 11, 1), y: 40 }
      ]
    },
    {
      type: "line",
      name: "Advance Scan Runs",
      showInLegend: true,
      yValueFormatString: "#",
      dataPoints: [
        { x: new Date(2021, 0, 1), y: 5 },
        { x: new Date(2021, 1, 1), y: 8 },
        { x: new Date(2021, 2, 1), y: 12 },
        { x: new Date(2021, 3, 1), y: 10 },
        { x: new Date(2021, 4, 1), y: 15 },
        { x: new Date(2021, 5, 1), y: 18 },
        { x: new Date(2021, 6, 1), y: 2 },
        { x: new Date(2021, 7, 1), y: 22 },
        { x: new Date(2021, 8, 1), y: 25 },
        { x: new Date(2021, 9, 1), y: 0 },
        { x: new Date(2021, 10, 1), y: 22 },
        { x: new Date(2021, 11, 1), y: 25 }
      ]
    }]
  }
}

