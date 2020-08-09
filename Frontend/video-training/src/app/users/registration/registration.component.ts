import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  RegForm: FormGroup;
  message = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.RegForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
      password2: new FormControl(null, [
        this.passwordValidator,
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {}

  isInValid(controlName) {
    return (
      this.RegForm.get(controlName).invalid &&
      this.RegForm.get(controlName).touched
    );
  }

  passwordValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const confirmPasswordValue = control.value;
      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== confirmPasswordValue || passValue === '') {
          return {
            error: true,
          };
        }
      }
    }
  }

  register() {
    console.log(this.RegForm.value);

    this.authService.register(this.RegForm.value).subscribe(
      (data) => (this.message = 'you registered successfuly'),
      (error) => (this.message = 'Something went wrong')
    );
  }

  loginInstead() {
    this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
  }
}
