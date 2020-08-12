import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  message = '';
  category: Category = {
    _id: '',
    name: '',
  };
  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  cancel() {
    this.router.navigate(['/categories/list']);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('catId');
      if (id) {
        this.categoryService.getById(id).subscribe((category: Category) => {
          this.category = category;
        });
      }
    });
  }
  Update() {
    if (!this.category.name) {
      this.message = 'This feild is required';
    } else {
      this.categoryService.update(this.category._id, this.category).subscribe(
        (data) => {
          this.router.navigate(['/categories/list'], {
            relativeTo: this.activatedRoute,
          });
        },
        (error) => {
          this.message = 'Somthing went wrong';
        }
      );
    }
  }
}
