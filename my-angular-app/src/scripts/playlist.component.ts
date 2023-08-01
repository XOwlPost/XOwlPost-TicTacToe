// Function to create a new playlist
createPlaylist(name: string): Observable<any> {
    const url = 'https://api.spotify.com/v1/playlists';
    const body = {
      name: name
    };
    return this.http.post(url, body);
  }
  
  // Function to add tracks to a playlist
  addTracksToPlaylist(playlistId: string, trackIds: string[]): Observable<any> {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const body = {
      uris: trackIds
    };
    return this.http.post(url, body);
  }
  
  // Function to remove tracks from a playlist
  removeTracksFromPlaylist(playlistId: string, trackIds: string[]): Observable<any> {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const body = {
      tracks: trackIds.map(trackId => ({ uri: `spotify:track:${trackId}` }))
    };
    return this.http.delete(url, { body });
  }
  
  // Function to reorder tracks within a playlist
  reorderPlaylistTracks(playlistId: string, trackIds: string[], startIndex: number, endIndex: number): Observable<any> {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const rangeStart = Math.min(startIndex, endIndex);
    const rangeLength = Math.abs(endIndex - startIndex) + 1;
    const snapshotId = 'your-snapshot-id'; // You may need to provide a valid snapshot ID for reordering
    const body = {
      range_start: rangeStart,
      insert_before: endIndex,
      range_length: rangeLength,
      snapshot_id: snapshotId
    };
    return this.http.put(url, body);
  }
  
  // Function to retrieve playlist details
  getPlaylistDetails(playlistId: string): Observable<any> {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
    return this.http.get(url);
  }
  