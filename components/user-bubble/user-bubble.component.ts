// originally coppied from pages

/**
 * Created by ethan on 3/7/17.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService, AuthService } from '../../services/services';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { MEDIA_SM, DEFAULT_PHOTO, CURRENT_YEAR } from '../../config';
import { User } from 'src/shared-ng/interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-bubble',
  templateUrl: 'user-bubble.component.html',
  styleUrls: ['user-bubble.component.css'],
})

export class UserBubbleComponent implements OnInit {
  current_year = CURRENT_YEAR;
  profile: User;
  router: any;
  UserInfoSubscription: Subscription;
  buildLoginLink: () => string;

  constructor(private authService: AuthService, private requestService: RequestService, private _router: Router) {
    this.buildLoginLink = authService.buildLoginLink;
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

  // Photourl to link funciton returns proper url and BLANK photo if photo == "None"
  getPhotoLink(url: string){
      if(url && url != 'None'){
          return MEDIA_SM + '/' + url;
      } else {
          return MEDIA_SM + '/' + DEFAULT_PHOTO;
      }
  }

  logout(): void {
    this.authService.logout();
  }
}
