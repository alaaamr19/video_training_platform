import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  users: User[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
  disable(userId: any) {
    console.log(userId);
    this.adminService.disable(userId).subscribe((data) => {
      this.users = this.users.filter(function (el) {
        return el._id != userId;
      });
    });
  }
}
