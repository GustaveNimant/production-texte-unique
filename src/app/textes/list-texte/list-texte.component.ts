import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompteService }   from '../../services/compte.service';
import { NotationService } from '../../services/notation.service';
import { StateService }    from '../../services/state.service';
import { TexteService }    from '../../services/texte.service';
import { Router } from '@angular/router';
import { TexteModel }    from '../../models/texte.model';
import { CompteModel }   from '../../models/compte.model';
import { NotationModel } from '../../models/notation.model';

import { Subscription } from 'rxjs';
import { filter, map, scan, take, tap, toArray } from 'rxjs/operators';
import { arrayCountSumAverageRms, sumOfArray, averageOfArray, varianceOfArray, rmsOfArray }  from '../../outils/outils-statistics';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-list-texte',
    templateUrl: './list-texte.component.html',
    styleUrls: ['./list-texte.component.scss']
})

export class ListTexteComponent implements OnInit, OnDestroy {

    public loading: boolean;
    public errorMessage: string;

    private currentUrl: string;

    private isAuth: boolean;
    private isAuthSub: Subscription;

    private verboseSub: Subscription;
    public verbose: boolean;

    public texte_a = new Array<TexteModel>();
    private texte_aSub: Subscription;

    private compte_aSub:Subscription;
    private compte_a = new Array<CompteModel>();
    private currentCompte = new CompteModel();

    private pseudo_a = new Array<string>();
    private currentPseudo: string;

    private participantCount: number;
    private sum: number;
    private average: number;
    private rms: number;

    private notation_aSub:Subscription;
    private notation_a = new Array<NotationModel>();
    private currentNotation_a = new Array<NotationModel>();

    public debug: boolean;

    constructor(private stateService: StateService,
		private compteService: CompteService,
		private notationService: NotationService,
		private texteService: TexteService,
		private router: Router)
		{
		    let here = O.functionName ();
		    console.log('%cEntrée dans','color:#00aa00', here);
		}

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.debug = this.stateService.debug;
	console.log('Dans',here,'debug', this.debug);

	this.loading = true;
	this.stateService.mode$.next('list');

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans',here,'currentUrl', this.currentUrl);

	this.verboseSub = this.stateService.verbose$.subscribe(
	    (boo) => {
		this.verbose = boo;
	    }
	);
	console.log('Dans',here,'subscribe.verbose', this.verbose);

	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans',here,'isAuth', this.isAuth);
	    }
	);


	this.texte_aSub = this.texteService.texte_a$
			      .subscribe(
				  (tex_a) => {
				      this.texte_a = tex_a;
				      console.log('Dans',here,'subscribe tex_a',tex_a);
				  },
				  (error) =>
				      {console.log(error)
				      },
				  () => {
				      console.log('fait');
				  }
			      );


	this.texteService.getTextes(here) /* afficher les textes */
	    .then(
		() => {
		    this.loading = false;
		    console.log('Dans',here,'getTextes then');
		    this.loading = false;
		}
	    ).catch(
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );


	this.compte_aSub = this.compteService.compte_a$
			       .subscribe(
				   (com_a) => {
				       this.compte_a = com_a;
				       console.log('Dans',here,'subscribe com_a',com_a);
				   }
			       );


	this.compteService.getComptes(here) /* afficher les comptes */
	    .then(
		() => {
		    this.loading = false;
		}
	    ).catch(
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );


	this.notation_aSub = this.notationService.notation_a$
				 .subscribe(
				     (not_a) => {
					 this.notation_a = not_a;
					 console.log('Dans',here,'subscribe notation_a',this.notation_a);
				     }
				 );

	this.notationService.getNotations(here) /* afficher les notations */
	    .then(
		() => {
		    console.log('Dans',here,'getNotations then');
		    this.loading = false;
		}
	    ).catch(
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );


	this.onVerbose ();

    }

    onVerbose () {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.onAddPseudo ();
	this.onAddAverageNote ();

	console.log('%cSortie de','color:#aa0000', here);
    }

    onAddPseudo () {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);


	for (let t in this.texte_a) {
	    let aId = this.texte_a[t].auteurId;

	    this.currentCompte = this.compte_a.find( x => x._id == aId);
	    this.currentPseudo = this.currentCompte.pseudo;
	    this.texte_a[t]['pseudo'] = this.currentPseudo;
	}
    }

    onAddAverageNote () {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);


	for (let t in this.texte_a) {
	    let tId = this.texte_a[t]._id;

	    this.currentNotation_a = this.notation_a.filter( x => x.texteObjectId == tId);

	    let note_a = new Array<number>();
            for (let i in this.currentNotation_a) {
		note_a[i] = this.currentNotation_a[i].note;
	    }

	    [this.participantCount, this.average, this.rms, this.sum] = arrayCountSumAverageRms(note_a);

	    this.texte_a[t]['noteMoyenne'] = Math.round(this.average*10)/10;
	    this.texte_a[t]['noteEcartType'] = Math.round(this.rms*10)/10;
	    this.texte_a[t]['participantCount'] = this.participantCount;
	}
    }

    onTexteClicked(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	console.log('Entrée dans',here,'avec id', id);

	console.log('Dans',here,'navigation vers', '/textes/single-texte/' + id);

	this.router.navigate(['/textes/single-texte/' + id]);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.texte_aSub.unsubscribe();

	O.unsubscribeLog(here, 'texte_aSub');
	O.exiting_from_function (here);
    }

}
