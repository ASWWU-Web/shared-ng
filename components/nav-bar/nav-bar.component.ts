import { Component, Input } from '@angular/core';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { SubNavbarLink } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { HermesService } from '../../services/services';

@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: [
    'nav-bar.styles.css',
    'mobile-nav.component.css'
  ]
})

export class NavBarComponent {

  // service items
  subNavbarLinks: SubNavbarLink[] = [];
  showSubNav = true;

  // subscriptions
  subscriptions = {
    subNavbarLinks: null as Subscription,
    showSubNavBarLinks: null as Subscription,
  };

  constructor(private hermesService: HermesService) {
    // subscribe to generate sub-navbar links
    this.subscriptions.subNavbarLinks = this.hermesService.getSubNavbarLinks().subscribe(message => {
      this.subNavbarLinks = message;
    });
    this.subscriptions.showSubNavBarLinks = this.hermesService.getShowSubNav().subscribe(message => {
      this.showSubNav = message;
    });
  }

  links: any = [
    { text: 'Mask', link: '/mask' },
  ];

  public isCollapsed = false;

  public beforeChange($event: NgbNavChangeEvent) {
    if ($event.activeId.startsWith('linkOnly')) {
      $event.preventDefault();
    }
  }


}
