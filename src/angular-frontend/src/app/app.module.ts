import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageModule } from './modules/homepage/homepage.module';
import { SignupModule } from './modules/signup/signup.module';
import { UserpageModule } from './modules/userpage/userpage.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginModule } from './modules/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material/material.module';
import { ClassroomCreationModule } from './modules/classroom-creation/classroom-creation.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomepageModule,
    UserpageModule,
    SignupModule,
    HttpClientModule,
    LoginModule,
    BrowserAnimationsModule,
    MaterialModule,
    ClassroomCreationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
