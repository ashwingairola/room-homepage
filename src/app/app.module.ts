import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { HeroItemComponent } from './components/hero-item/hero-item.component';
import { HeroControlsComponent } from './components/hero-controls/hero-controls.component';
import { HeroImageComponent } from './components/hero-image/hero-image.component';

@NgModule({
	declarations: [
		AppComponent,
		HeroComponent,
		HeroItemComponent,
		HeroControlsComponent,
		HeroImageComponent
	],
	imports: [BrowserModule, BrowserAnimationsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
