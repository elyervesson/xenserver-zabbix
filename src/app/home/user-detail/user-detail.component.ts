import { Component, OnInit } from '@angular/core';

import { UserService } from './../../shared/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userClaims: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      this.userClaims.loggedOn = new Date(this.userClaims.iat);
    });
  }
}
