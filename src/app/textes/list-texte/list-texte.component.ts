import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { TexteService } from '../../services/texte.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TexteModel }    from '../../models/texte.model';
import { CompteService } from '../../services/compte.service';

import * as O from '../../outils/outils-management';

@Component({
    selector: 'app-list-texte',
    templateUrl: './list-texte.component.html',
    styleUrls: ['./list-texte.component.scss']
})

export class ListTexteComponent implements OnInit, OnDestroy {

    public loading: boolean;
    public isAuth: boolean;

    currentUrl: string;
    
    public textes: TexteModel[] = [];
    private textesSub: Subscription;
    private isAuthSub: Subscription;
    
    constructor(private stateService: StateService,
		private compteService: CompteService,
		private texteService: TexteService,
		private router: Router) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.loading = true;
	this.stateService.mode$.next('list');

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans ngOnInit currentUrl', this.currentUrl);

	this.textesSub = this.texteService.textes$.subscribe(
	    (tex_a) => {
		console.log('Dans ngOnInit tex_a',tex_a);
		this.textes = tex_a;
		this.loading = false;
	    }
	);
	
	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

	console.log('Dans ngOnInit loading', this.loading);
	this.texteService.getTextes(); /* afficher les textes */
    }

    onTexteClicked(id: string) {
	console.log('Entrée dans onTexteClicked avec id',id);
	this.router.navigate(['/textes/single-texte/' + id]);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.textesSub.unsubscribe();
	
	O.unsubscribeLog(here, 'textesSub');
	O.exiting_from_function (here);
    }

}
