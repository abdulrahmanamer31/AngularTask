import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListemployeeComponent } from './Employee/listemployee/listemployee.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { EmployeeCertainDataComponent } from './Employee/employee-certain-data/employee-certain-data.component';
import{EmployeeServices}from'./Services/employee-services';
import{CityServices} from './Services/employee-city'
@NgModule({
  declarations: [
    AppComponent,
    ListemployeeComponent,
    EmployeeCertainDataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [EmployeeServices,CityServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
