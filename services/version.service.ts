import { Injectable } from "@angular/core";
import { VERSION } from "src/shared-ng/environments/version";
import { environment } from "src/shared-ng/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VersionService {
  version = VERSION;
  constructor() {
    console.log("Running", this.getVersionString());
  }

  getVersion() {
    return this.version;
  }

  getVersionString() {
    return `${environment.production ? "prod" : "development"}@${this.version.raw}`;
  }
}
