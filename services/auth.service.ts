/*
 * Created by: Stephen Ermshar and Sheldon Woodward
 * Date: 2018-2019
 *
 * Note: Based on http://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial#authentication-service-ts
 * and the old request service originally copied from the pages project and reworked from Ryan Rabello's implementation.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HeaderButton, SubNavbarLink } from 'src/shared-ng/interfaces/interfaces';
import { User } from '../interfaces/interfaces';
import { RequestService } from './request.service';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo: User;

  constructor(private rs: RequestService) {
    this.authenticateUser().subscribe();
  }

  /**
   * Handles setting the userInfo variable. call without argument to remove
   * saved user information.
   * @param user optional User object to set current user with.
   */
  private setCurrentUser(user?: User): void {
    if (user) {
      this.userInfo = user;
    } else {
      this.userInfo = null;
    }
  }

  /**
   * sends the request to the server for user information.
   * 401 errors will be caught and pass a null value down the pipe,
   * other errors will be re-thrown.
   */
  private readVerify(): Observable<User> {
    return this.rs.get('verify').pipe(
      map((data) => {
        return data.user;
      }),
      catchError((err) => {
        if (err.status === 401) {
          return of(null);
        } else {
          return throwError(err);
        }
      })
    );
  }

  /**
   * Send a request to the server to verify the current user.
   * Sets user information and handles the aswwu cookie.
   * Returns an observable with user information.
   */
  public authenticateUser(): Observable<User> {
    return this.readVerify().pipe(
      tap((data: User) => {
        let user: User = data;
        if (document.cookie.search('token=') === -1) {
          user = null;
        }
        this.setCurrentUser(user);
      })
    );
  }

  /**
   * Invalidates the cookie and removes current user information from
   * the auth service.
   */
  public logout(): void {
    document.cookie = 'token=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setCurrentUser();
  }

  /**
   * indicates whether there is currently userInfo available.
   */
  public isLoggedIn(): boolean {
    // user info should always be managed in conjunction with the cookie if it's being removed
    // and with authentication when it's being added, so we should only need to check whether
    // userInfo is null.
    let isLoggedIn = false;
    if (this.userInfo) {
      isLoggedIn = true;
    }
    return isLoggedIn;
  }

  /**
   * return the userInfo object.
   */
  public getUserInfo(): User {
    return this.userInfo;
  }
}
