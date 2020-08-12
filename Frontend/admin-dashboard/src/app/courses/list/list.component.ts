import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  pager;
  // pageOfItems=[];

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.route.toString().includes('categories/')) {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('catId');

        this.getByCat(id);
      });
    } else {
      this.route.queryParams.subscribe((data) => this.loadPage(data.page || 1));
    }
  }
  delete(courseId: any) {
    this.courseService.delete(courseId).subscribe((data) => {
      this.courses = this.courses.filter(function (el) {
        return el._id != courseId;
      });
    });
  }

  loadPage(page) {
    this.courseService.getByPage(page).subscribe((data) => {
      this.pager = data['pager'];
      this.courses = data['coursesPage'];
    });
  }

  getByCat(catId) {
    this.categoryService.getCatCourses(catId).subscribe((data) => {
      this.courses = data;
      console.log(this.courses);
    });
  }
}
