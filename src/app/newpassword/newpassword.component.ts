import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent {

  hide = true;
  type = "password"; 

  hide2 = true;
  type2 = "password";


  // newpasForm !: FormGroup<{ password: FormControl<string | null>; }>;
  // newpasForm !: FormGroup<{ cpassword: FormControl<string | null>; }>;
  toggleVisibility(): void {
    this.hide = !this.hide;
    this.type == "password" ? this.type ="text": this.type = "password"
  }
  
  toggleVisibility2(): void {
    this.hide = !this.hide2;
    this.type2 == "password" ? this.type2 ="text": this.type2 = "password"
  
    // this.show = !this.show;
  } 

  
  newpasForm !: FormGroup;

constructor(private fb:FormBuilder)
{

}

ngOnInit(): void
{
  this.newpasForm=this.fb.group({ 

    password: ['',Validators.required],
    cpassword: ['',Validators.required]  
  })
}
   

  onSubmite(){
    if(this.newpasForm.valid)
      {
        console.log(this.newpasForm.value);
        alert("Form Login successfully.")
        //send data to database
      }
      else
      {
        console.log("form is not valid");
        //throw a error using toaster and with  required fileds
        this.validdateAllFromFileds(this.newpasForm)
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
