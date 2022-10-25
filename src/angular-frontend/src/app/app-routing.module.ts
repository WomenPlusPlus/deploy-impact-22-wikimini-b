import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WrapperComponent } from './modules/signup/components/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: "home",
    component: AppComponent
  },
  {
    path: "signup",
    component: WrapperComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
