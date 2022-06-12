import { DashboardService } from './../../services/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Country } from 'src/app/interface/interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @Output() countryUpdate = new EventEmitter();

  selectedValue!: string;
  selectedCountry: any;
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
  yAxisLabel: string = 'Number';
  xAxisLabel: string = 'Status';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  xAxisTicks: any[] = ['Total Deaths', 'Item 2', 'Item 3']
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
  barPadding: number = 20
  tooltipDisabled: boolean = false;

  yScaleMax: number = 4000;

  roundEdges: boolean = false;
  value!: any;

  constructor(private http: HttpClient, private service:DashboardService) { Object.assign( this.DataOption ); }

  countries: Country[] = [
    {id: 1, viewValue: 'South Africa'},
    {id: 2, viewValue: 'USA'},
    {id: 3, viewValue: 'Botswana'},
    {id: 4, viewValue: 'Australia'},
    {id: 5, viewValue: 'Brazil'},
    {id: 6, viewValue: 'Egypt'},
    {id: 7, viewValue: 'France'},
    {id: 8, viewValue: 'Germany'},
    {id: 9, viewValue: 'Ghana'},
    {id: 10, viewValue: 'Greece'},
    {id: 11, viewValue: 'India'},
    {id: 12, viewValue: 'Italy'},
    {id: 13, viewValue: 'Jamaica'},
    {id: 14, viewValue: 'Japan'},
    {id: 15, viewValue: 'Kenya'},
    {id: 16, viewValue: 'Lesotho'},
    {id: 17, viewValue: 'Maldives'},
    {id: 18, viewValue: 'Mexico'},
    {id: 19, viewValue: 'Mozambique'},
    {id: 20, viewValue: 'Netherlands'},
    {id: 21, viewValue: 'Nigeria'},
    {id: 22, viewValue: 'Pakistan'},
    {id: 23, viewValue: 'Russia'},
    {id: 24, viewValue: 'Senegal'},
    {id: 25, viewValue: 'Spain'},
    {id: 26, viewValue: 'Switzerland'},
  ];


  ngOnInit(): void {

      this.service.getAllCountriesData().subscribe((data) => {
        if(data != "") {
          const str1 = data["Total Cases_text"]
          const num1 = parseInt(str1.replace(/,/g,''))
          const str2 = data["Total Deaths_text"]
          const num2 = parseInt(str2.replace(/,/g,''))
          const str3 = data["Total Recovered_text"]
          const num3 = parseInt(str3.replace(/,/g,''))
          this.DataOption.push({"name":"Total Cases","value":num1})
          this.DataOption.push({"name":"Total Deaths","value":num2})
          this.DataOption.push({"name":"Total Recoveries","value":num3})
        }
        this.DataOption = [...this.DataOption];
        this.lastUpdate = data["Last Update"]
      })

      this.service.getGlobalData().subscribe((data) => {
        this.totalDeaths = data["Total Deaths_text"]
        this.totalRecovered = data["Total Recovered_text"]
        this.totalCases = data["Total Cases_text"]
      })

  }
  DataOption:any[] = [];

  handleInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }

  changeCountry(e:Event){

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
