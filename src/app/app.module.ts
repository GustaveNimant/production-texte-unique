import { MatProgressSpinnerModule } from '@angular/material';

import { CompteInterceptor }     from './interceptors/compte-interceptor';

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

import { ListTexteComponent }             from './part-one/list-texte/list-texte.component';
import { ModifyTexteComponent }           from './part-one/modify-texte/modify-texte.component';
import { NewTexteComponent }              from './part-one/new-texte/new-texte.component';
import { NewTexteVersionComponent }       from './part-one/new-texte-version/new-texte-version.component';
import { SingleTexteComponent }           from './part-one/single-texte/single-texte.component';

import { PartTwoComponent }           from './part-two/part-two.component';
import { SingleParticipantComponent } from './part-two/single-participant/single-participant.component';
import { NewParticipantComponent }    from './part-two/new-participant/new-participant.component';
import { ListParticipantComponent }   from './part-two/list-participant/list-participant.component';

import { PartThreeComponent }       from './part-three/part-three.component';
import { ListButComponent }         from './part-three/list-but/list-but.component';
import { ModifyButComponent }       from './part-three/modify-but/modify-but.component';
import { NewButComponent }          from './part-three/new-but/new-but.component';
import { SingleButComponent }       from './part-three/single-but/single-but.component';

import { PartFourComponent }        from './part-four/part-four.component';
import { ListNotationComponent }    from './part-four/list-notation/list-notation.component';
import { NewNotationComponent }     from './part-four/new-notation/new-notation.component';
import { SingleNotationComponent }  from './part-four/single-notation/single-notation.component';
import { SumNotationComponent }     from './part-four/sum-notation/sum-notation.component';

import { PartFiveComponent }        from './part-five/part-five.component';
import { ListCompteComponent }   from './part-five/list-compte/list-compte.component';
import { NewCompteComponent }    from './part-five/new-compte/new-compte.component';
import { SingleCompteComponent } from './part-five/single-compte/single-compte.component';

import { LoginComponent }           from './login/login.component';
import { IrpProviderComponent }     from './irp-provider/irp-provider.component';
import { IrpProviderResultComponent } from './irp-provider/irp-provider-result/irp-provider-result.component';

@NgModule({
    declarations: [
	AppComponent,
	HeaderComponent,
	IrpProviderComponent,
	ListCompteComponent,
	ListNotationComponent,
	ListParticipantComponent,
	ListTexteComponent,
	LoginComponent,
	MainMenuComponent,
	ModifyTexteComponent,
	NewCompteComponent,
	NewNotationComponent,
	NewParticipantComponent,
	NewTexteComponent,
	PartFiveComponent,
	PartFourComponent,
	PartOneComponent,
	PartThreeComponent,
	PartTwoComponent,
	SingleCompteComponent,
	SingleNotationComponent,
	SingleParticipantComponent,
	SingleTexteComponent,
	NewTexteVersionComponent,
	NewButComponent,
	ModifyButComponent,
	ListButComponent,
	SingleButComponent,
	SumNotationComponent,
	IrpProviderResultComponent,
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
	    useClass: CompteInterceptor,
	    multi: true
	}
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
