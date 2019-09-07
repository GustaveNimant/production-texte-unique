import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ConnexionsService } from '../../services/connexions.service';
import { Subscription } from 'rxjs';
import { ConnexionModel } from '../../models/connexion.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-connexion',
    templateUrl: './list-connexion.component.html',
    styleUrls: ['./list-connexion.component.scss']
})

export class ListConnexionComponent implements OnInit, OnDestroy {

    public connexions: ConnexionModel[] = [];
    public part: number;
    public loading: boolean;
    public debug: boolean;
    
    private connexionsSub: Subscription;
    private partSub: Subscription;

    constructor(private stateService: StateService,           /* BehaviorSubjects */
		private connexionsService: ConnexionsService, /* Subjects */
		private router: Router) {
    	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.debug = this.stateService.debug;
	console.log('Dans ngOnInit debug', this.debug);
	
	this.stateService.mode$.next('list');
	this.connexionsSub = this.connexionsService.connexions$.subscribe(
	    (con_a) => {
		console.log('Dans ngOnInit con_a',con_a);
		this.connexions = con_a;
		this.loading = false;
	    }
	);
	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
	    }
	);
	this.connexionsService.getConnexions();
    }

    onConnexionClicked(id: string) {
	console.log('Entrée dans onConnexionClicked avec id', id);
	console.log('Entrée dans onConnexionClicked avec part', this.part);
	
	console.log('Entrée dans onConnexionClicked navigation vers ', '/part-five/single-connexion/' + id);
	    this.router.navigate(['/part-five/single-connexion/' + id]);
    }

    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.connexionsSub.unsubscribe();
	this.partSub.unsubscribe();
    }

}
