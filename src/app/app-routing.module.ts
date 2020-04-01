import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ ListemployeeComponent}from './Employee/listemployee/listemployee.component';

const routes: Routes = [
  {path:'employee',component:ListemployeeComponent},
  {path:'',redirectTo:'employee',pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
