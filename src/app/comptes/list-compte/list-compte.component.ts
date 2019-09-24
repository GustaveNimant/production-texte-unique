import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { CompteService } from '../../services/compte.service';
import { Subscription } from 'rxjs';
import { CompteModel } from '../../models/compte.model';
import { Router } from '@angular/router';

import * as M from '../../irp-provider/managementLibrary';
import * as O from '../../models/outils';

@Component({
    selector: 'app-list-compte',
    templateUrl: './list-compte.component.html',
    styleUrls: ['./list-compte.component.scss']
})

export class ListCompteComponent implements OnInit, OnDestroy {

    public compte_a: CompteModel[] = [];
    public loading: boolean;
    public debug: boolean;
    
    private compte_aSub: Subscription;

    constructor(
	private compteService: CompteService,
	private stateService: StateService, 
	private router: Router)
	{
    	    console.log('Entrée dans constructor');
	}
    
    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.loading = true;

	this.debug = this.stateService.debug;
	console.log('Dans ngOnInit debug', this.debug);
	
	this.stateService.mode$.next('list');

	this.stateService.currentUrl$.next(this.router.url);
	console.log('Dans',here,'this.router.url',this.router.url);

	this.compte_aSub = this.compteService.compte_a$.subscribe(
	    (com_a) => {
		console.log('Dans ngOnInit com_a',com_a);
		this.loading = false;
		if (com_a.length <= 0) {
		    console.log('Dans',here,'navigation vers /comptes/new-compte/');
		    this.router.navigate(['/comptes/new-compte/']);
		} else {
		    this.compte_a = com_a;
		}
	    }
	);
	
	this.compteService.getComptes(here);
    }

    onCompteClicked(id: string) {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	console.log('Entrée dans',here,'avec id', id);
	
	console.log('Dans onCompteClicked navigation vers ', '/comptes/single-compte/' + id);
	this.router.navigate(['/comptes/single-compte/' + id]);
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00',here);
    }

}
