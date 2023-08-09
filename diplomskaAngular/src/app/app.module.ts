import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { DataDisplayComponent } from './data-display/data-display.component';
import { StripHtmlTagsPipe } from './strip-html-tags.pipe';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AddDataComponent } from './add-data/add-data.component'; // Import the custom pipe here
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { RecaptchaModule } from 'ng-recaptcha';
import { ImagePopupComponent } from './image-popup/image-popup.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { EditDataComponent } from './edit-data/edit-data.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DataDisplayComponent,
    StripHtmlTagsPipe,
    RegistrationComponent,
    LoginComponent,
    AddDataComponent,
    ImagePopupComponent,
    DeleteConfirmationComponent,
    EditDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    RecaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
