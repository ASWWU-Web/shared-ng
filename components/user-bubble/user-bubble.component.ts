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

@Component({
  selector: 'user-bubble',
  template: `<div *ngIf="isLoggedIn" class="contain">
                  <div id="bubble-popup" ngbDropdown placement="bottom-right">
                      <button id="bubbleicon" ngbDropdownToggle>
                          <div *ngIf="(profile?.photo == 'images/mask_unknown.png' || profile?.photo == 'None' || !profile?.photo)" (click)="displayUserOptions()" class="btn btn-default btn-circle">{{profile?.username.charAt(0).toUpperCase()}}</div>
                          <img *ngIf="!(profile?.photo == 'images/mask_unknown.png' || profile?.photo == 'None' || !profile?.photo)" (click)="displayUserOptions()" class="btn btn-default btn-circle" src="{{getPhotoLink(profile.photo)}}">
                      </button>
                      <div ngbDropdownMenu class="dropdown-menu" aria-labelledby="bubbleicon">
                          <a class="btn btn-default dropdown-item" href="https://aswwu.com/mask/profile/{{profile?.username}}">View Profile</a>
                          <a class="btn btn-default dropdown-item" href="https://aswwu.com/mask/update">Update Profile</a>
                          <div class="dropdown-divider"></div>
                          <button class="btn btn-default dropdown-item" (click)="logout()" [routerLink]="'/'">Log Out</button>
                      </div>
                  </div>
             </div>
             <a *ngIf="!isLoggedIn" class="btn btn-primary float-right" [href]="'https://saml.aswwu.com/?redirectURI=/mask'+ router.url">Log in</a>
`,
  styleUrls: ['user-bubble.component.css'],
})

export class UserBubbleComponent implements OnInit {
  profile: User;
  router: any;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private requestService: RequestService, private _router: Router) {
      this.router = _router;
  }

  ngOnInit() {
      this.authService.authenticateUser().subscribe(
        (data) => {
          this.profile = data;
          this.isLoggedIn = this.authService.isLoggedIn();
        },
        (err) => {
          console.log('user-bubble.component>ngOnInit>authenticateUser>error');
        }
      );
  }

  current_year = CURRENT_YEAR;
  // Photourl to link funciton returns proper url and BLANK photo if photo == "None"
  getPhotoLink(url: string){
      if(url && url != 'None'){
          return MEDIA_SM + '/' + url;
      } else {
          return MEDIA_SM + '/' + DEFAULT_PHOTO;
      }
  }

  displayUserOptions():void {
    // TODO: this was commented out all the way back in pages and mask for some reason,
    // wasn't able to find git history where it wasn't commented out, leaving for now...
    // remove in cleanup
      // let popup = document.getElementById("bubble-popup");
      // popup.style.display = popup.style.display == 'none' ? 'block' : 'none';
  }

  logout(): void {
    this.authService.logout();
    this.profile = null;
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
