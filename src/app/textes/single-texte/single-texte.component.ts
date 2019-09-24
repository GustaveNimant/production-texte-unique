import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TexteModel }       from '../../models/texte.model';
import { TexteService }     from '../../services/texte.service';
import { CompteService } from '../../services/compte.service';
import { StateService }     from '../../services/state.service';
import { Subscription } from 'rxjs';

import * as M from '../../irp-provider/managementLibrary';
import * as O from '../../models/outils';

@Component({
    selector: 'app-single-texte',
    templateUrl: './single-texte.component.html',
    styleUrls: ['./single-texte.component.scss']
})
export class SingleTexteComponent implements OnInit, OnDestroy {

    public texte: TexteModel;
    public loading: boolean;
    public auteurId: string;
    public part: number;
    public isAuth: boolean;
    public errorMessage: string;

    public debug: boolean;
    public trace: boolean;

    private currentUrl: string;

    private partSub: Subscription;
    private isAuthSub: Subscription;
    
    constructor(private stateService: StateService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private texteService: TexteService,
		private compteService: CompteService)
		{
		    let here = O.functionName ();
		    console.log('%cEntrée dans','color:#00aa00', here);
		}

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.debug = this.stateService.debug;
	console.log('Entrée dans ngOnInit');
	console.log('Dans',here,' avec debug', this.debug);

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans',here,' currentUrl', this.currentUrl);

	this.loading = true;

	this.stateService.mode$.next('single-texte');
	this.auteurId = this.compteService.userId ? this.compteService.userId : 'compteID40282382';

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans',here,' params', params);
		this.texteService.getTexteByObjectId(params.id)
		    .then(
			(tex: TexteModel) => {
			    this.loading = false;
			    this.texte = tex;
			    console.log('Dans',here,'getTexteByObjectId tex',tex);
			}
		    ).catch(
			(error) => {
			    switch (error.status) {
				case 401:
				    this.onGoBack()
				    break;
				default:
				    this.errorMessage = error.message;
				    break;
			    }
			    console.log('Dans',here,' Erreur', error);
			    this.loading = false;
			}
		    );
	    }
	);
	
	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans',here,' num',num);
		this.part = num;
		this.auteurId = this.compteService.userId;
	    }
	);
	console.log('Dans',here,' part',this.part);

	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans',here,' isAuth', this.isAuth);
	    }
	);
	M.exiting_from_function (here);	
    }

    onGoBack() {
	this.router.navigate([this.currentUrl]);
    }

    onGoAllTexte() {
	this.router.navigate(['/textes/all-texte']);
    }

    onNotate() {
	console.log('Entrée dans onNotate navigation vers /part-four/new-notation/'+this.texte._id);
	this.router.navigate(['/part-four/new-notation/' + this.texte._id]);
    }

    onAverageNote() {
	console.log('Entrée dans onAverageNote navigation vers /part-four/sum-notation/'+this.texte._id);
	this.router.navigate(['/part-four/sum-notation/' + this.texte._id]);
    }

    onModifyTexte() {
	this.router.navigate(['/textes/modify-texte/' + this.texte._id]);
    }

    onNewTexteVersion() {
	this.router.navigate(['/textes/new-texte-version/' + this.texte._id]);
    }

    onDelete() {
	this.loading = true;
	this.texteService.deleteTexte(this.texte._id).then(
	    () => {
		this.loading = false;
		this.router.navigate(['/textes/all-texte']);
	    }
	);
    }
    
    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
