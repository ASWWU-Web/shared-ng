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
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo: User;

  constructor(private rs: RequestService) {
    this.authenticateUser().subscribe();
  }

  private setCurrentUser(user?: User): void {
    if (user) {
      this.userInfo = user;
    } else {
      this.userInfo = null;
    }
  }

  /**
   * sends the request to the server for user information
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
   * adds the side effect of setting the current user variable to the server request for user data.
   * side effects: sets the userInfo in auth.service using the setCurrentUser method
   *               checks for a cookie and if its invalid, or if the server rejects the authentication
   *               userInfo is set to null, again through the setCurrentUser method
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

  public logout(): void {
    document.cookie = 'token=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.userInfo = null;
  }

  /**
   * temporary function, this should be replaced with a subject to be subscribed to
   * just adding it so that we can keep userInfo as a private variable
   */
  public isLoggedIn(): boolean {
    let isLoggedIn = false;
    if (this.userInfo) {
      isLoggedIn = true;
    }
    return isLoggedIn;
  }

  public getUserInfo(): User {
    return this.userInfo;
  }
}
