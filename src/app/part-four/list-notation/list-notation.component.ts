import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';
import { StateService }      from '../../services/state.service';
import { NotationService }  from '../../services/notation.service';
import { NotationModel } from '../../models/notation.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list-notation',
    templateUrl: './list-notation.component.html',
    styleUrls: ['./list-notation.component.scss']
})

export class ListNotationComponent implements OnInit, OnDestroy {

    public notations: NotationModel[] = [];
    public part: number;
    public loading: boolean;
    public debug: boolean;
    public isAuth: boolean;

    private currentUrl: string;
    private notationsSub: Subscription;
    private partSub: Subscription;
    private isAuthSub: Subscription;

    constructor(private stateService: StateService,
		private connexionService: ConnexionService,
		private notationService: NotationService, 
		private router: Router) {
    	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.debug = this.stateService.debug;
	console.log('Dans ngOnInit debug', this.debug);
	
	this.stateService.mode$.next('list');

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans ngOnInit currentUrl', this.currentUrl);

	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
	    }
	);

	this.notationsSub = this.notationService.notations$.subscribe(
	    (con_a) => {
		console.log('Dans ngOnInit con_a',con_a);
		this.notations = con_a; /* on charge les notations ici */
		this.loading = false;
	    },
	    (error) => {
		console.log('Dans notationsSub Erreur:', error);
	    },
	    () => {console.log('Dans notationsSub fini !')}
	);

	this.isAuthSub = this.connexionService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les notations */
		this.isAuth = boo;
	    }
	);
	console.log('Dans ngOnInit isAuth', this.isAuth);
	if (!this.isAuth) {
	    this.router.navigate(['/login']);
	}
	console.log('Dans ngOnInit before getNotations loading', this.loading);
	this.notationService.getNotations();
	console.log('Dans ngOnInit after  getNotations loading', this.loading);
    }

    onNotationClicked(id: string) {
	console.log('Entrée dans onNotationClicked avec id', id);
	console.log('Entrée dans onNotationClicked avec part', this.part);
	
	console.log('Entrée dans onNotationClicked navigation vers ', '/part-four/single-notation/' + id);
	this.router.navigate(['/part-four/single-notation/' + id]);
    }

    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.notationsSub.unsubscribe();
	this.partSub.unsubscribe();
    }

}
