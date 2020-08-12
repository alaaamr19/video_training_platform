import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css'],
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private catService: CategoryService) {}

  ngOnInit() {
    this.catService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
}
