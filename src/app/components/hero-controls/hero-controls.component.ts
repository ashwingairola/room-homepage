import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-hero-controls',
	templateUrl: './hero-controls.component.html',
	styleUrls: ['./hero-controls.component.scss']
})
export class HeroControlsComponent implements OnInit {
	@Input() disableLeft!: boolean;
	@Input() disableRight!: boolean;
	@Output() navigateLeft = new EventEmitter<void>();
	@Output() navigateRight = new EventEmitter<void>();

	constructor() {}

	ngOnInit(): void {}

	onNavigateLeft(): void {
		this.navigateLeft.emit();
	}

	onNavigateRight(): void {
		this.navigateRight.emit();
	}
}
