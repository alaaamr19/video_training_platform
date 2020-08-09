import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  courses: Course[] = [];

  constructor(public courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getAll().subscribe((data: Course[]) => {
      console.log(data);
      this.courses = data;
    });
  }
  delete(courseId) {
    this.courseService.delete(courseId);
  }
}
