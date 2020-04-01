import { Component, OnInit } from '@angular/core';
import { Iemployee } from 'src/app/Models/iemployee';
import { Icity } from 'src/app/Models/icity';
import{FormArray,FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { from, interval, observable, Observable } from 'rxjs';
@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.css']
})
export class ListemployeeComponent implements OnInit {
  employeeForm: FormGroup;
  public showMyMessage = false;
  public showdeleteMessage = false;
  public showrowMyMessage = false;
  EmployeesData:FormArray;
  employee :Iemployee[]=[
    {Id:1, Name: 'Ahmed',Age:18,City:{
      id:1,
      Name:'Madagascar'
    }},
    {Id:2, Name: 'Mohamed',Age:20,City:{
      id:2,
      Name:'Cairo'
    }}
  ]
  city : Icity[]=[
  {id:1,Name:'Madagascar'},
  {id:2,Name:'Cairo'},
  {id:3,Name:'Somal'},
  {id:4,Name:'Cotedivor'},
]
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      EmployeesData: this.fb.array([
      ])
    })
    this.addImportedItem();
  
  }
  importitem():void{
    const maxId = this.EmployeesData.controls.reduce(function (e1, e2) {
      return (e1.value.employeeID > e2.value.employeeID) ? e1 : e2;
    }).value.employeeID;

      let num = maxId + 1;

      this.EmployeesData.push( this.fb.group({
        employeeID:[num,Validators.required],
        employeeName :['',Validators.required],
        employeeAge: ['',Validators.required],
        CityID: [''],
        CityName: ['',Validators.required],
        
    })
    )
    this.showrowMyMessage = true;
    interval(2000).subscribe(()=>{
      this.Disappearaddrow();
    }); 
  }
    addImportedItem():void{
    this.EmployeesData=this.employeeForm.get('EmployeesData') as FormArray;
    this.employee.forEach(s=>{
      this.EmployeesData.push(this.fb.group({
        employeeID :[s.Id,Validators.required],
        employeeName :[s.Name,Validators.required],
        employeeAge: [s.Age,Validators.required],
        CityID: [s.City.id,Validators.required],
        CityName: [s.City.Name,Validators.required],
       }));
   });
  }

  
  MoveToEdit(employeesdata : any){
    
    this.showMyMessage = true;
  
    interval(2000).subscribe(()=>{
      this.Disappear();
    });
   const indexdata= this.EmployeesData.controls.findIndex(e=>e.value.employeeID===employeesdata.value.employeeID);
   this.EmployeesData.controls[indexdata].patchValue({
    employeeID : employeesdata.value.employeeID,
    employeeName :employeesdata.value.employeeName,
    employeeAge: employeesdata.value.employeeAge,
    CityName: employeesdata.value.CityName,
  })
  console.log(this.EmployeesData);
  }
  Disappear(){
    this.showMyMessage=false;
  }
  DisappearDelete(){
this.showdeleteMessage=false;
  }
  Disappearaddrow(){
    this.showrowMyMessage=false;
      }
      
  Removeitem(item : number):void{
   //this.EmployeesData.removeAt(item);
   if(confirm("Are you sure you want to Delete")){
   this.EmployeesData.removeAt(item);
   }
   this.showdeleteMessage = true;
   interval(3000).subscribe(()=>{
     this.DisappearDelete();
   });
  }
}