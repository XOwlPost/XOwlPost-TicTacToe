import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moduleA from './moduleA';
import { functionB } from './moduleB';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  token: string;
  username: string;
  password: string;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.token = '';
    this.username = '';
    this.password = '';
    this.error = '';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
      // Use the token to call the authenticate endpoint and log the user in
      // ...
    });

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    // Perform authentication check using an API endpoint
    const apiKey = 'pk_live_1E0BC396550D98A2';
    const authEndpoint = `https://api.magic.link/authenticate?token=${this.token}`;

    // Make the HTTP request with the provided credentials and API key
    this.http.post(authEndpoint, {
      username: this.username,
      password: this.password,
      apiKey: apiKey
    }).subscribe(response => {
      // Successful authentication
      console.log('Login successful!');
    }, error => {
      // Failed authentication or other error
      this.error = 'Authentication failed. Please check your credentials and try again.';
      console.error('Login error:', error);
    });
  }
}
