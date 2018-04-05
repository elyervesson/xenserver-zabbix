import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const reqHeader = new HttpHeaders({
      'No-Auth': 'True'
    });

    return this.http.post(this.rootUrl + '/auth/register', this.generateUser(user), {headers : reqHeader});
  }

  userAuthentication(email, password) {
      const httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'No-Auth': 'True'
      })
    };

    return this.http.post(this.rootUrl + '/auth/sign-in', 'email=' + email + '&password=' + password, httpOptions);
  }

  updateUser(user: User) {
    return this.http.put(this.rootUrl + '/user/update', this.generateUser(user));
  }

  getUserClaims() {
    return this.http.get(this.rootUrl + '/user/get-user-claims');
  }

  generateUser(user: User) {
    const body: User = {
      userName: user.userName,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    return body;
  }
}
