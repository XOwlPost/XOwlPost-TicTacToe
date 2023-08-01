import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { SpotifyLoginProvider } from 'angularx-social-login';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, IntersectionObserverHooks } from 'ngx-lazy-loading-images';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather.component';
import { LoginComponent } from './login.component';
import { DataService } from './data.service';
import { authConfig } from './oauth.conf';
import { PlayerComponent } from '../app/components/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
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
    SocialLoginModule,
    OAuthModule.forRoot(),
    LazyLoadImageModule.forRoot({
      fallbackImagePath: 'assets/images/fallback-image.jpg',
    })
    // Other required modules
  ],
  providers: [
    DataService,
    {
      provide: SocialAuthServiceConfig,
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: SpotifyLoginProvider.PROVIDER_ID,
            provider: new SpotifyLoginProvider(process.env.SPOTIFY_API_KEY)
          }
        ]
      } as SocialAuthServiceConfig,
    },
    { provide: 'ORIGIN_URL', useValue: window.location.origin },
    { provide: 'AUTH_CONFIG', useValue: authConfig },
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: IntersectionObserverHooks },
  ],
  bootstrap: [AppComponent]
})
export class XowlRewardsModule { }
