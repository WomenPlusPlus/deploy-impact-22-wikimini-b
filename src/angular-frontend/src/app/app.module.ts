import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageModule } from '../modules/homepage/homepage.module';
import { UserpageModule } from '../modules/userpage/userpage.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomepageModule,
    UserpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
