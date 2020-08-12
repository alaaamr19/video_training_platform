import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  message = '';
  addAdminForm: FormGroup;
  hide = true;
  constructor(
    private adminService: AdminService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addAdminForm = fb.group({
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
      this.addAdminForm.get(controlName).invalid &&
      this.addAdminForm.get(controlName).touched
    );
  }

  ngOnInit(): void {}
  save() {
    let data = this.addAdminForm.value;
    delete data.password2;
    if (!this.addAdminForm.invalid) {
      this.adminService.create(data).subscribe(
        (data) => {
          this.router.navigate(['./']);
        },
        (error) => (this.message = 'Something went wrong')
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
