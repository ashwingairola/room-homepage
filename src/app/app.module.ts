import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { HeroItemComponent } from './components/hero-item/hero-item.component';
import { HeroControlsComponent } from './components/hero-controls/hero-controls.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
	declarations: [
		AppComponent,
		HeroComponent,
		HeroItemComponent,
		HeroControlsComponent,
		HeroImageComponent,
		AboutComponent,
		NavbarComponent
	],
	imports: [BrowserModule, BrowserAnimationsModule, OverlayModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
