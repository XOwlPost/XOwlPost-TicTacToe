import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherComponent } from './weather.component';
import { DataService } from './data.service';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    WeatherComponent,
    LoginComponent
    // Other components, directives, or pipes
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    // Other required modules
  ],
  providers: [
    DataService
    // Other services or dependencies
  ],
  bootstrap: [AppComponent]
})
export class WeatherComponent implements OnInit {
    weatherData: any;
    isSunny: boolean = false;
    isStormy: boolean = false;
  
    constructor(private weatherService: WeatherService) {}
  
    ngOnInit(): void {
      this.loading = true;
      this.weatherService.getWeatherData().subscribe(
        (data: any) => {
          this.weatherData = data;
          this.loading = false;
          this.setWeatherConditions();
        },
        (error) => {
          console.error('Error retrieving weather data:', error);
          this.error = true;
          this.loading = false;
        }
      );
    }
  
    private setWeatherConditions(): void {
      // Set the values of isSunny and isStormy based on weatherData
      // Example logic:
      const weatherCondition = this.weatherData.weather[0].main;
      this.isSunny = weatherCondition === 'Clear';
      this.isStormy = weatherCondition === 'Thunderstorm';
    }
  }
  
export class AppModule { }

@Component({
  selector: 'app-weather',
  template: `
    <div *ngIf="weatherData">
      <h2>Current Weather</h2>
      <p>Temperature: {{ weatherData.main.temp }}°C</p>
      <p>Weather: {{ weatherData.weather[0].description }}</p>
    </div>
    <div *ngIf="loading">Loading weather data...</div>
    <div *ngIf="error">Error retrieving weather data.</div>
  `
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  loading: boolean = false;
  error: boolean = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.loading = true;
    this.weatherService.getWeatherData().subscribe(
      (data: any) => {
        this.weatherData = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error retrieving weather data:', error);
        this.error = true;
        this.loading = false;
      }
    );
  }
}
