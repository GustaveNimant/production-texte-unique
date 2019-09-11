import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainMenuComponent }     from './main-menu/main-menu.component';

import { PartOneComponent }               from './part-one/part-one.component';
import { ListTexteComponent }             from './part-one/list-texte/list-texte.component';
import { ModifyTexteComponent }           from './part-one/modify-texte/modify-texte.component';
import { NewTexteComponent }              from './part-one/new-texte/new-texte.component';
import { NewTexteVersionComponent }       from './part-one/new-texte-version/new-texte-version.component';
import { SingleTexteComponent }           from './part-one/single-texte/single-texte.component';

import { PartTwoComponent }               from './part-two/part-two.component';
import { ListParticipantComponent }       from './part-two/list-participant/list-participant.component';
import { NewParticipantComponent }        from './part-two/new-participant/new-participant.component';
import { SingleParticipantComponent }     from './part-two/single-participant/single-participant.component';

import { PartThreeComponent }             from './part-three/part-three.component';
import { ListButComponent }               from './part-three/list-but/list-but.component';
import { ModifyButComponent }             from './part-three/modify-but/modify-but.component';
import { NewButComponent }                from './part-three/new-but/new-but.component';
import { SingleButComponent }             from './part-three/single-but/single-but.component';

import { PartFourComponent }              from './part-four/part-four.component';
import { ListNotationComponent }          from './part-four/list-notation/list-notation.component';
import { NewNotationComponent }           from './part-four/new-notation/new-notation.component';
import { SingleNotationComponent }        from './part-four/single-notation/single-notation.component';
import { SumNotationComponent }           from './part-four/sum-notation/sum-notation.component';

import { PartFiveComponent }              from './part-five/part-five.component';
import { ListConnexionComponent }         from './part-five/list-connexion/list-connexion.component';
import { NewConnexionComponent }          from './part-five/new-connexion/new-connexion.component';
import { SingleConnexionComponent }       from './part-five/single-connexion/single-connexion.component';

import { LoginComponent } from './login/login.component';

import { ConnexionGuard }                 from './services/connexion-guard.service';


const routes: Routes = [
    { path: 'part-one', component: PartOneComponent,
      children: [
	  { path: 'new-texte', component: NewTexteComponent},
	  { path: 'single-texte/:id', component: SingleTexteComponent },
	  { path: 'list-texte', component: ListTexteComponent },
	  { path: 'new-texte-version/:id', component: NewTexteVersionComponent },
	  { path: 'modify-texte/:id', component: ModifyTexteComponent },
	  { path: '', pathMatch: 'full', redirectTo: '' },
	  { path: '**', redirectTo: 'list-texte' }
      ]
    },
    { path: 'part-two', component: PartTwoComponent,
      children: [
	  //      { path: 'new-participant', component: NewParticipantComponent, canActivate: [ConnexionGuard] },
	  //	  { path: 'modify-participant/:id', component: ModifyParticipantComponent, canActivate: [ConnexionGuard] },
	  //      { path: 'single-participant/:id', component: SingleParticipantComponent, canActivate: [ConnexionGuard] },
	  { path: 'new-participant', component: NewParticipantComponent},
	  { path: 'list-participant', component: ListParticipantComponent },
	  { path: 'single-participant/:id', component: SingleParticipantComponent },
	  { path: '', pathMatch: 'full', redirectTo: '' },
	  { path: '**', redirectTo: 'list-participant' }
      ]
    },
    { path: 'part-three', component: PartThreeComponent,
      children: [
	  { path: 'new-but', component: NewButComponent},
	  { path: 'list-but', component: ListButComponent, canActivate: [ConnexionGuard] },
	  { path: 'single-but/:id', component: SingleButComponent, canActivate: [ConnexionGuard] },
	  { path: 'modify-but/:id', component: ModifyButComponent, canActivate: [ConnexionGuard] },
	  { path: '', pathMatch: 'full', redirectTo: 'list-but' },
	  { path: '**', redirectTo: 'list-but' }
      ]
    },
    { path: 'part-four', component: PartFourComponent,
      children: [
	  { path: 'new-notation', component: NewNotationComponent},
	  { path: 'new-notation/:id', component: NewNotationComponent},
	  { path: 'list-notation', component: ListNotationComponent},
	  { path: 'single-notation/:id', component: SingleNotationComponent},
	  { path: 'sum-notation/:texteObjectId', component: SumNotationComponent},
	  { path: '', pathMatch: 'full', redirectTo: '' }, 
	  { path: '**', redirectTo: 'list-notation' }
      ]
    },
    { path: 'part-five', component: PartFiveComponent,
      children: [
	  { path: 'new-connexion', component: NewConnexionComponent},
	  { path: 'list-connexion', component: ListConnexionComponent },
	  { path: 'single-connexion/:id', component: SingleConnexionComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'list-connexion' }, 
	  { path: '**', redirectTo: 'list-connexion' }
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
