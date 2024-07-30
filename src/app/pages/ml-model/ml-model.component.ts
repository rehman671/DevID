import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';
import { CsvReaderService} from './IeeeData.service';
import {CsvReaderServiceV2} from './IotDataService';

@Component({
  selector: 'app-ml-model',
  templateUrl: './ml.model.component.html',
  styleUrls: ['./ml.model.style.css'],
  standalone: true,
  imports: [CommonModule, NgApexchartsModule]
})
export class MlModelComponent {
  _chartSeries: number[] = [];
  chartLabels: string[] = [];
  chartSeries: ApexNonAxisChartSeries = [];
  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: false
    }
  };
  chartTitle: ApexTitleSubtitle = {
    text: 'IEEE Dataset'
  };
  chartDataLabels: ApexDataLabels = {
    enabled: true
  };

  constructor(private csvReaderService: CsvReaderService, private service2: CsvReaderServiceV2) {}
  isChartVisible = false;
  loadChartData(): void {
    const filePath = 'assets/CSV/IEEE_Dataset.csv';
    this.csvReaderService.readCsvFile(filePath).subscribe(data => {
      this._chartSeries = data.chartSeries;
      this.chartLabels = data.chartLabels;
      this.chartSeries = this._chartSeries;
      this.isChartVisible = !this.isChartVisible;
    });
  }
  //Chart 2
  chartTitle2: ApexTitleSubtitle = {
    text: 'IoT Devices Classification'
  };
  _chartSeries2: number[] = [];
  chartSeries2: ApexNonAxisChartSeries = [];
  chartLabels2: string[] = [];
  isChartVisible2 = false;
  chartDataLabels2: ApexDataLabels = {
    enabled: true
  };
  chartDetails2: ApexChart = {
    type: 'pie',
    toolbar: {
      show: false
    }
  };
  loadChartData2(): void {
    const filePath = 'assets/CSV/IoTDevicesClassification.csv';
    this.service2.readCsvFile(filePath).subscribe(data => {
      this._chartSeries2 = data.chartSeries;
      this.chartLabels2 = data.chartLabels;
      this.chartSeries2 = this._chartSeries2;
      this.isChartVisible2 = !this.isChartVisible2;
    });
  }
}
