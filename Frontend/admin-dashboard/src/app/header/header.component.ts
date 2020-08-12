import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private authSevice: AuthService) {}

  ngOnInit(): void {}

  getUserName() {
    return this.authSevice.getUser();
  }
  logout() {
    this.authSevice.logout();
  }
}
