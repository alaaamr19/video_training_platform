import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  course: Course;
  sucessMessage = '';
  errorMessage = '';
  courseId;
  user;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id');
      this.getCourse(this.courseId);
    });
    if (this.userService.getUser) {
      this.userService.getUserData().subscribe((data) => {
        this.user = data.user;
      });
    }
  }

  getCourse(id) {
    this.courseService.getById(id).subscribe((data) => {
      this.course = data;
    });
  }

  RegInCourse() {
    this.userService.registerInCourse(this.course).subscribe(
      (data) => {
        this.user = data;
        this.sucessMessage = `You resgister to ${this.course.name} course successfully`;
        this.addCoursToUser();
      },
      (error) => {
        this.errorMessage = 'You already registered to this course';
      }
    );
  }

  getUser() {
    return this.userService.getUser();
  }
  addCoursToUser() {
    this.userService.registerInCourse(this.course).subscribe((res) => {});
  }
}
