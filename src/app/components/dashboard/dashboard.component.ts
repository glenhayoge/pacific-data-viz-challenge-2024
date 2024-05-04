import { Component, OnInit, ViewChild} from '@angular/core';
import dataSet from "../../../assets/data/gender-wage-gap.json";
import * as xml2js from 'xml2js';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { DataService } from 'src/app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { GenderData } from 'src/app/model/data-model';

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

  dataSet: any;

  data!: any[];
xml: any;
xmlData: any;
apiUrl = "https://stats-sdmx-disseminate.pacificdata.org/rest/data/SPC,DF_GWG,1.0/A.VU+TO+TV+SB+WS+PW+FM+MH.._T.._T.U+T+S+R+P+Q+O+N+M+L+K+J+I+H+G+F+E+D+C+B+A?startPeriod=2012&endPeriod=2021&dimensionAtObservation=AllDimensions";

  constructor(private dataService: DataService, private http: HttpClient) {

    // const parser = new xml2js.Parser({ strict: false, trim: true });
    // parser.parseString(this.apiUrl, (err, result) => {
    //   this.xml = result;
    // });
  
    
    this.chartOptions = {
      series: [
        {
          name: "My-series",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "My First Angular Chart"
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      }
    };
  }
  ngOnInit(): void {
    this.http.get('assets/data/gender-wage-gap.json').subscribe(data => {
      this.dataSet = data;
      console.log('JSON Data:', this.dataSet);
    });
  } 
  }
  
  



