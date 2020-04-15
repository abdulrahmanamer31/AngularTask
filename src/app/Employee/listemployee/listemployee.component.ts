import { Component, OnInit } from '@angular/core';
import { Iemployee } from 'src/app/Models/iemployee';
import { Icity } from 'src/app/Models/icity';
import{FormArray,FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { from, interval, observable, Observable } from 'rxjs';
import { EmployeeServices } from 'src/app/Services/employee-services';
import { CityServices } from 'src/app/Services/employee-city';
import { min } from 'rxjs/operators';
import{EmployeeCertainDataComponent} from '../employee-certain-data/employee-certain-data.component'
@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.css']
})
export class ListemployeeComponent implements OnInit {
  public showinfo=false;
  public showMyMessage = false;
  public showdeleteMessage = false;
  public showrowMyMessage = false;
  public showAddedMessage = false;
  public ShowMoreinfo :number ;
  public NameData : string;
  public Datatransfer : string;
  
  Employee :Iemployee={
id: undefined,
Age:undefined,
Name:undefined,
City: {
  id:undefined,
  Name:undefined
}    
  };
  EmployeesData: FormArray=this.fb.array([]);
  City : [];

  constructor(private fb : FormBuilder,
  private EmployeeService: EmployeeServices,
  private CityService: CityServices,)
  {}
  ngOnInit(): void {
   this.CityService.getCity().subscribe(
     res => this.City = res as []
   );
    this.EmployeeService.getEmployees().subscribe(
      res => {
        if(res == []){
          this.importitem();
        }
        else{
          (res as []) .forEach((EmployeesimportedData : any)=>{
            this.EmployeesData.push(this.fb.group(
              {
                employeeID : [EmployeesimportedData.id],
                employeeName: [EmployeesimportedData.Name,Validators.required],
                employeeAge:[EmployeesimportedData.Age,Validators.required],
                CityID: [EmployeesimportedData.City.id,Validators.required],
                CityName: [EmployeesimportedData.City.Name],
                
              })
            ) 
          })
        }
      }
    )
  }
  importitem():void{
      this.EmployeesData.push( this.fb.group({
        employeeID:[0],
        employeeName :['',Validators.required],
        employeeAge: ['',Validators.required],
        CityID: [0,Validators.min(1)],
        CityName: [''],
        
    })
    )
    this.showrowMyMessage = true;
    interval(2000).subscribe(()=>{
      this.Disappearaddrow();
    }); 
  }
    

  showdetail(item:any, NameInitial :any){
    console.log(item);
    this.ShowMoreinfo=item;
   if( this.showinfo== false){
    this.showinfo=true;
    if(this.Datatransfer==undefined){
    this.Datatransfer=NameInitial;
    }
    else{

    }
 }
   else{
     this.showinfo=false;
   }
  }
  MoveToEdit(Manipulationemployee : FormGroup){
   
  if(Manipulationemployee.value.employeeID==0){
   this.Employee.id=Number.parseInt(Manipulationemployee.value.employeeID);
    this.Employee.Name=Manipulationemployee.value.employeeName;
     this.Employee.Age=Number.parseInt(Manipulationemployee.value.employeeAge);
     this.Employee.City.id=Number.parseInt(Manipulationemployee.value.CityID);
    this.Employee.City.Name=Manipulationemployee.value.CityName;
    this.EmployeeService.addEmployee(this.Employee).subscribe((res:any)=>{
      Manipulationemployee.patchValue({employeeID: res.id});
      this.showAddedMessage = true;
  
      interval(2000).subscribe(()=>{
        this.DisappearEmployee();
      })
    });

  }
  else{
   this.Employee.id= Number.parseInt(Manipulationemployee.value.employeeID);
   this.Employee.Name=Manipulationemployee.value.employeeName;
   this.Employee.Age=Number.parseInt(Manipulationemployee.value.employeeAge);
   this.Employee.City.id=Number.parseInt(Manipulationemployee.value.CityID);
   this.Employee.City.Name=Manipulationemployee.value.CityName;
    
    this.EmployeeService.updateEmployee(this.Employee).subscribe((res:any)=>{
      
    this.showMyMessage = true;
  
    interval(2000).subscribe(()=>{
      this.Disappear();
    });
    })
  }
  
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
      DisappearEmployee(){
        this.showAddedMessage=false;
          }
    
      
  Removeitem(employeeID: number,item : number):void{
   //this.EmployeesData.removeAt(item);
   if(confirm("Are you sure you want to Delete")){
     if(employeeID==0){
   this.EmployeesData.removeAt(item);
     }
   else{ 
   this.EmployeesData.removeAt(item); 
   this.EmployeeService.deleteEmployee(employeeID).subscribe(res=>{
   this.showdeleteMessage = true;
   interval(3000).subscribe(()=>{
     this.DisappearDelete();
   });
   });
   }
   }
 
  }
  GetNameValueChange(valuesetter:string,item:any){
    this.NameData=valuesetter;
    item.patchValue({employeeName:valuesetter});
  }
  setname(item:any) {
    item.controls.employeeName.valueChanges.subscribe((data:any)=>{
      this.Datatransfer=data;
   });

  }
}