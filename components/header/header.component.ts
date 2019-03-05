import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { HermesService } from 'src/shared-ng/services/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() invertColor: boolean = false;
  @Input() tileImage: string = null;
  @Input() admin: boolean = false;
  @Input() adminLink: string = null;

  title = 'ASWWU';
  headerStyle: Object = {};
  subscriptions = {
    title: <Subscription> null,
    imageUrl: <Subscription> null
  };

  constructor(private hermesService: HermesService) {
    // subscribe to title
    this.subscriptions.title = this.hermesService.getHeaderTitle().subscribe(message => {
      this.title = message;
    });
    // subscribe to imageURL
    this.subscriptions.imageUrl = this.hermesService.getHeaderImageUri().subscribe(message => {
      this.setBackgroundImage(message);
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

  setBackgroundImage(imageUri: string) {
    if (imageUri !== null) {
      this.headerStyle = {
        'background-image': `url(${imageUri})`,
      };
    }
  }
}
