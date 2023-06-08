import { Component } from '@angular/core';
import { PlaybackService } from './playback.service';

@Component({
  selector: 'app-spotify',
  template: `
    <button (click)="playTrack('track_id')">Play Track</button>
    <button (click)="pausePlayback()">Pause</button>
    <button (click)="skipToNextTrack()">Next Track</button>
    <button (click)="skipToPreviousTrack()">Previous Track</button>
    <input type="range" min="0" max="100" [(ngModel)]="volume" (change)="setVolume(volume)">
  `,
})
export class SpotifyComponent {
  volume = 50;

  constructor(private playbackService: PlaybackService) {}

  playTrack(trackId: string): void {
    this.playbackService.playTrack(trackId);
  }

  pausePlayback(): void {
    this.playbackService.pausePlayback();
  }

  skipToNextTrack(): void {
    this.playbackService.skipToNextTrack();
  }

  skipToPreviousTrack(): void {
    this.playbackService.skipToPreviousTrack();
  }

  setVolume(volume: number): void {
    this.playbackService.setVolume(volume);
  }
}
