import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { CompteService } from '../../services/compte.service';
import { Subscription } from 'rxjs';
import { CompteModel } from '../../models/compte.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-compte',
    templateUrl: './list-compte.component.html',
    styleUrls: ['./list-compte.component.scss']
})

export class ListCompteComponent implements OnInit, OnDestroy {

    public comptes: CompteModel[] = [];
    public part: number;
    public loading: boolean;
    public debug: boolean;
    
    private comptesSub: Subscription;
    private partSub: Subscription;

    constructor(private stateService: StateService,           /* BehaviorSubjects */
		private compteService: CompteService, /* Subjects */
		private router: Router) {
    	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.debug = this.stateService.debug;
	console.log('Dans ngOnInit debug', this.debug);
	
	this.stateService.mode$.next('list');

	this.comptesSub = this.compteService.comptes$.subscribe(
	    (com_a) => {
		console.log('Dans ngOnInit com_a',com_a);
		this.loading = false;
		if (com_a.length <= 0) {
		    console.log('Dans ngOnInit naviagtion vers /part-five/new-compte/');
		    this.router.navigate(['/part-five/new-compte/']);
		} else {
		    this.comptes = com_a;
		}
	    }
	);

	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
	    }
	);
	
	this.compteService.getComptes();
    }

    onCompteClicked(id: string) {
	console.log('Entrée dans onCompteClicked avec id', id);
	console.log('Entrée dans onCompteClicked avec part', this.part);
	
	console.log('Entrée dans onCompteClicked navigation vers ', '/part-five/single-compte/' + id);
	this.router.navigate(['/part-five/single-compte/' + id]);
    }

    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.comptesSub.unsubscribe();
	this.partSub.unsubscribe();
    }

}
