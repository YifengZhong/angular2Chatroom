import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h1>IlvCode Chat Room</h1>
        <connect-component></connect-component>
        <hr>
      </div>
    </div>
  </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
