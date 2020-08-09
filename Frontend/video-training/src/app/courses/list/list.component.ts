import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  courses: Course[] = [];

  constructor(public coursesService: CoursesService) {}

  ngOnInit() {
    this.coursesService.getAll().subscribe((data: Course[]) => {
      console.log(data);
      this.courses = data;
    });
  }
  delete(courseId) {
    this.coursesService.delete(courseId);
  }
}
