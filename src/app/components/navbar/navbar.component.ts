import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	showMobileMenu = false;

	constructor() {}

	ngOnInit(): void {}

	onClickBurger(): void {
		this.showMobileMenu = true;
	}

	onClickClose(): void {
		this.showMobileMenu = false;
	}
}
