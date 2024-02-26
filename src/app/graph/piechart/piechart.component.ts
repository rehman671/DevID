import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

declare var require: any;
if(typeof document === 'object' && !!document) {
  var CanvasJS = require('./../../../../node_modules/@canvasjs/charts');
  CanvasJS.addColorSet("customColorSet",["#ffcb06", "#ce1249", "#3a943c", "#7f3e83", "#812900", "#2078b6", "#df7f2e", "#e3e3e3"]);
}

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-piechart',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  template: `
   <div>
    <canvasjs-chart [options]="chartOptions" [styles]="{width: '100%', height:'360px'}"></canvasjs-chart>    
</div>  
  `,
  styles: ``
})
export class PieChartComponent {
  chartOptions = {
    animationEnabled: true,
    theme: "white",
    colorSet: "customColorSet",
    title:{
      text: "Most Common OS"
    },
    data: [{
      type: "doughnut",
      indexLabel: "{name}: {y}",
      innerRadius: "90%",
      yValueFormatString: "#,##0.00'%'",
      dataPoints: [
        { y: 33, name: "Windows 10" },
        { y: 25, name: "MacOS" },
        { y: 13.5, name: "Ubuntu" },
        { y: 11, name: "iOS" },
        { y: 7.7, name: "Android" },
        { y: 5.5, name: "Windows 7" },
        { y: 4, name: "Fedora" },
        { y: 0.2, name: "Chrome OS" },
        { y: 0.1, name: "Others" }
      ]
      
    }]
    }
}                