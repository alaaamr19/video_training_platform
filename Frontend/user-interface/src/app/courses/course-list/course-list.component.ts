import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  pager;
  // pageOfItems=[];

  constructor(
    private courseService: CourseService,
    private categoryService: CategoryService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let activateRoute = this.route.toString();
    console.log(activateRoute);

    if (activateRoute.includes('categories/')) {
      this.route.paramMap.subscribe((params) => {
        const id = params.get('catId');
        this.getByCat(id);
      });
    } else if (activateRoute.includes("'mycourses")) {
      this.getUserCourses();
    } else if (activateRoute.includes("'myfinishedcourses")) {
      this.getFinishedCourses();
    } else {
      this.route.queryParams.subscribe((data) => this.loadPage(data.page || 1));
    }
  }

  loadPage(page) {
    this.courseService.getByPage(page).subscribe((data) => {
      console.log(data);
      this.pager = data['pager'];
      this.courses = data['coursesPage'];

      console.log(this.courses);
    });
  }

  getByCat(catId) {
    this.categoryService.getById(catId).subscribe((data) => {
      console.log(data);
      this.courses = data;
      console.log(this.courses);
    });
  }
  getUserCourses() {
    this.userService.getUserData().subscribe((data) => {
      this.courses = data.user.courses;
      this.courses.forEach((course) => {
        course['Reg'] = true;
      });
      console.log('mycourse', this.courses);
    });
  }
  getFinishedCourses() {
    this.userService.getUserData().subscribe((data) => {
      this.courses = data.user.finishedCourses;
      this.courses.forEach((course) => {
        course['finish'] = true;
      });
    });
  }

  finish(courseId) {
    this.userService.finishCourse(courseId).subscribe((data) => {
      console.log(data);
    });
  }
}
