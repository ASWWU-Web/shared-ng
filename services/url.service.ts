// Taken partially from https://stackoverflow.com/questions/51984268/how-to-get-base-url-in-angular-5

import { DOCUMENT, LocationStrategy } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UrlService {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly locationStrategy: LocationStrategy,
  ) {}

  getBaseUrl(): string {
    return (
      this.document.location.origin + this.locationStrategy.getBaseHref()
    ).replace(/\/$/, "");
  }
}
