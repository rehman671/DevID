import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartData } from './IChartData';
type ApexNonAxisChartSeries = number[];

@Injectable({
    providedIn: 'root'
  })
  export class CsvReaderServiceV2 {
  
    constructor(private http: HttpClient) {}
  
    readCsvFile(filePath: string): Observable<ChartData> {
      return this.http.get(filePath, { responseType: 'text' }).pipe(
        map(csvData => {
          const labelsCount: { [key: string]: number } = {};
          const rows = csvData.split('\n').slice(1);
  
          rows.forEach(row => {
            const columns = row.split(',');
            const label = columns[297];
  
            if (labelsCount[label]) {
              labelsCount[label]++;
            } else {
              labelsCount[label] = 1;
            }
          });
  
          const chartLabels: string[] = Object.keys(labelsCount);
          const chartSeries: ApexNonAxisChartSeries = chartLabels.map(label => labelsCount[label]);
  
          return { chartSeries, chartLabels };
        })
      );
    }
  }