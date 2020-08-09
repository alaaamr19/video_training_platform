import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: 'courses', redirectTo: 'courses/list', pathMatch: 'full' },
  { path: 'courses/list', component: ListComponent },
  { path: 'courses/details/:courseId', component: DetailsComponent },
  { path: 'courses/create', component: CreateComponent },
  { path: 'courses/update/:courseId', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
