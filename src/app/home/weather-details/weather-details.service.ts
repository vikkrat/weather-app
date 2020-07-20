import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherDetailsService {
  private currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private currentWeatherURLSuffix = '&units=metric&APPID=5451f825e0535e8fd12cf3c44859ceb5';

  private hourlyWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?';
  private hourlyWeatherURLSuffix = '&units=metric&appid=5451f825e0535e8fd12cf3c44859ceb5';

  constructor(private http: HttpClient) { }

  getCityCurrentWeatherDetails(city: string): Observable<any> {
    return this.http.get(this.currentWeatherURL + city + this.currentWeatherURLSuffix)
      .pipe(catchError(err => {
          if (err.status === 404) {
            console.log(`City ${city} not found`);
            return EMPTY;
          }
        })
      );
  }

  getCityHoursWeatherDetails(lat, lon): Observable<any> {
    return this.http.get(`${this.hourlyWeatherURL}lat=${lat}&lon=${lon}&exclude=current,minutely${this.hourlyWeatherURLSuffix}`)
      .pipe(catchError(err => {
          if (err.status === 404) {
            console.log(`City not found`);
            return EMPTY;
          }
        })
      );
  }

}
