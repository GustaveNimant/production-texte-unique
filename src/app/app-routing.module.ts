import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartOneComponent }     from './part-one/part-one.component';
import { PartThreeComponent }   from './part-three/part-three.component';
import { PartFourComponent }    from './part-four/part-four.component';
import { DefaultComponent }     from './default/default.component';
import { TexteListComponent }   from './part-one/texte-list/texte-list.component';
import { NewTexteComponent }    from './part-one/new-texte/new-texte.component';
import { SingleTexteComponent } from './part-one/single-texte/single-texte.component';
import { ModifyTexteComponent } from './part-one/modify-texte/modify-texte.component';
import { LoginComponent }       from './part-three/auth/login/login.component';
import { SignupComponent }      from './part-four/auth/signup/signup.component'; /* 26 Juin 2019 */
import { AuthGuard }            from './services/auth-guard.service';
import { NewTexteWithUploadComponent } from './part-four/new-texte-with-upload/new-texte-with-upload.component';
import { ModifyTexteWithUploadComponent } from './part-four/modify-texte-with-upload/modify-texte-with-upload.component';

const routes: Routes = [
    { path: 'part-one', component: PartOneComponent,
      children: [
	  { path: 'new-texte', component: NewTexteComponent },
	  { path: 'les-textes', component: TexteListComponent },
	  { path: 'texte/:id', component: SingleTexteComponent },
	  { path: 'modify-texte/:id', component: ModifyTexteComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'les-textes' },
	  { path: '**', redirectTo: 'les-textes' }
      ]
    },
    /*
    { path: 'part-two', component: PartTwoComponent,
      children: [
	  { path: 'new-participant', component: NewParticipantComponent, canActivate: [AuthGuard] },
	  { path: 'les-participants', component: ParticipantListComponent, canActivate: [AuthGuard] },
	  { path: 'participant/:id', component: SingleParticipantComponent, canActivate: [AuthGuard] },
	  { path: 'modify-participant/:id', component: ModifyParticipantComponent, canActivate: [AuthGuard] },
	  { path: 'auth/login', component: LoginComponent },
	  { path: 'auth/signup', component: SignupComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
	  { path: '**', redirectTo: 'les-participants' }
      ]
    },*/
    { path: 'part-three', component: PartThreeComponent,
      children: [
	  { path: 'new-texte', component: NewTexteComponent, canActivate: [AuthGuard] },
	  { path: 'les-textes', component: TexteListComponent, canActivate: [AuthGuard] },
	  { path: 'texte/:id', component: SingleTexteComponent, canActivate: [AuthGuard] },
	  { path: 'modify-texte/:id', component: ModifyTexteComponent, canActivate: [AuthGuard] },
	  { path: 'auth/login', component: LoginComponent },
	  { path: 'auth/signup', component: SignupComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
	  { path: '**', redirectTo: 'les-textes' }
      ]
    },
    { path: 'part-four', component: PartFourComponent,
      children: [
	  { path: 'new-texte', component: NewTexteWithUploadComponent, canActivate: [AuthGuard] },
	  { path: 'les-textes', component: TexteListComponent, canActivate: [AuthGuard] },
	  { path: 'texte/:id', component: SingleTexteComponent, canActivate: [AuthGuard] },
	  { path: 'modify-texte/:id', component: ModifyTexteWithUploadComponent, canActivate: [AuthGuard] },
	  { path: 'auth/login', component: LoginComponent },
	  { path: 'auth/signup', component: SignupComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'auth/signup' }, /* CORRECTION */
	  { path: '**', redirectTo: 'les-textes' }
    ]
  },
  { path: 'default', component: DefaultComponent },
  { path: '', pathMatch: 'full', component: DefaultComponent },
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
    AuthGuard
  ]
})
export class AppRoutingModule {}
