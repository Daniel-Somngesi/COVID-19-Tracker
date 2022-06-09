import { singleDataOption } from 'src/app/_data/singleData';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';

interface Country {
  value: string;
  viewValue: string;
}



let headers = new HttpHeaders({
	'x-rapidapi-host': 'Covid-19-tracking.p.rapidapi.com',
	'x-rapidapi-key':'43d514591bmsha830e3da6b3884bp1ab8fcjsn00fd6e80fba6'
});

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
 DataOption:any[] = [
  {
    "name": "Total Deaths",
    "value": 1239000
  }, {
    "name": "Total Cases",
    "value": 52000000
  }, {
    "name": "Total Recovery",
    "value": 34000000
  },
];

  totalCases: any;
  totalDeaths: any;
  totalRecovered: any;
  newCases: any;
  newDeaths: any;
  title = 'Covid-19 Tracker';
  lastUpdate: any;

  singleDataOption: any[] = [];
  multiDataOptions: any[] = [];

  // options
  legendTitle: string = 'Legend Title';
  legendTitleMulti: string = 'Time Marker';
  legend: boolean = true;
  legendlocation = LegendPosition.Right;
  xAxis: boolean = true;
  yAxis: boolean = true;
  yAxisLabel: string = 'Axis Label';
  xAxisLabel: string = 'Axis Label';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  xAxisTicks: any[] = ['Total Deaths', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
  yAxisTicks: any[] = [10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000]

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = true;
  colorScheme = {
    domain: ['aqua', 'blue', 'chartreuse', 'crimson', 'fuchsia', 'gray',
            'green', 'indigo', 'lime', 'magenta', 'navy', 'maroon', 'olive',
            'purple', 'red', 'silver', 'teal', 'yellow']
  };

  activeEntries: any[] = []
  barPadding: number = 5
  tooltipDisabled: boolean = false;

  yScaleMax: number = 4000;

  roundEdges: boolean = false;


  constructor(private http: HttpClient) { Object.assign( this.DataOption ); }

  countries: Country[] = [
    {value: 'country-0', viewValue: 'South Africa'},
    {value: 'country-1', viewValue: 'USA'},
    {value: 'country-2', viewValue: 'Botswana'},
    {value: 'country-3', viewValue: 'Australia'},
    {value: 'country-4', viewValue: 'Brazil'},
    {value: 'country-5', viewValue: 'Egypt'},
    {value: 'country-6', viewValue: 'France'},
    {value: 'country-7', viewValue: 'Germany'},
    {value: 'country-8', viewValue: 'Ghana'},
    {value: 'country-9', viewValue: 'Greece'},
    {value: 'country-10', viewValue: 'India'},
    {value: 'country-11', viewValue: 'Italy'},
    {value: 'country-12', viewValue: 'Jamaica'},
    {value: 'country-13', viewValue: 'Japan'},
    {value: 'country-14', viewValue: 'Kenya'},
    {value: 'country-15', viewValue: 'Lesotho'},
    {value: 'country-16', viewValue: 'Maldives'},
    {value: 'country-17', viewValue: 'Mexico'},
    {value: 'country-18', viewValue: 'Mozambique'},
    {value: 'country-19', viewValue: 'Netherlands'},
    {value: 'country-20', viewValue: 'Nigeria'},
    {value: 'country-21', viewValue: 'Pakistan'},
    {value: 'country-22', viewValue: 'Russia'},
    {value: 'country-23', viewValue: 'Senegal'},
    {value: 'country-24', viewValue: 'Spain'},
    {value: 'country-25', viewValue: 'Switzerland'},
  ];
  selectedCountry: any =  'South Africa';

  ngOnInit(): void {
    this.getAllCountriesData();

  }

  getCountry(country:any){
    console.log(country);
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

  onSelect(event: any) {
    console.log(event);
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  formatString(input: string): string {
    return input.toUpperCase()
  }

  formatNumber(input: number): number {
    return input
  }

}
