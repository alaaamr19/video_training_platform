import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  score;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserScore();
  }

  isAuth() {
    return this.authService.getToken();
  }

  getUserScore() {
    this.userService
      .getUserData()
      .subscribe((data) => (this.score = data.user.score));
  }

  logout() {
    this.authService.logout();
  }
}
