import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Function to fetch and parse XML data
  parseXmlData(): Observable<any> {
    const apiUrl = 'https://stats-sdmx-disseminate.pacificdata.org/rest/data/SPC,DF_GWG,1.0/A......_T?startPeriod=2012&endPeriod=2021&dimensionAtObservation=AllDimensions';
    return this.http.get(apiUrl, { responseType: 'text' }).pipe(
      map(xmlData => {
        let jsonData: any;
        xml2js.parseString(xmlData, (err: any, result: any) => {
          if (err) {
            throw new Error('Failed to parse XML');
          }
          jsonData = result;
        });
        return jsonData;
      })
    );
  }
}
