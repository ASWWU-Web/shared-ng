import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserBubbleComponent } from '../components';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'nav-bar',
	templateUrl: 'nav-bar.component.html',
	styleUrls: [ 
		'nav-bar.styles.css',
		'mobile-nav.component.css'
	]
})

export class NavBarComponent {

	links: any = [
		{ text: "ASWWU",       link: "/" }, 
		{ text: "Mask",        link: "" }, 
		{ text: "Jobs",        link: "" },
		{ text: "Upcomming",   link: "" },
		{ text: "Departments", link: null, dropdownLinks: [
			{ text: "Administration", link: "" },
			{ text: "Atlas",          link: "" }
		]},
		{ text: "More", link: null, dropdownLinks: [
			{ text: "D2L",   link: "" },
			{ text: "Atlas", link: "" }
		]},
	];

	public isCollapsed = false;

	public beforeChange($event: NgbPanelChangeEvent) {
		if ($event.panelId.startsWith("linkOnly")) {
		  $event.preventDefault();
		}
	  }

}
