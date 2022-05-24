import { Component, OnInit } from '@angular/core';
import { WeatherData } from './model/model';
import { ServiceService } from './service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'weatherApp';
  public weatherResData?: WeatherData;
  public coldWeather?: number | undefined;
  public hotWeather?: number | undefined;
  public cityName: string = 'Jabalpur';

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
  }

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string) {
    this.service.getWeatherData(cityName).subscribe(
      (res) => {
        this.weatherResData = res;
        if (this.weatherResData.main.temp < 20) {
          this.coldWeather = this.weatherResData.main.temp;
        } else {
          this.hotWeather = this.weatherResData.main.temp;
        }
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('Api fetching Complete');
      }
    );
  }
}
