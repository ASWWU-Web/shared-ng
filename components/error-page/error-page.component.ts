import { Component, ElementRef, OnInit } from "@angular/core";
import { HermesService } from "../../../shared-ng/services/services";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.css"],
})
export class ErrorPageComponent implements OnInit {
  constructor(
    private hermesService: HermesService,
    private elementRef: ElementRef,
  ) {
    // sets background color
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      "white";
    // hides header and subnav bar
    hermesService.sendShowHeader(false);
    hermesService.sendShowSubNav(false);
  }

  ngOnInit() {}
}
