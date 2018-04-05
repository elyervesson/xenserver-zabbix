import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { User } from './../../shared/models/user.model';
import { UserService } from './../../shared/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userClaims: any;
  user: User;
  fakePassword = '******';

  showDialog: false;

  constructor(private userService: UserService, private toastr: ToastrService) {
    this.user = { userName: '', password: '', email: '', firstName: '', lastName: '' };
  }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.user = {
        userName: data.userName,
        password: this.fakePassword,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      };

      this.userClaims = data;
      this.userClaims.loggedOn = new Date(this.userClaims.iat * 1000);
    });
  }

  OnSubmit(form: NgForm) {
    if (form.value.password == this.fakePassword) {
      delete form.value.password;
    }

    form.value.email = this.user.email;
    this.userService.updateUser(form.value)
      .subscribe((data: any) => {
        this.toastr.success('User updated successfully');
        this.showDialog = false;
      },
        (err: HttpErrorResponse) => {
          this.toastr.error(err.error.message.errmsg);
        });
  }
}
