import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddCategoryComponent implements OnInit {
  message = '';
  category: Category = {
    _id: '',
    name: '',
  };
  constructor(
    private categoryService: CategoryService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  save() {
    if (!this.isInValid()) {
      console.log(this.category);
      this.categoryService.create(this.category).subscribe((data) => {
        this.router.navigate(['../list'], { relativeTo: this.activateRoute });
      });
    }
  }
  isInValid() {
    return !this.category.name;
  }

  ngOnInit(): void {}
}
