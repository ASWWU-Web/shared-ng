// originally copied from pages

/**
 * Created by ethan on 3/7/17.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/services';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { MEDIA_SM, DEFAULT_PHOTO, CURRENT_YEAR } from '../../config';
import { User } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'user-bubble',
  templateUrl: 'user-bubble.component.html',
  styleUrls: ['user-bubble.component.css'],
})

export class UserBubbleComponent implements OnInit, OnDestroy {
  current_year = CURRENT_YEAR;
  profile: User;
  router: any;
  UserInfoSubscription: Subscription;
  buildLoginLink: () => string;
  buildLogoutLink: () => string;

  constructor(private authService: AuthService, private _router: Router) {
    this.buildLoginLink = authService.buildLoginLink;
    this.buildLogoutLink = authService.buildLogoutLink;
    this.router = _router;
    this.UserInfoSubscription = authService.getUserInfo().subscribe(
      (data: User) => {
        this.profile = data;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe from all subjects
    this.UserInfoSubscription.unsubscribe();
  }

  // Photo url to link function returns proper url and BLANK photo if photo == "None"
  getPhotoLink(url: string) {
      if (url && url !== 'None') {
          return MEDIA_SM + '/' + url;
      } else {
          return MEDIA_SM + '/' + DEFAULT_PHOTO;
      }
  }

  logout() {
      this.authService.logout();
      let string = this.buildLogoutLink();
      console.log(string);
      window.location.href = string;
  }
}
