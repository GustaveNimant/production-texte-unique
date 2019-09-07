import { ConnexionInterceptor } from './interceptors/connexion-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatProgressSpinnerModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderComponent } from './header/header.component';

import { PartOneComponent }               from './part-one/part-one.component';
import { ModifyTexteComponent }           from './part-one/modify-texte/modify-texte.component';
import { ModifyTexteWithImageComponent }  from './part-one/modify-texte-with-image/modify-texte-with-image.component';
import { ModifyTexteWithUploadComponent } from './part-one/modify-texte-with-upload/modify-texte-with-upload.component';
import { NewTexteComponent }              from './part-one/new-texte/new-texte.component';
import { NewTexteWithImageComponent }     from './part-one/new-texte-with-image/new-texte-with-image.component';
import { NewTexteWithUploadComponent }    from './part-one/new-texte-with-upload/new-texte-with-upload.component';


import { SingleTexteComponent }           from './part-one/single-texte/single-texte.component';
import { ListTexteComponent }            from './part-one/list-texte/list-texte.component';

import { PartTwoComponent }          from './part-two/part-two.component';

import { SingleParticipantComponent } from './part-two/single-participant/single-participant.component';
import { NewParticipantComponent }    from './part-two/new-participant/new-participant.component';
import { ListParticipantComponent }  from './part-two/list-participant/list-participant.component';

import { PartThreeComponent } from './part-three/part-three.component';
import { PartFourComponent }  from './part-four/part-four.component';
import { PartFiveComponent } from './part-five/part-five.component';
import { SingleConnexionComponent } from './part-five/single-connexion/single-connexion.component';
import { NewConnexionComponent }    from './part-five/new-connexion/new-connexion.component';
import { ListConnexionComponent }  from './part-five/list-connexion/list-connexion.component';
import { LoginComponent } from './login/login.component';
import { NewNotationComponent } from './part-four/new-notation/new-notation.component';
import { SingleNotationComponent } from './part-four/single-notation/single-notation.component';
import { ListNotationComponent } from './part-four/list-notation/list-notation.component';

@NgModule({
    declarations: [
	AppComponent,
	ListConnexionComponent,
	MainMenuComponent,
	HeaderComponent,
	ModifyTexteComponent,
	ModifyTexteWithImageComponent,
	ModifyTexteWithUploadComponent,
	NewConnexionComponent,
	NewParticipantComponent,
	NewTexteComponent,
	NewTexteWithImageComponent,
	NewTexteWithUploadComponent,
	PartFiveComponent,
	PartFourComponent,
	PartOneComponent,
	PartThreeComponent,
	PartTwoComponent,
	ListParticipantComponent,
	SingleConnexionComponent,
	SingleParticipantComponent,
	SingleTexteComponent,
	ListTexteComponent,
	LoginComponent,
	NewNotationComponent,
	SingleNotationComponent,
	ListNotationComponent,
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
    providers: [
	{
	    provide: HTTP_INTERCEPTORS,
	    useClass: ConnexionInterceptor,
	    multi: true
	}
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
