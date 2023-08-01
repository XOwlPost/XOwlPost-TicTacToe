import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { PlaybackService } from './playback.service';

@Component({
  selector: 'app-spotify',
  template: `
    <input type="text" [(ngModel)]="trackId" placeholder="Enter Track ID">
    <button (click)="playTrack()">Play Track</button>
    <button (click)="pausePlayback()">Pause</button>
    <button (click)="skipToNextTrack()">Next Track</button>
    <button (click)="skipToPreviousTrack()">Previous Track</button>
    <input type="number" [(ngModel)]="volume" placeholder="Volume">
    <button (click)="setVolume()">Set Volume</button>
  `,
})
export class SpotifyComponent {
  trackId: string;
  volume: number;

  private playbackEndpoint = 'https://api.spotify.com/v1/me/player';

  constructor(private http: HttpClient) {}

  playTrack(): void {
    if (this.trackId) {
      const url = `${this.playbackEndpoint}/play`;
      const body = {
        uris: [`spotify:track:${this.trackId}`],
      };
      this.http.put(url, body).subscribe();
    }
  }

  pausePlayback(): void {
    const url = `${this.playbackEndpoint}/pause`;
    this.http.put(url, null).subscribe();
  }

  skipToNextTrack(): void {
    const url = `${this.playbackEndpoint}/next`;
    this.http.post(url, null).subscribe();
  }

  skipToPreviousTrack(): void {
    const url = `${this.playbackEndpoint}/previous`;
    this.http.post(url, null).subscribe();
  }

  setVolume(): void {
    const url = `${this.playbackEndpoint}/volume?volume_percent=${this.volume}`;
    this.http.put(url, null).subscribe();
  }
}
