import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ConnexionsService } from '../../services/connexions.service';
import { Subscription } from 'rxjs';
import { Une_connexion } from '../../models/Une_connexion.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-connexions-list',
    templateUrl: './connexions-list.component.html',
    styleUrls: ['./connexions-list.component.scss']
})

export class ConnexionsListComponent implements OnInit, OnDestroy {

    public connexions: Une_connexion[] = [];
    public part: number;
    public loading: boolean;

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
	this.stateService.mode$.next('list');
	this.connexionsSub = this.connexionsService.connexions$.subscribe(
	    (les_connexions) => {
		this.connexions = les_connexions;
		this.loading = false;
	    }
	);
	this.partSub = this.stateService.part$.subscribe(
	    (a_part) => {
		this.part = a_part;
	    }
	);
	this.connexionsService.getConnexions();
    }

    onConnexionClicked(id: string) {
	console.log('Entrée dans onConnexionClicked avec id', id);
	console.log('Entrée dans onConnexionClicked avec part', this.part);
	
	console.log('Entrée dans onConnexionClicked navigation vers ', '/part-five/une_connexion/' + id);
	    this.router.navigate(['/part-five/une_connexion/' + id]);
    }

    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.connexionsSub.unsubscribe();
	this.partSub.unsubscribe();
    }

}
