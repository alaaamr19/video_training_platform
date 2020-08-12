import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  message = '';
  registerForm: FormGroup;
  hide = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = fb.group({
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

  isInValid(controlName) {
    return (
      this.registerForm.get(controlName).invalid &&
      this.registerForm.get(controlName).touched
    );
  }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/']);
    }
  }
  register() {
    let data = this.registerForm.value;
    delete data.password2;
    if (!this.registerForm.invalid) {
      this.authService.register(data).subscribe(
        (data) => {
          this.authService.setToken(data);
          this.router.navigate(['./']);
        },
        (error) => (this.message = 'Something went wrong please try again')
      );
    }
  }
  cancel() {
    this.router.navigate(['/']);
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
}
