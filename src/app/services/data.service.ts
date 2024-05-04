import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  xml!:string;
  apiUrl = `https://stats-sdmx-disseminate.pacificdata.org/rest/data/SPC,DF_GWG,1.0/A.VU+TO+TV+SB+WS+PW+FM+MH.._T.._T.U+T+S+R+P+Q+O+N+M+L+K+J+I+H+G+F+E+D+C+B+A?startPeriod=2012&endPeriod=2021&dimensionAtObservation=AllDimensions`
  constructor(private http: HttpClient) { 
    const parser = new xml2js.Parser({ strict: false, trim: true });
    parser.parseString(this.apiUrl, (err, result) => {
      this.xml = result;
    });
  }
  }
  
  // Function to fetch and parse XML data
  // getData(): Observable<any> {
  //   const apiUrl = 'https://stats-sdmx-disseminate.pacificdata.org/rest/data/SPC,DF_GWG,1.0/A.VU+TO+TV+SB+WS+PW+FM+MH.._T.._T.U+T+S+R+P+Q+O+N+M+L+K+J+I+H+G+F+E+D+C+B+A?startPeriod=2012&endPeriod=2021&dimensionAtObservation=AllDimensions';
  //   return this.http.get(apiUrl, { responseType: 'text' }).pipe(
  //     map(xmlData => {
  //       console.log('XML Data:', xmlData); // Log the XML data
  //       let jsonData: any[] = []; // Initialize jsonData as an empty array
  //       xml2js.parseString(xmlData, (err: any, result: any) => {
  //         if (err) {
  //           console.error('Error parsing XML:', err); // Log the parsing error
  //           throw new Error('Failed to parse XML');
  //         }
  //         const observations = result['message:GenericData']['message:DataSet'][0]['generic:Obs'];
  //         jsonData = observations.map((obs: any) => {
  //           const obsKey = obs['generic:ObsKey'][0]['generic:Value'];
  //           const obsValue = obs['generic:ObsValue'][0].$.value;
  //           const attributes = obs['generic:Attributes'][0]['generic:Value'];
  //           const observation: any = {};
  //           obsKey.forEach((value: any) => {
  //             observation[value.$.id] = value.$.value;
  //           });
  //           observation['value'] = obsValue;
  //           attributes.forEach((attr: any) => {
  //             observation[attr.$.id] = attr.$.value;
  //           });
  //           return observation;
  //         });
  //       });
  //       return jsonData;
  //     }),
  //     catchError(error => {
  //       console.error('Error fetching data:', error);
  //       return throwError('Failed to fetch/parse data');
  //     })
  //   );
  // }
