import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ ListemployeeComponent}from './Employee/listemployee/listemployee.component';
import { EmployeeCertainDataComponent } from './Employee/employee-certain-data/employee-certain-data.component';

const routes: Routes = [
  {path: '' ,redirectTo: '/employee' ,pathMatch: 'full'},
  {path: 'employee',component: ListemployeeComponent},
  {path: '**', component: ListemployeeComponent},
  {path: 'employeedata',component: EmployeeCertainDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
