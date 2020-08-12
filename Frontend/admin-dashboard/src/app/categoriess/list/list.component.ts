// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-list',
//   templateUrl: './list.component.html',
//   styleUrls: ['./list.component.css'],
// })
// export class ListCategoriesComponent implements OnInit {
//   constructor() {}

//   ngOnInit(): void {}
// }

import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListCategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private catService: CategoryService) {}

  ngOnInit() {
    this.catService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
  delete(catId: any) {
    this.catService.delete(catId).subscribe((data) => {
      this.categories = this.categories.filter(function (el) {
        return el._id != catId;
      });
    });
  }
}
