import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { AuthGuardService } from './middlewares/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'courses', component: CourseListComponent },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
  },
  { path: 'categories', component: CategoriesListComponent },
  { path: 'categories/course/:catId', component: CourseListComponent },
  {
    path: 'myfinishedcourses',
    component: CourseListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'mycourses',
    component: CourseListComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService],
})
export class AppRoutingModule {}
