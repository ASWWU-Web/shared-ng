// originally copied from pages

/**
 * Created by ethan on 3/7/17.
 */
import { Component, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService, UrlService } from "../../services/services";
import { CURRENT_YEAR, DEFAULT_PHOTO, MEDIA_SM } from "../../config";
import { User } from "../../interfaces/interfaces";
import { Subscription } from "rxjs";

@Component({
  selector: "user-bubble",
  templateUrl: "user-bubble.component.html",
  styleUrls: ["user-bubble.component.css"],
})
export class UserBubbleComponent implements OnDestroy {
  base_url: string;
  current_year = CURRENT_YEAR;
  profile: User;
  router: Router;
  UserInfoSubscription: Subscription;
  buildLoginLink: () => string;

  constructor(
    private authService: AuthService,
    private _router: Router,
    private urlService: UrlService,
  ) {
    this.buildLoginLink = authService.buildLoginLink;
    this.router = _router;
    this.UserInfoSubscription = authService.getUserInfo().subscribe({
      next: (data: User) => {
        console.log("got update");
        this.profile = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.base_url = urlService.getBaseUrl();
  }

  ngOnDestroy() {
    // unsubscribe from all subjects
    this.UserInfoSubscription.unsubscribe();
  }

  // Photo url to link function returns proper url and BLANK photo if photo == "None"
  getPhotoLink(url: string) {
    if (url && url !== "None") {
      if (url === DEFAULT_PHOTO) return DEFAULT_PHOTO;
      return MEDIA_SM + "/" + url;
    } else {
      return DEFAULT_PHOTO;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
