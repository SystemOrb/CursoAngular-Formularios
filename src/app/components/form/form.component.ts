import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent {

  profile:Object = {
    nombre:"Carlos",
    apellido:"Estarita",
    correo:"carlos8estarita@hotmail.com"
  }

  constructor() { }

  guardar(form:NgForm)
  {
    console.log(form)
  }


}
