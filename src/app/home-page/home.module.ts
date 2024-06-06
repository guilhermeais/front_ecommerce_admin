import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {homeRoutes} from "./home.routes";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  exports: [RouterModule]
})
export class HomeModule { }
