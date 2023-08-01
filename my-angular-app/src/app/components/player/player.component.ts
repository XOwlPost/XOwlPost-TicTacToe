import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'path/to/spotify.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  // Other component properties and methods

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    // Component initialization logic
  }

  getTrackAudioFeatures(trackId: string) {
    this.spotifyService.getTrackAudioFeatures(trackId).subscribe(
      (response) => {
        // Handle the response and access the audio features data
        console.log(response);
        // Further processing of the audio features data
      },
      (error) => {
        // Handle error if the request fails
        console.error(error);
      }
    );
  }

  // Other component methods

}

@Injectable()
export class SpotifyService {
  private apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) {}

  getTrackAudioFeatures(trackId: string): Observable<any> {
    const url = `${this.apiUrl}/audio-features/${trackId}`;
    return this.http.get(url);
  }
}
