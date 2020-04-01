import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ ListemployeeComponent}from './Employee/listemployee/listemployee.component';

const routes: Routes = [
  {path:'',component:ListemployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
