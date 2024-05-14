import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {

 
// --------------LogicforEyeOption---------------

hide = true;
type = "password"; 


toggleVisibility(): void {
  this.hide = !this.hide;
  this.type == "password" ? this.type ="text": this.type = "password"

  // this.show = !this.show;
}   

// -------------LogicforValidation--------------

signForm !: FormGroup;

constructor(private fb:FormBuilder)
{

}

ngOnInit(): void
{
this.signForm=this.fb.group({  
  firstname :['',Validators.required],
  lastname:['',Validators.required],
  email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  username:['',Validators.required],
  password:['',Validators.required],
  cpassword:['',Validators.required],
  
})
}
 

onSubmite(){
  if(this.signForm.valid)
    {
      console.log(this.signForm.value);
      alert("Form Login successfully.")
      //send data to database
    }
    else
    {
      console.log("form is not valid");
      //throw a error using toaster and with  required fileds
      this.validdateAllFromFileds(this.signForm)
      alert("Your form is invalid");
    } 
}


private validdateAllFromFileds(formGroup:FormGroup)
{
  Object.keys(formGroup.controls).forEach(field=>{
    const control = formGroup.get(field);
    if(control instanceof FormControl){
      control.markAsDirty({onlySelf:true});
    }  
    else if(control instanceof FormGroup){
      this.validdateAllFromFileds(control)
    }    
  })
}
}
