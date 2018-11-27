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
		{ text: "ASWWU",       link: "https://aswwu.com" }, 
		{ text: "Mask",        link: "https://aswwu.com/mask" }, 
		{ text: "Jobs",        link: "https://aswwu.com/jobs" },
		{ text: "Upcomming",   link: "https://aswwu.com/#upcoming" },
		{ text: "Departments", link: null, dropdownLinks: [
			{ text: "Administration", 		link: "https://aswwu.com/pages/administration" },
			{ text: "Atlas",          		link: "https://aswwu.com/atlas" },
			{ text: "Collegian",          	link: "https://aswwu.com/pages/collegian" },
			{ text: "Global Service",       link: "https://aswwu.com/pages/globalservice" },
			{ text: "Outdoors",          	link: "https://aswwu.com/pages/outdoors" },
			{ text: "Photo",          		link: "https://aswwu.com/pages/photo" },
			{ text: "Senate",          		link: "https://aswwu.com/pages/senate" },
			{ text: "Social",          		link: "https://aswwu.com/pages/social" },
			{ text: "Tread Shed",          	link: "https://aswwu.com/pages/treadshed" },
			{ text: "Video",          		link: "https://aswwu.com/pages/video" },
			{ text: "Diversity & Wellness",	link: "https://aswwu.com/pages/diversity-wellness"}
		]},
		{ text: "More", link: null, dropdownLinks: [
			{ text: "D2L",   			link: "https://class.wallawalla.edu/" },
			{ text: "MyWWU", 			link: "https://mywwu.wallawalla.edu/" },
			{ text: "Office 365 Email", link: "https://office365.wallawalla.edu/" },
			{ text: "WWU Homepage", 	link: "https://wallawalla.edu/" },
			{ text: "Library Homepage", link: "https://www.wallawalla.edu/academics/libraries/" }
		]},
	];

	public isCollapsed = false;

	public beforeChange($event: NgbPanelChangeEvent) {
		if ($event.panelId.startsWith("linkOnly")) {
		  $event.preventDefault();
		}
	  }

}
