import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as dotenv from 'dotenv';

dotenv.config();

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string;
  searchResults: any[];

  constructor(private http: HttpClient) { }

  search(): void {
    const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

    this.http.get<any>('https://api.spotify.com/v1/search', {
      params: {
        q: this.searchQuery,
        type: 'track'
      },
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).subscribe(response => {
      this.searchResults = response.tracks.items;
    });
  }
}
