import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './modules/homepage/components/homepage/homepage.component';
import { LoginPageComponent } from './modules/login/components/login-page/login-page.component';
import { WrapperComponent } from './modules/signup/components/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: "home",
    component: HomepageComponent
  },
  {
    path: "signup",
    component: WrapperComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
