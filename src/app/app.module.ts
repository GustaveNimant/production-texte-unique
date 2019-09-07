import { MatProgressSpinnerModule } from '@angular/material';

import { ConnexionInterceptor }     from './interceptors/connexion-interceptor';

import { AppRoutingModule }         from './app-routing.module';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule }                         from '@angular/core';



import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HeaderComponent } from './header/header.component';

import { PartOneComponent }               from './part-one/part-one.component';
import { ModifyTexteComponent }           from './part-one/modify-texte/modify-texte.component';
import { NewTexteComponent }              from './part-one/new-texte/new-texte.component';

import { SingleTexteComponent }           from './part-one/single-texte/single-texte.component';
import { ListTexteComponent }             from './part-one/list-texte/list-texte.component';

import { PartTwoComponent }           from './part-two/part-two.component';
import { SingleParticipantComponent } from './part-two/single-participant/single-participant.component';
import { NewParticipantComponent }    from './part-two/new-participant/new-participant.component';
import { ListParticipantComponent }   from './part-two/list-participant/list-participant.component';

import { PartThreeComponent }       from './part-three/part-three.component';

import { PartFourComponent }        from './part-four/part-four.component';
import { NewNotationComponent }     from './part-four/new-notation/new-notation.component';
import { SingleNotationComponent }  from './part-four/single-notation/single-notation.component';
import { ListNotationComponent }    from './part-four/list-notation/list-notation.component';

import { PartFiveComponent }        from './part-five/part-five.component';
import { SingleConnexionComponent } from './part-five/single-connexion/single-connexion.component';
import { NewConnexionComponent }    from './part-five/new-connexion/new-connexion.component';
import { ListConnexionComponent }   from './part-five/list-connexion/list-connexion.component';

import { LoginComponent }           from './login/login.component';


@NgModule({
    declarations: [
	AppComponent,
	HeaderComponent,
	ListConnexionComponent,
	ListNotationComponent,
	ListParticipantComponent,
	ListTexteComponent,
	LoginComponent,
	MainMenuComponent,
	ModifyTexteComponent,
	NewConnexionComponent,
	NewNotationComponent,
	NewParticipantComponent,
	NewTexteComponent,
	PartFiveComponent,
	PartFourComponent,
	PartOneComponent,
	PartThreeComponent,
	PartTwoComponent,
	SingleConnexionComponent,
	SingleNotationComponent,
	SingleParticipantComponent,
	SingleTexteComponent,
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
