import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PartOneComponent } from './part-one/part-one.component';
import { PartTwoComponent } from './part-two/part-two.component';
import { PartThreeComponent } from './part-three/part-three.component';
import { PartFourComponent } from './part-four/part-four.component';
import { DefaultComponent } from './default/default.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { TexteListComponent } from './part-one/texte-list/texte-list.component';
import { NewTexteComponent } from './part-one/new-texte/new-texte.component';
import { SingleTexteComponent } from './part-one/single-texte/single-texte.component';
import { ModifyTexteComponent } from './part-one/modify-texte/modify-texte.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoginComponent } from './part-three/auth/login/login.component';
import { SignupComponent } from './part-four/auth/signup/signup.component'; /* CORRECTION 26 juin 2019*/
import { NewTexteWithUploadComponent } from './part-four/new-texte-with-upload/new-texte-with-upload.component';
import { ModifyTexteWithUploadComponent } from './part-four/modify-texte-with-upload/modify-texte-with-upload.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';

@NgModule({
    declarations: [
	AppComponent,
	PartOneComponent,
	PartTwoComponent,
	PartThreeComponent,
	PartFourComponent,
	DefaultComponent,
	HeaderComponent,
	TexteListComponent,
	NewTexteComponent,
	SingleTexteComponent,
	ModifyTexteComponent,
	LoginComponent,
	SignupComponent,
	NewTexteWithUploadComponent,
	ModifyTexteWithUploadComponent
    ],
    imports: [
	BrowserModule,
	AppRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	BrowserAnimationsModule,
	MatProgressSpinnerModule,
	HttpClientModule
    ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
    bootstrap: [AppComponent]
})

export class AppModule { }
