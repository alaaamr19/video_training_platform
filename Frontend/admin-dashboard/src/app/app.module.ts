import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './admin/list/list.component';
import { AddComponent } from './admin/add/add.component';
import { UpdateComponent } from './courses/update/update.component';
import { CourseListComponent } from './courses/list/list.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCourseComponent } from './courses/add/add.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddCategoryComponent } from './categoriess/add/add.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { ListCategoriesComponent } from './categoriess/list/list.component';
import { DetailsComponent } from './courses/details/details.component';
import { UpdateCategoryComponent } from './categoriess/update/update.component';

@NgModule({
  declarations: [
    CourseListComponent,
    AppComponent,
    LoginComponent,
    ListComponent,
    AddComponent,
    UpdateComponent,
    HomeComponent,
    AddCourseComponent,
    AddCategoryComponent,
    HeaderComponent,
    UsersListComponent,
    ListCategoriesComponent,
    DetailsComponent,
    UpdateCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
