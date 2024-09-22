import { Component } from "@angular/core";
import { UrlService } from "src/shared-ng/services/url.service";
import { VersionService } from "src/shared-ng/services/version.service";
@Component({
  selector: "footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  base_url: string;
  version: string;
  constructor(urlService: UrlService, versionService: VersionService) {
    this.base_url = urlService.getBaseUrl();
    this.version = versionService.getVersionString();
  }

  departments = [
    "outdoors",
    "tread-shed",
    "atlas",
    "mountain-ash",
    "photo",
    "video",
    "collegian",
    "web",
    "marketing",
    "global-service",
    "spiritual",
    "social",
    "senate",
    "executive",
  ];

}
