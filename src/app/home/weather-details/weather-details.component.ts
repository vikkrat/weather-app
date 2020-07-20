import {Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import { WeatherDetailsService } from './weather-details.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit, DoCheck, OnDestroy {
  public searchInput = '';
  public currentWeather: any;
  public currentWeatherSub$: Subscription;
  public oneCallData: any;
  public oneCallDataSub$: Subscription;
  public hourlyTemperature = [];
  public dailyTemperature = [];
  public hourlyChart: any;
  public dailyChart: any;
  public viewedCity = [];

  constructor(
    private weatherDetailsService: WeatherDetailsService
  ) { }

  ngOnInit() {
    this.createCharts();
    this.viewedCity = JSON.parse(localStorage.getItem('viewedCity'));
  }

  ngDoCheck(): void {
    this.createCharts();
  }

  createCharts() {
    this.hourlyChart = [{
      data: this.hourlyTemperature,
      name: 'Temperature, ℃'
    }];

    this.dailyChart = [{
      data: this.dailyTemperature,
      name: 'Temperature, ℃'
    }];
  }

  getForecast() {
    this.oneCallData = [];
    this.currentWeather = [];
    this.hourlyTemperature = [];
    this.dailyTemperature = [];
    this.hourlyChart = [];
    this.dailyChart = [];
    if (this.searchInput && this.searchInput.length >= 2) {
      this.currentWeatherSub$ = this.weatherDetailsService.getCityCurrentWeatherDetails(this.searchInput).subscribe(
        res => {
          this.currentWeather = res;
          this.oneCallDataSub$ = this.weatherDetailsService.getCityHoursWeatherDetails(res.coord.lat, res.coord.lon).subscribe(
            data => {
              this.oneCallData = data;
              this.createHourlyTemperatureChart();
              this.createDailyTemperatureChart();
              this.createCharts();
              this.remember();
            }
          );
        },
        err => {
          console.log(`Can't get weather. Error code: %s, URL: %s`, err.message, err.url);
        }
      );
    }
  }

  remember() {
    this.viewedCity.push(
      {
        id: this.currentWeather.id,
        dt: this.currentWeather.dt,
        city: this.currentWeather.name,
        temp: this.currentWeather.main.temp,
        condition: this.currentWeather.weather[0].description,
        img: `http://openweathermap.org/img/wn/${this.currentWeather.weather[0].icon}@2x.png`
      }
    );

    this.viewedCity = this.viewedCity.filter((elem, index, self) =>
      index === self.findIndex((t) => (
        t.id === elem.id && t.city === elem.city
      ))
    );

    localStorage.setItem('viewedCity', JSON.stringify(this.viewedCity));
    this.viewedCity = JSON.parse(localStorage.getItem('viewedCity'));
  }

  forget(id) {
    this.viewedCity = this.viewedCity.filter(item => item.id !== id);
    localStorage.setItem('viewedCity', JSON.stringify(this.viewedCity));
    this.viewedCity = JSON.parse(localStorage.getItem('viewedCity'));
  }

  createHourlyTemperatureChart() {
    const getTime = date => `${new Date(date).getHours()}:00`;
    this.oneCallData.hourly.slice(0, 24).forEach( item => {
      this.hourlyTemperature.push({ x: getTime(item.dt * 1000), y: item.temp });
    });
  }

  createDailyTemperatureChart() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = date => `${days[new Date(date).getDay()]}, ${new Date(date).getDate()}`;
    this.oneCallData.daily.slice(1, 8).forEach( item => {
      this.dailyTemperature.push({ x: dayName(item.dt * 1000), y: item.temp.day });
    });
  }

  ngOnDestroy(): void {
    if (this.currentWeatherSub$) {
      this.currentWeatherSub$.unsubscribe();
      this.oneCallDataSub$.unsubscribe();
    }
  }



}
