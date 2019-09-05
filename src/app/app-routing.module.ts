import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent }     from './main-menu/main-menu.component';

import { PartOneComponent }               from './part-one/part-one.component';
import { ModifyTexteComponent }           from './part-one/modify-texte/modify-texte.component';
import { ModifyTexteWithImageComponent } from './part-one/modify-texte-with-image/modify-texte-with-image.component';
import { ModifyTexteWithUploadComponent } from './part-one/modify-texte-with-upload/modify-texte-with-upload.component';
import { NewTexteComponent }              from './part-one/new-texte/new-texte.component';
import { NewTexteWithImageComponent }     from './part-one/new-texte-with-image/new-texte-with-image.component';
import { NewTexteWithUploadComponent }    from './part-one/new-texte-with-upload/new-texte-with-upload.component';
import { SingleTexteComponent }           from './part-one/single-texte/single-texte.component';
import { TextesListComponent }            from './part-one/textes-list/textes-list.component';

import { PartTwoComponent }               from './part-two/part-two.component';
import { NewParticipantComponent }        from './part-two/new-participant/new-participant.component';
import { ParticipantsListComponent }      from './part-two/participants-list/participants-list.component';
import { SingleParticipantComponent }     from './part-two/single-participant/single-participant.component';

import { PartThreeComponent }             from './part-three/part-three.component';
//import { NewButComponent }                from './part-three/new-but/new-but.component';
//import { ButsListComponent }              from './part-three/buts-list/buts-list.component';
//import { SingleButComponent }             from './part-three/single-but/single-but.component';

import { PartFourComponent }              from './part-four/part-four.component';
import { NewNotationComponent }           from './part-four/new-notation/new-notation.component';
import { NotationsListComponent }         from './part-four/notations-list/notations-list.component';
import { SingleNotationComponent }        from './part-four/single-notation/single-notation.component';

import { PartFiveComponent }              from './part-five/part-five.component';
import { NewConnexionComponent }          from './part-five/new-connexion/new-connexion.component';
import { ConnexionsListComponent }        from './part-five/connexions-list/connexions-list.component';
import { SingleConnexionComponent }       from './part-five/single-connexion/single-connexion.component';

import { LoginComponent } from './login/login.component';

import { ConnexionGuard }                 from './services/connexion-guard.service';


const routes: Routes = [
    { path: 'part-one', component: PartOneComponent,
      children: [
	  { path: 'new-texte', component: NewTexteComponent},
	  { path: 'new-texte-with-image', component: NewTexteWithImageComponent},
	  { path: 'new-texte-with-upload', component: NewTexteWithUploadComponent},
	  { path: 'un_texte/:id', component: SingleTexteComponent },
	  { path: 'les-textes', component: TextesListComponent },
	  { path: 'modify-texte/:id', component: ModifyTexteComponent },
	  { path: 'modify-texte-with-image/:id', component: ModifyTexteWithImageComponent },
	  { path: 'modify-texte-with-upload/:id', component: ModifyTexteWithUploadComponent },
	  { path: '', pathMatch: 'full', redirectTo: '' },
	  { path: '**', redirectTo: 'les-textes' }
      ]
    },
    { path: 'part-two', component: PartTwoComponent,
      children: [
	  //      { path: 'new-participant', component: NewParticipantComponent, canActivate: [ConnexionGuard] },
	  //	  { path: 'modify-participant/:id', component: ModifyParticipantComponent, canActivate: [ConnexionGuard] },
	  //      { path: 'un_participant/:id', component: SingleParticipantComponent, canActivate: [ConnexionGuard] },
	  { path: 'new-participant', component: NewParticipantComponent},
	  { path: 'un_participant/:id', component: SingleParticipantComponent },
	  { path: 'les-participants', component: ParticipantsListComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'les-participants' },
	  { path: '**', redirectTo: 'les-participants' }
      ]
    },
    { path: 'part-three', component: PartThreeComponent,
      children: [
	  // { path: 'new-but', component: NewButComponent},
	  // { path: 'les-buts', component: ButsListComponent, canActivate: [ConnexionGuard] },
	  // { path: 'un_but/:id', component: SingleButComponent, canActivate: [ConnexionGuard] },
	  // { path: 'modify-but/:id', component: ModifyButComponent, canActivate: [ConnexionGuard] },
	  { path: '', pathMatch: 'full', redirectTo: 'les-buts' },
	  { path: '**', redirectTo: 'les-buts' }
      ]
    },
    { path: 'part-four', component: PartFourComponent,
      children: [
	  { path: 'new-notation', component: NewNotationComponent},
	  { path: 'les-notations', component: NotationsListComponent},
	  { path: 'une_notation/:id', component: SingleNotationComponent},
	  { path: '', pathMatch: 'full', redirectTo: '' }, 
	  { path: '**', redirectTo: 'les-notations' }
      ]
    },
    { path: 'part-five', component: PartFiveComponent,
      children: [
	  { path: 'new-connexion', component: NewConnexionComponent},
	  { path: 'les-connexions', component: ConnexionsListComponent },
	  { path: 'une_connexion/:id', component: SingleConnexionComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'les-connexions' }, 
	  { path: '**', redirectTo: 'les-connexions' }
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'main-menu', component: MainMenuComponent },
    { path: '', pathMatch: 'full', component: MainMenuComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
	RouterModule.forRoot(routes)
    ],
    exports: [
	RouterModule
    ],
    providers: [
	ConnexionGuard
    ]
})
export class AppRoutingModule {}
