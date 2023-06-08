import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://accounts.spotify.com',
  redirectUri: window.location.origin + '/callback',
  clientId: process.env.SPOTIFY_API_KEY,
  scope: 'user-read-private user-read-email',
  responseType: 'code',
  requireHttps: true,
};
