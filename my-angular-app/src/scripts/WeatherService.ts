import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiKey } from './weather-config';

// Use the apiKey in your code
console.log(apiKey);

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<any> {
    const params = {
      q: 'City, Country', // Replace with the desired city and country
      appid: this.apiKey,
      units: 'metric' // Use 'imperial' for Fahrenheit
    };

    return this.http.get(this.apiUrl, { params });
  }
}
