import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from 'src/app/services/course.service';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddCourseComponent implements OnInit {
  message = '';
  categories;
  newCats;
  addCourseForm: FormGroup;
  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {
    this.addCourseForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, [Validators.required]),
      points: new FormControl(null, [
        Validators.pattern(''),
        Validators.required,
      ]),
      categories: new FormControl([this.getAllCategories()]),
    });
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
      this.newCats = this.categories.map((cat) => {
        cat.checked = false;
        return cat;
      });
      console.log(this.newCats);
    });
  }
  getSelectedOptions() {
    return this.newCats
      .filter((opt) => opt.checked)
      .map((ele) => {
        console.log(ele);
        delete ele.checked;
        return ele;
      });
  }

  add() {
    let data = this.addCourseForm.value;
    let selectedOp = this.getSelectedOptions();
    data['categories'] = selectedOp;
    console.log('alaa', data);

    if (!this.addCourseForm.invalid) {
      this.courseService.create(data).subscribe(
        (data) => {
          this.router.navigate(['courses/list']);
        },
        (error) => (this.message = 'Something went wrong')
      );
    }
  }

  cancel() {
    this.router.navigate(['../courses/list'], {
      relativeTo: this.activatedRouter,
    });
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  isInValid(controlName) {
    return (
      this.addCourseForm.get(controlName).invalid &&
      this.addCourseForm.get(controlName).touched
    );
  }
}
