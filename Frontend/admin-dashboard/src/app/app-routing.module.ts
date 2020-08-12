import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './courses/list/list.component';
import { AddCourseComponent } from './courses/add/add.component';
import { UpdateComponent } from './courses/update/update.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './admin/list/list.component';
import { AddComponent } from './admin/add/add.component';
import { AddCategoryComponent } from './categoriess/add/add.component';
import { ListCategoriesComponent } from './categoriess/list/list.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { DetailsComponent } from './courses/details/details.component';
import { UpdateCategoryComponent } from './categoriess/update/update.component';

const routes: Routes = [
  { path: 'courses', redirectTo: 'courses/list', pathMatch: 'full' },
  {
    path: 'courses/list',
    component: CourseListComponent,
    canActivate: [AuthGuard],
  },

  // { path: 'courses/details/:courseId', component: DetailsComponent },
  {
    path: 'courses/create',
    component: AddCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/update/:courseId',
    component: UpdateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories/update/:catId',
    component: UpdateCategoryComponent,
    canActivate: [AuthGuard],
  },

  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'users/list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'admin/add', component: AddComponent, canActivate: [AuthGuard] },
  {
    path: 'categories/add',
    component: AddCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories/list',
    component: ListCategoriesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/details/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories/course/:catId',
    component: CourseListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
