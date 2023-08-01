import SwaggerUI from 'swagger-ui-dist';
import 'swagger-ui-dist/swagger-ui.css';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: 'my-component.component.html',
  styleUrls: ['my-component.component.css']
})
export class MyComponent implements OnInit {
  ngOnInit(): void {
    SwaggerUI({
      url: './src/app/swagger.yaml',
      dom_id: '#swagger-ui-container' // ID of the container element where Swagger UI should be rendered
    });
  }
}
