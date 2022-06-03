import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

let headers = new HttpHeaders({
	'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com',
	'x-rapidapi-key':'43d514591bmsha830e3da6b3884bp1ab8fcjsn00fd6e80fba6'
});

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalCases: any;
  totalDeaths: any;
  totalRecovered: any;
  newCases: any;
  newDeaths: any;
  title = 'Covid-19 Tracker';
  lastUpdate: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllCountriesData();

  }

  getAllCountriesData(){
    this.http.get<any>('https://covid-19-tracking.p.rapidapi.com/v1/World', {
      headers: headers
    })
    .subscribe((data: any) => {
      this.totalCases = data["Total Cases_text"];
      this.totalDeaths = data["Total Deaths_text"];
      this.totalRecovered = data["Total Recovered_text"];
      this.newCases = data["New Cases_text"];
      this.newDeaths = data["New Deaths_text"];
      this.lastUpdate = data["Last Update"];
      console.log(data);
    });
  }

}
