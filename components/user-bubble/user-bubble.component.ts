// originally copied from pages

/**
 * Created by ethan on 3/7/17.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UrlService } from '../../services/services';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { MEDIA_SM, DEFAULT_PHOTO, CURRENT_YEAR } from '../../config';
import { User } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
   selector: 'user-bubble',
  templateUrl: 'user-bubble.component.html',
  styleUrls: ['user-bubble.component.css'],
})

export class UserBubbleComponent implements OnInit, OnDestroy {
  base_url: string;
  current_year = CURRENT_YEAR;
  profile: User;
  router: Router;
  UserInfoSubscription: Subscription;
  buildLoginLink: () => string;

  constructor(private authService: AuthService, private _router: Router, private urlService: UrlService) {
    this.buildLoginLink = authService.buildLoginLink;
    this.router = _router;
    this.UserInfoSubscription = authService.getUserInfo().subscribe(
      (data: User) => {
        this.profile = data;
      });
    this.base_url = urlService.getBaseUrl();

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
      if (url === DEFAULT_PHOTO) return DEFAULT_PHOTO;
      return MEDIA_SM + '/' + url;
    } else {
      return DEFAULT_PHOTO;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
