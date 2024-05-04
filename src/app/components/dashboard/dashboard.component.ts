import { Component, OnInit, ViewChild} from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';

interface GroupedData {
  country: string;
  year: number;
  values: number[];
}


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild("chart", {static: false}) chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;
  seriesData!: ApexAxisChartSeries;
  categories!: number[];
  dataSet: any;
  constructor(private dataService: DataService, private http: HttpClient) {
  //   this.chartOptions = {
  //     series: [
  //       {
  //         name: "Time Series",
  //         data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  //       }
  //     ],
  //     chart: {
  //       height: 350,
  //       type: "bar"
  //     },
  //     title: {
  //       text: "Test Chart"
  //     },
  //     xaxis: {
  //       categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
  //     }
  //   };
  }
  ngOnInit(): void {
    // this.http.get('assets/data/gender-wage-gap.json').subscribe(data => {
    //   this.dataSet = data;
    //   this.processData(data);
    //   // console.log('JSON Data:', this.dataSet);
    // });
    this.http.get<any[]>('assets/data/gender-wage-gap.json').subscribe(data => {
      this.processData(data);
    });
    
    
 
  } 
  processData(data: any[]): void {
    const groupedData = data.reduce((acc, curr) => {
      const key = `${curr.country}-${curr.year}`;
      if (!acc[key]) {
        acc[key] = {
          country: curr.country,
          year: curr.year,
          values: []
        };
      }
      acc[key].values.push(curr.observation_value);
      return acc;
    }, {});

    const groupedValues: GroupedData[] = Object.values(groupedData);
    this.categories = [...new Set(groupedValues.map(item => item.year))];

    this.chartOptions = {
      chart: {
        type: 'line'
      },
      series: groupedValues.map(item => ({
        name: item.country,
        data: item.values
      })),
      xaxis: {
        categories: this.categories
      }
    };
  }
  
  
  }
  
  



