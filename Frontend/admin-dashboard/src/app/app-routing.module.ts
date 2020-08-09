import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './courses/list/list.component';
import { AddComponent } from './courses/add/add.component';
import { UpdateComponent } from './courses/update/update.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'courses', redirectTo: 'courses/list', pathMatch: 'full' },
  { path: 'courses/list', component: ListComponent },
  // { path: 'courses/details/:courseId', component: DetailsComponent },
  { path: 'courses/create', component: AddComponent },
  { path: 'courses/update/:courseId', component: UpdateComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
