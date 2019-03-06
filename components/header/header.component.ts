import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HermesService } from 'src/shared-ng/services/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() tileImage: string = null;
  @Input() admin: boolean = false;
  @Input() adminLink: string = null;

  title = 'ASWWU';
  imageUrl: string;
  invert = false;
  headerStyle: Object = {};
  titleStyle: Object = {};
  subscriptions = {
    title: <Subscription> null,
    imageUrl: <Subscription> null,
    invert: <Subscription> null
  };

  constructor(private hermesService: HermesService) {
    // subscribe to title
    this.subscriptions.title = this.hermesService.getHeaderTitle().subscribe(message => {
      this.title = message;
    });
    // subscribe to imageURL
    this.subscriptions.imageUrl = this.hermesService.getHeaderImageUri().subscribe(message => {
      this.imageUrl = message;
      this.setStyle();
    });
    // subscribe to invert
    this.subscriptions.invert = this.hermesService.getHeaderInvert().subscribe(message => {
      this.invert = message;
      this.setStyle();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe from all subjects
    for (const sub of Object.keys(this.subscriptions)) {
      this.subscriptions[sub].unsubscribe();
    }
  }

  setStyle() {
    // image URI
    if (this.imageUrl !== null) {
      this.headerStyle['background-image'] = `url(${this.imageUrl})`;
    } else {
      delete this.headerStyle['background-image'];
    }
    // color inversion
    if (this.invert) {
      this.headerStyle['background-color'] = 'var(--color-aswwu-dark)';
      this.titleStyle['color'] = 'white';
    } else {
      this.headerStyle['background-color'] = 'var(--color-aswwu-light)';
      this.titleStyle['color'] = 'black';
    }
  }
}
