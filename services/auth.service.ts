/*
 * Created by: Stephen Ermshar and Sheldon Woodward
 * Date: 2018-2019
 *
 * Note: Based on http://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial#authentication-service-ts
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HeaderButton, SubNavbarLink } from 'src/shared-ng/interfaces/interfaces';
import { User } from '../interfaces/interfaces';
import { RequestService } from './request.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo: User;

  constructor(private rs: RequestService) {
    this.authenticateUser();
  }

  private setCurrentUser(user?: User): void {
    if (user) {
      this.userInfo = user;
    } else {
      this.userInfo = null;
    }
  }

  /**
   * Verifies the login status of the current user.
   * Gets current user and sets it to authUser
   * Also returns the user object to the callback function.
   */
  verify(cb ? : any): void {
    // TODO: Determine if the token really should be updated. (ie. Only if the
    // token is older than 1 hour should a new one be generated.)
    if (document.cookie.search('token=') !== -1) {
      this.verifyGet('verify', data => {
        // Log in the user
        const user = data.user || null;
        this.setCurrentUser(user);
        if (typeof cb === 'function') {
          cb(user);
        }
      }, () => {
        // user in not logged in remove authUser.
        this.setCurrentUser();
        if (typeof cb === 'function') {
          cb(null);
        }
      });
    } else {
      this.userInfo = undefined;
      this.isLoggedIn = false;
    }
  }

  buildUser(data: any) {
    if (typeof data == "string") data = JSON.parse(data);
    for (var key in data) this[key] = data[key];
  }

  private readVerify(): Observable<User> {
    return this.rs.get('verify').pipe(
      map((data) => data.user)
    );
  }

  public authenticateUser() {
    this.readVerify().subscribe(
      (data) => {
        this.userInfo = data;
      }, (err) => {

      }, () => {

      }
    );
  }

  public logout() {
    document.cookie='token=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.getElementById('bubble-popup').style.display = 'none';
    this.profile = undefined;
    this.requestService.verify();
    this.isLoggedIn = false;
}

  // /*
  //  * Seperate function to make get requests in the Verify function.
  //  * Use of the normal get function would cause an infinite loop.
  //  */
  // private verifyGet(uri: string, afterRequest, catchError): void {
  //   const req = this.createUri(uri);
  //   const options = this.createOptions();
  //   this.http.get(req, options)
  //     .subscribe(
  //       data => afterRequest(data),
  //       err => (catchError ? catchError(err) : console.error(err))
  //     );
  // }

  // isLoggedOn(): boolean {
  //   // Returns true if authUser is defined, false otherwise.
  //   return this.isLoggedIn;
  // }
}
