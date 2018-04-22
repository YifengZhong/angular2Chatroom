import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {StompService} from 'ng2-stomp-service';
// use ReactiveFormsModule Only when using Template Driven Forms
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ConnectService } from "./service/connectionSrv";
import { ConnectComponentComponent } from './connect-component/connect-component.component';
import { UserPipePipe } from './user-pipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ConnectComponentComponent,
    UserPipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [ConnectService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
