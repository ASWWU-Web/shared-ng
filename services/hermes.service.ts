import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HermesService {
  // http://jasonwatmore.com/post/2018/06/25/angular-6-communicating-between-components-with-observable-subject

  private headerImageUriSubject = new Subject<string>();

  constructor() { }

  sendHeaderImageUri(uri: string) {
    this.headerImageUriSubject.next(uri);
  }

}
