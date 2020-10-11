import { DOCUMENT } from '@angular/common';
import {
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	OnInit,
	Renderer2,
	ViewChild
} from '@angular/core';
import { fromEvent, noop, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
	@ViewChild('mobileNav') mobileNav!: ElementRef<HTMLDivElement>;
	@ViewChild('desktopNav') desktopNav!: ElementRef<HTMLDivElement>;

	showMobileMenu = false;
	darkenNavbar = false;
	scroll$: Observable<Event> = fromEvent(this.document, 'scroll');
	unsub$: Subject<void> = new Subject();

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private renderer: Renderer2
	) {}

	ngOnInit(): void {
		this.scroll$.pipe(takeUntil(this.unsub$)).subscribe(() => {
			if (this.document.documentElement.scrollTop === 0) {
				this.renderer.setStyle(
					this.mobileNav.nativeElement,
					'background-color',
					'transparent'
				);

				this.renderer.setStyle(
					this.desktopNav.nativeElement,
					'background-color',
					'transparent'
				);
			} else {
				this.renderer.setStyle(
					this.mobileNav.nativeElement,
					'background-color',
					'rgba(0, 0, 0, 0.7)'
				);

				this.renderer.setStyle(
					this.desktopNav.nativeElement,
					'background-color',
					'rgba(0, 0, 0, 0.7)'
				);
			}
		}, noop);
	}

	ngOnDestroy(): void {
		this.unsub$.next();
		this.unsub$.complete();
	}

	onClickBurger(): void {
		this.showMobileMenu = true;
	}

	onClickClose(): void {
		this.showMobileMenu = false;
	}
}
