import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import {
	animate,
	state,
	style,
	transition,
	trigger
} from '@angular/animations';

@Component({
	selector: 'picture [app-hero-image]',
	templateUrl: './hero-image.component.html',
	styleUrls: ['./hero-image.component.scss'],
	animations: [
		trigger('fadeInOut', [
			state('loading', style({ opacity: 0 })),
			state('loaded', style({ opacity: 1 })),
			transition('loading <=> loaded', [animate('0.2s')])
		])
	]
})
export class HeroImageComponent implements OnInit, OnChanges {
	@Input() defaultImg!: string;
	@Input() desktopImg!: string;
	@Output() imageLoading = new EventEmitter<boolean>();
	@ViewChild('image') image!: ElementRef<HTMLImageElement>;
	_defaultImg = '';
	_desktopImg = '';
	imageChanging = false;

	constructor() {}

	ngOnInit(): void {
		this._defaultImg = this.defaultImg;
		this._desktopImg = this.desktopImg;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (
			(changes.defaultImg.currentValue !== changes.defaultImg.previousValue &&
				!changes.defaultImg.firstChange) ||
			(changes.desktopImg.currentValue !== changes.desktopImg.previousValue &&
				!changes.defaultImg.firstChange)
		) {
			this.imageChanging = true;
			this.imageLoading.emit(true);

			setTimeout(() => {
				this._defaultImg = this.defaultImg;
				this._desktopImg = this.desktopImg;
			}, 200);
		}
	}

	onImageLoaded(): void {
		this.imageChanging = false;
		this.imageLoading.emit(false);
	}
}
