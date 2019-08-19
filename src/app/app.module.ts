import { AuthInterceptor } from './interceptors/auth-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './header/header.component';
import { ModifyTexteComponent } from './part-one/modify-texte/modify-texte.component';
import { ModifyTexteWithUploadComponent } from './part-four/modify-texte-with-upload/modify-texte-with-upload.component';
import { NewTexteWithUploadComponent } from './part-four/new-texte-with-upload/new-texte-with-upload.component';
import { PartOneComponent } from './part-one/part-one.component';
import { PartThreeComponent } from './part-three/part-three.component';
import { PartTwoComponent } from './part-two/part-two.component';
import { PartFourComponent } from './part-four/part-four.component';

import { LoginComponent } from './part-two/auth/login/login.component';
import { SignupComponent } from './part-two/auth/signup/signup.component';

import { SingleTexteComponent } from './part-one/single-texte/single-texte.component';
import { TextesListComponent } from './part-one/textes-list/textes-list.component';

import { SingleParticipantComponent } from './part-two/single-participant/single-participant.component';
import { NewParticipantComponent } from './part-two/new-participant/new-participant.component';

import { ParticipantsListComponent } from './part-two/participants-list/participants-list.component';

@NgModule({
    declarations: [
	AppComponent,
	PartOneComponent,
	PartTwoComponent,
	PartThreeComponent,
	PartFourComponent,
	DefaultComponent,
	HeaderComponent,
	TextesListComponent,
	ParticipantsListComponent,
	SingleTexteComponent,
	SingleParticipantComponent,
	ModifyTexteComponent,
	LoginComponent,
	SignupComponent,
	NewTexteWithUploadComponent,
	NewParticipantComponent,
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
