import { Country } from './../interface/interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

let headers = new HttpHeaders({
	'x-rapidapi-host': 'Covid-19-tracking.p.rapidapi.com',
	'x-rapidapi-key':'a026ed88admsh5b6bff88b11f434p11044cjsneefde4031477'
});

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient) { }

  getAllCountriesData(){
    return this.http.get<any>('https://covid-19-tracking.p.rapidapi.com/v1/usa', {
      headers: headers
    })
  }

  getGlobalData(){
    return this.http.get<any>('https://covid-19-tracking.p.rapidapi.com/v1/World', {
      headers: headers
    })
  }
}
