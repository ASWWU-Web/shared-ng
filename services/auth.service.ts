/*
 * Created by: Stephen Ermshar and Sheldon Woodward
 * Date: 2018-2019
 *
 * Note: Based on http://jasonwatmore.com/post/2018/10/29/angular-7-user-registration-and-login-example-tutorial#authentication-service-ts
 * and the old request service originally copied from the pages project and reworked from Ryan Rabello's implementation.
 */

import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { SAML_LOGIN_URL, SAML_URL } from '../../shared-ng/config';
import { User } from '../interfaces/interfaces';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private userInfo: User;
  private userInfoSubject: BehaviorSubject<User>;
  private user: User;

  constructor(private rs: RequestService) {
    this.userInfoSubject = new BehaviorSubject<User>(null);
    this.user = null;
    this.authenticateUser().subscribe();
  }

  /**
   * pushes a new User value to the userInfoSubject.
   * @param user a User object to broadcast to all getUserInfo() subscribers
   */
  sendUserInfo(user: User) {
    this.user = user;
    this.userInfoSubject.next(user);
  }

  /**
   * Returns an observable of a Subject.
   */
  public getUserInfo(): Observable<User> {
    return this.userInfoSubject.asObservable();
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
          throw err;
        }
      })
    );
  }

  /**
   * Send a request to the server to verify the current user.
   * Sets user information and handles the aswwu cookie.
   * if the loggedin cookie is not set no request is made
   * Returns an observable with user information, or a null
   * observable if there's no loggedin cookie.
   */
  public authenticateUser(): Observable<User> {
    return this.readVerify().pipe(
      tap((data: User | null) => {
        this.sendUserInfo(data);
      })
    );
  }

  /**
   * Invalidates the cookie and removes current user information from
   * the auth service.
   */
  public logout(): void {
    // TODO: begin saml logout workflow
    this.sendUserInfo(null);
    document.location.href = this.buildLogoutLink();

  }

  /**
   * returns true if the loggedin cookie exists
   */
  public isLoggedIn(): boolean {
    return this.user !== null;
  }

  /**
   * build a link that takes the user to the saml login with a redirect link
   * back to the current page.
   * @param redirectPathname optional: if set will cause saml to redirect back to a different page instead of the current page after authentication.
   */
  public buildLoginLink(redirectPathname?: string): string {
    return SAML_LOGIN_URL + (redirectPathname || window.location.pathname);
  }

  public buildLogoutLink() {
    // TODO: do the logout workflow
    return SAML_URL + '/?slo';
  }
}
