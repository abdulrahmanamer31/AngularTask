import { Component, OnInit, Input } from '@angular/core';
import { EmployeeServices } from 'src/app/Services/employee-services';
import { FormGroup, FormBuilder, FormControl,ReactiveFormsModule } from '@angular/forms';
import { CityServices } from 'src/app/Services/employee-city';
import { Icity } from 'src/app/Models/icity';
import { Iemployee } from 'src/app/Models/iemployee';
@Component({
  selector: 'app-employee-certain-data',
  templateUrl: './employee-certain-data.component.html',
  styleUrls: ['./employee-certain-data.component.css']
})
export class EmployeeCertainDataComponent implements OnInit {
  @ Input() EmployeeID : number;
  constructor(private employeeservices:EmployeeServices,private City:CityServices,private fb : FormBuilder) { }
  employeesData:FormGroup; 
  ngOnInit(): void {

    this.employeeservices.getEmployee(this.EmployeeID).subscribe((res:Iemployee)=>{
     this.employeesData =this.fb.group({
      employeeName: [res.Name],
      employeeAge: [res.Age],
      employeeCityID:[res.City.id],
      employeeCityName: [undefined],
     })
     
     this.City.getCityData(this.employeesData.value.employeeCityID).subscribe((res:Icity)=>{
      this.employeesData.patchValue({employeeCityName:res.Name})
     })
    } 
    );
  }

}
