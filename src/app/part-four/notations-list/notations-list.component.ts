import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { NotationsService } from '../../services/notations.service';
import { Subscription } from 'rxjs';
import { Une_notation } from '../../models/Une_notation.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-notations-list',
    templateUrl: './notations-list.component.html',
    styleUrls: ['./notations-list.component.scss']
})

export class NotationsListComponent implements OnInit, OnDestroy {

    public notations: Une_notation[] = [];
    public part: number;
    public loading: boolean;
    public debug: boolean;
    
    private notationsSub: Subscription;
    private partSub: Subscription;

    constructor(private stateService: StateService,           /* BehaviorSubjects */
		private notationsService: NotationsService, /* Subjects */
		private router: Router) {
    	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.debug = this.stateService.debug;
	console.log('Dans ngOnInit debug', this.debug);
	
	this.stateService.mode$.next('list');

	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
	    }
	);

	this.notationsSub = this.notationsService.notations$.subscribe(
	    (con_a) => {
		console.log('Dans ngOnInit con_a',con_a);
		this.notations = con_a;
		this.loading = false;
	    },
	    (error) => {
		console.log('Dans notationsSub Erreur:', error);
	    },
	    () => {console.log('Dans notationsSub fini !')}
	);
	
	this.notationsService.getNotations();
    }

    onNotationClicked(id: string) {
	console.log('Entrée dans onNotationClicked avec id', id);
	console.log('Entrée dans onNotationClicked avec part', this.part);
	
	console.log('Entrée dans onNotationClicked navigation vers ', '/part-four/une_notation/' + id);
	    this.router.navigate(['/part-four/une_notation/' + id]);
    }

    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.notationsSub.unsubscribe();
	this.partSub.unsubscribe();
    }

}
