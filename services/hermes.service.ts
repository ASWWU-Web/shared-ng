/*
 * Created by: Stephen Ermshar and Sheldon Woodward
 * Date: 2018-2019
 *
 * Note: Based on http://jasonwatmore.com/post/2018/06/25/angular-6-communicating-between-components-with-observable-subject
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HeaderButton, SubNavbarLink } from 'src/shared-ng/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HermesService {
  private headerTitleSubject: BehaviorSubject<string>;
  private headerImageUriSubject: BehaviorSubject<string>;
  private headerInvert: BehaviorSubject<boolean>;
  private headerButton: BehaviorSubject<HeaderButton>;
  private subNavbarLinks: BehaviorSubject<SubNavbarLink[]>;

  constructor() {
    this.headerTitleSubject = new BehaviorSubject<string>(null);
    this.headerImageUriSubject = new BehaviorSubject<string>(null);
    this.headerInvert = new BehaviorSubject<boolean>(null);
    this.headerButton = new BehaviorSubject<HeaderButton>(null);
    this.subNavbarLinks = new BehaviorSubject<SubNavbarLink[]>(null);
  }

  // header title
  sendHeaderTitle(title: string) {
    this.headerTitleSubject.next(title);
  }
  getHeaderTitle(): Observable<string> {
    return this.headerTitleSubject.asObservable();
  }

  // header image
  sendHeaderImageUri(uri: string) {
    this.headerImageUriSubject.next(uri);
  }
  getHeaderImageUri(): Observable<string> {
    return this.headerImageUriSubject.asObservable();
  }

  // header invert
  sendHeaderInvert(invert: boolean) {
    this.headerInvert.next(invert);
  }
  getHeaderInvert(): Observable<boolean> {
    return this.headerInvert.asObservable();
  }

  // header button
  sendHeaderButton(headerButton: HeaderButton) {
    this.headerButton.next(headerButton);
  }
  getHeaderButton(): Observable<HeaderButton> {
    return this.headerButton.asObservable();
  }

  // sub navbar links
  sendSubNavbarLinks(links: SubNavbarLink[]) {
    this.subNavbarLinks.next(links);
  }
  getSubNavbarLinks(): Observable<SubNavbarLink[]> {
    return this.subNavbarLinks.asObservable();
  }
}
