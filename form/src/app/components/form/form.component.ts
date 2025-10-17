import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  passwordsMatch = false;

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    gender: new FormControl('Male'),
    terms: new FormControl(false , [Validators.requiredTrue])
  });

  onSubmit() {
    if(this.userForm.valid && this.passwordsMatch && this.userForm.controls['terms'].value == true){
      console.log(this.userForm.value);
    } else {
      console.log('Form Invalid')
    }
  }

  checkPasswords() {
    if (this.userForm.controls['password'].value == this.userForm.controls['confirmPassword'].value){
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }

  private termsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const response = control.value == true ? undefined : true;
    return response ? {forbiddenName: {value: control.value}} : null;
  };
}

}


