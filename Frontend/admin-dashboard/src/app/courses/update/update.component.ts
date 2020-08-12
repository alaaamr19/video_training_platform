import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  requirePoints = '';
  requireName = '';
  message = '';
  categories;
  course: Course = {
    _id: '',
    name: '',
    description: '',
    points: 0,
    categories: [],
  };
  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  cancel() {
    this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('courseId');
      if (id) {
        this.courseService.getById(id).subscribe((course: Course) => {
          this.course = course;
        });
      }
    });
  }
  getAllCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });
  }

  isSelected(category) {
    this.categories.forEach((element) => {
      if (category == element) {
        return true;
      }
    });
  }
  Update() {
    if (!this.course.points) {
      this.requirePoints = 'This feild is required';
    } else if (!this.course.name) {
      this.requireName = 'This feild is required';
    } else {
      console.log(this.course);

      this.courseService.update(this.course._id, this.course).subscribe(
        (data) => {
          console.log('alaa', data);

          this.router.navigate(['../../list'], {
            relativeTo: this.activatedRoute,
          });
        },
        (error) => {
          this.message = 'Somthing went wrong';
        }
      );
    }

    console.log(this.course);
  }
}
