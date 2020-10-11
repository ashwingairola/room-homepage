import { DOCUMENT } from '@angular/common';
import {
	Component,
	ElementRef,
	Inject,
	OnDestroy,
	OnInit,
	Renderer2,
	TemplateRef,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import {
	animate,
	state,
	style,
	transition,
	trigger
} from '@angular/animations';
import { TemplatePortal } from '@angular/cdk/portal';
import {
	Overlay,
	OverlayPositionBuilder,
	OverlayRef
} from '@angular/cdk/overlay';
import { fromEvent, noop, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	animations: [
		trigger('fadeIn', [
			state('void', style({ opacity: 0 })),
			state('loaded', style({ opacity: 1 })),
			transition('void <=> loaded', [animate('0.2s')])
		])
	]
})
export class NavbarComponent implements OnInit, OnDestroy {
	@ViewChild('mobileNav') mobileNav!: ElementRef<HTMLDivElement>;
	@ViewChild('desktopNav') desktopNav!: ElementRef<HTMLDivElement>;
	@ViewChild('mobileMenu') mobileMenu!: TemplateRef<HTMLDivElement>;

	showMobileMenu = false;
	overlayRef?: OverlayRef;
	scroll$: Observable<Event> = fromEvent(this.document, 'scroll');
	unsub$: Subject<void> = new Subject();

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private renderer: Renderer2,
		private overlay: Overlay,
		private overlayPositionBuilder: OverlayPositionBuilder,
		private viewContainerRef: ViewContainerRef
	) {}

	ngOnInit(): void {
		const positionStrategy = this.overlayPositionBuilder
			.global()
			.top('0')
			.bottom('0')
			.left('0')
			.right('0');

		this.overlayRef = this.overlay.create({ positionStrategy });

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
		this.overlayRef?.dispose();
	}

	onClickBurger(): void {
		this.showMobileMenu = true;

		const menuPortal = new TemplatePortal(
			this.mobileMenu,
			this.viewContainerRef
		);
		this.overlayRef?.attach(menuPortal);
	}

	onClickClose(): void {
		this.showMobileMenu = false;
		this.overlayRef?.detach();
	}

	onClickBackdrop(event: Event) {
		event.stopPropagation();

		this.showMobileMenu = false;
		this.overlayRef?.detach();
	}
}
