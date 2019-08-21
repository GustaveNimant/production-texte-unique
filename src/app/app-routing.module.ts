import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent }     from './default/default.component';

import { ModifyTexteComponent } from './part-one/modify-texte/modify-texte.component';
import { PartOneComponent }     from './part-one/part-one.component';
import { NewTexteComponent }    from './part-one/new-texte/new-texte.component';
import { SingleTexteComponent } from './part-one/single-texte/single-texte.component';
import { TextesListComponent }  from './part-one/textes-list/textes-list.component';

import { PartTwoComponent }           from './part-two/part-two.component';
import { NewParticipantComponent }    from './part-two/new-participant/new-participant.component';
import { ParticipantsListComponent }  from './part-two/participants-list/participants-list.component';
import { SingleParticipantComponent } from './part-two/single-participant/single-participant.component';
import { LoginComponent }             from './part-two/auth/login/login.component';
import { SignupComponent }            from './part-two/auth/signup/signup.component';

import { PartThreeComponent }   from './part-three/part-three.component';

import { PartFourComponent }    from './part-four/part-four.component';

import { NewTexteWithUploadComponent } from './part-one/new-texte-with-upload/new-texte-with-upload.component';
import { ModifyTexteWithUploadComponent } from './part-one/modify-texte-with-upload/modify-texte-with-upload.component';

import { AuthGuard }            from './services/auth-guard.service';

const routes: Routes = [
    { path: 'part-one', component: PartOneComponent,
      children: [
	  { path: 'new-texte', component: NewTexteComponent},
	  { path: 'un_texte/:id', component: SingleTexteComponent },
	  { path: 'les-textes', component: TextesListComponent },
	  { path: 'modify-texte/:id', component: ModifyTexteComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'les-textes' },
	  { path: '**', redirectTo: 'les-textes' }
      ]
    },
    { path: 'part-two', component: PartTwoComponent,
      children: [
	  //      { path: 'new-participant', component: NewParticipantComponent, canActivate: [AuthGuard] },
	  //	  { path: 'modify-participant/:id', component: ModifyParticipantComponent, canActivate: [AuthGuard] },
	  //      { path: 'un_participant/:id', component: SingleParticipantComponent, canActivate: [AuthGuard] },
	  { path: 'new-participant', component: NewParticipantComponent},
	  { path: 'un_participant/:id', component: SingleParticipantComponent },
	  { path: 'auth/login', component: LoginComponent },
	  { path: 'auth/signup', component: SignupComponent },
	  { path: 'les-participants', component: ParticipantsListComponent },
	  { path: '', pathMatch: 'full', redirectTo: 'les-participants' },
	  { path: '**', redirectTo: 'les-participants' }
      ]
    },
    { path: 'part-three', component: PartThreeComponent,
      children: [
	  { path: 'les-textes', component: TextesListComponent, canActivate: [AuthGuard] },
	  { path: 'texte/:id', component: SingleTexteComponent, canActivate: [AuthGuard] },
	  { path: 'modify-texte/:id', component: ModifyTexteComponent, canActivate: [AuthGuard] },
	  { path: '', pathMatch: 'full', redirectTo: 'les-textes' },
	  { path: '**', redirectTo: 'les-textes' }
      ]
    },
    { path: 'part-four', component: PartFourComponent,
      children: [
	  { path: 'les-textes', component: TextesListComponent, canActivate: [AuthGuard] },
	  { path: 'texte/:id', component: SingleTexteComponent, canActivate: [AuthGuard] },
	  { path: 'modify-texte/:id', component: ModifyTexteWithUploadComponent, canActivate: [AuthGuard] },
	  { path: '', pathMatch: 'full', redirectTo: 'les-participants' }, 
	  { path: '**', redirectTo: 'les-participants' }
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
