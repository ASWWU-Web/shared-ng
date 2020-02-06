// tslint:disable:indent
// tslint:disable:component-selector
// tslint:disable:no-angle-bracket-type-assertion
import { Component, Input } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
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
		subNavbarLinks: <Subscription> null,
		showSubNavBarLinks: <Subscription> null,
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
		{ text: 'Mask',        link: 'https://aswwu.com/mask' },
		{ text: 'Jobs',        link: 'https://aswwu.com/jobs' },
		{ text: 'Upcoming',   link: 'https://aswwu.com/#upcoming' },
		{ text: 'Departments', link: null, dropdownLinks: [
			{ text: 'Administration', 		link: 'https://aswwu.com/pages/administration' },
			{ text: 'Atlas',          		link: 'https://aswwu.com/atlas' },
			{ text: 'Collegian',          	link: 'https://www.aswwucollegian.com/' },
			{ text: 'Diversity & Wellness',	link: 'https://aswwu.com/pages/diversity-wellness'},
			{ text: 'Global Service',       link: 'https://aswwu.com/pages/globalservice' },
			{ text: 'Mountain Rents',       link: 'https://aswwu.com/pages/mt-rents' },
			{ text: 'Outdoors',          	link: 'https://aswwu.com/pages/outdoors' },
      { text: 'Photo',          		link: 'https://aswwu.com/pages/photo' },
      { text: 'Productions',          		link: 'https://aswwu.com/pages/aswwu-productions' },
			{ text: 'Senate',          		link: 'https://aswwu.com/pages/senate' },
			{ text: 'Social',          		link: 'https://aswwu.com/pages/social' },
			{ text: 'Tread Shed',          	link: 'https://aswwu.com/pages/treadshed' },
			{ text: 'Video',          		link: 'https://aswwu.com/pages/video' },
		]},
		{ text: 'More', link: null, dropdownLinks: [
			{ text: 'D2L',   			link: 'https://class.wallawalla.edu/' },
			{ text: 'MyWWU', 			link: 'https://mywwu.wallawalla.edu/' },
			{ text: 'Office 365 Email', link: 'https://office365.wallawalla.edu/' },
			{ text: 'WWU Homepage', 	link: 'https://wallawalla.edu/' },
			{ text: 'Library Homepage', link: 'https://www.wallawalla.edu/academics/libraries/' }
		]},
	];

	public isCollapsed = false;

	public beforeChange($event: NgbPanelChangeEvent) {
		if ($event.panelId.startsWith('linkOnly')) {
		  $event.preventDefault();
		}
		}


}
