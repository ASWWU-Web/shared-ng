import { Component, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserBubbleComponent } from '../components';

@Component({
	selector: 'nav-bar',
	templateUrl: 'nav-bar.component.html',
	styleUrls: [ 'nav-bar.styles.css']
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

}
