import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HeaderButton } from 'src/shared-ng/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HermesService {
  // http://jasonwatmore.com/post/2018/06/25/angular-6-communicating-between-components-with-observable-subject

  private headerTitleSubject: BehaviorSubject<string>;
  private headerImageUriSubject: BehaviorSubject<string>;
  private headerInvert: BehaviorSubject<boolean>;
  private headerButton: BehaviorSubject<HeaderButton>;

  constructor() {
    this.headerTitleSubject = new BehaviorSubject<string>(null);
    this.headerImageUriSubject = new BehaviorSubject<string>(null);
    this.headerInvert = new BehaviorSubject<boolean>(null);
    this.headerButton = new BehaviorSubject<HeaderButton>(null);
  }

  sendHeaderTitle(title: string) {
    this.headerTitleSubject.next(title);
  }
  getHeaderTitle(): Observable<string> {
    return this.headerTitleSubject.asObservable();
  }

  sendHeaderImageUri(uri: string) {
    this.headerImageUriSubject.next(uri);
  }
  getHeaderImageUri(): Observable<string> {
    return this.headerImageUriSubject.asObservable();
  }

  sendHeaderInvert(invert: boolean) {
    this.headerInvert.next(invert);
  }
  getHeaderInvert(): Observable<boolean> {
    return this.headerInvert.asObservable();
  }

  sendHeaderButton(headerButton: HeaderButton) {
    this.headerButton.next(headerButton);
  }
  getHeaderButton(): Observable<HeaderButton> {
    return this.headerButton.asObservable();
  }
}
