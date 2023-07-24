import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import { StripHtmlTagsPipe } from './strip-html-tags.pipe'; // Import the custom pipe here

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DataDisplayComponent,
    StripHtmlTagsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
