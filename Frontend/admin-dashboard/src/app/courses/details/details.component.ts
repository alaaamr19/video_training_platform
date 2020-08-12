import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  course: Course;
  categories;
  newCats;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.getCourse(id);
    });
  }

  getCourse(id) {
    this.courseService.getById(id).subscribe((data) => {
      this.course = data;
      this.getAllCategories();
    });
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categories = data;
      this.newCats = this.categories.map((cat) => {
        if (this.isSelected(cat)) {
          cat.checked = true;
          return cat;
        }
        cat.checked = false;
        return cat;
      });
      console.log(this.newCats);
    });
  }

  isSelected(category) {
    let currentCats = this.course.categories;
    console.log('lolo', currentCats);

    for (let i = 0; i < currentCats?.length; i++) {
      if (category._id == currentCats[i]._id) {
        return true;
      }
    }
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

  addCategories() {
    let selectedOp = this.getSelectedOptions();
    this.course.categories = selectedOp;
    this.courseService
      .update(this.course._id, this.course)
      .subscribe((data) => {});
  }
}
