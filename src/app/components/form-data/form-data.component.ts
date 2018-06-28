import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
//import { observable } from 'rxjs/observable';
@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styles: []
})
export class FormDataComponent {

  form:FormGroup;

  constructor() {
    this.form = new FormGroup({
        'nombre': new FormControl('',[
          Validators.required,
          Validators.minLength(5)
        ]),
        'apellido': new FormControl('',[
          Validators.required,
          Validators.minLength(5)
        ]),
        'correo':new FormControl('',[
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
        ]),
        'skills':new FormArray([ //Important
            new FormControl('Correr',Validators.required)
        ]),
        'password':new FormControl('',[
          Validators.required,
        ]),
        'password2':new FormControl(),
        'username':new FormControl('',[
          Validators.required,
          Validators.minLength(3)
        ],this.existsUser)
    });
    this.form.controls['password2'].setValidators([
      Validators.required,
      this.passwordVerify.bind( this.form )
    ]);

    //VERIFICAR QUE CAMPOS ESTAN CAMBIANDO SU DATA
    this.form.valueChanges.subscribe(
        dataChanges=>{
          console.log(dataChanges)
        }
  )

   }
   addSkill()
   {//GENERIC PROGRAM
     (<FormArray>this.form.controls['skills']).push(
        new FormControl('',Validators.required)
   )
  }
//FORMA ASYNCRONA IDEAL PARA PETICIONES A TIEMPO REAL
existsUser(control:FormControl):Promise<any>
{
  let asyncronous = new Promise(
    (resolve,callback)=>{
      setTimeout(  ()=>{
        if(control.value==='carlos')
        {
          resolve( { exist:true } )
        }else{
          resolve( null )
        }
      },1000)
    }
  )
    return asyncronous;
}

  // VALIDATOR PERSONALIZED
  //{ [key:string]:boolean }
  passwordVerify(control:FormControl):{ [key:string]:boolean }
  {
    let form:any = (this);
    if(
      (control.value)!==(form.controls['password'].value))
      {
        return {
          hash:true
        }
      }
      return null;
  }

sendForm()
{
console.log(this.form);
}


}
