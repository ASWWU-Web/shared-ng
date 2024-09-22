import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { HermesService } from "../../services/services";
import { Subscription } from "rxjs";
import { HeaderButton } from "../../interfaces/interfaces";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // styles
  headerStyle: object = {};
  titleStyle: object = {};
  // service items
  title = "ASWWU";
  imageUrl: string;
  invert = false;
  visible = false;
  showButton = false;
  headerButton: HeaderButton = {
    buttonText: null,
    buttonLink: null,
    buttonAdmin: true,
    buttonRouterLink: true,
  };
  // subscriptions
  subscriptions = {
    title: null as Subscription,
    imageUrl: null as Subscription,
    invert: null as Subscription,
    visible: null as Subscription,
    headerButton: null as Subscription,
  };

  constructor(private hermesService: HermesService) {
    // subscribe to title
    this.subscriptions.title = this.hermesService
      .getHeaderTitle()
      .subscribe((message) => {
        this.title = message;
      });
    // subscribe to show button
    this.subscriptions.headerButton = this.hermesService
      .getHeaderButton()
      .subscribe((message) => {
        this.headerButton = message;
        this.showButton = this.checkShowButton();
      });
    // subscribe to imageURL
    this.subscriptions.imageUrl = this.hermesService
      .getHeaderImageUri()
      .subscribe((message) => {
        this.imageUrl = message;
        this.setStyle();
      });
    // subscribe to invert
    this.subscriptions.invert = this.hermesService
      .getHeaderInvert()
      .subscribe((message) => {
        this.invert = message;
        this.setStyle();
      });
    // subscribe to visible
    this.subscriptions.visible = this.hermesService
      .getShowHeader()
      .subscribe((message) => {
        console.log("header visible", message);
        if (message !== null) {
          this.visible = message;
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    // unsubscribe from all subjects
    for (const sub of Object.keys(this.subscriptions)) {
      this.subscriptions[sub].unsubscribe();
    }
  }

  setStyle() {
    // image URI
    if (this.imageUrl !== null) {
      this.headerStyle["background-image"] = `url(${this.imageUrl})`;
    } else {
      delete this.headerStyle["background-image"];
    }
    // color inversion
    if (this.invert) {
      this.headerStyle["background-color"] = "var(--color-aswwu-dark)";
      this.titleStyle["color"] = "white";
    } else {
      this.headerStyle["background-color"] = "var(--color-aswwu-light)";
      this.titleStyle["color"] = "black";
    }
  }

  checkShowButton() {
    if (this.headerButton === null || this.headerButton.buttonText === null) {
      return false;
    } else if (this.headerButton.buttonAdmin) {
      // TODO: GENF-60 use request service to check if admin
      return true;
    }
    return true;
  }
}
