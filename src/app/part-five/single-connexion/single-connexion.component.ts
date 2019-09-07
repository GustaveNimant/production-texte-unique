import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConnexionModel } from '../../models/connexion.model';
import { ConnexionService } from '../../services/connexion.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-single-connexion',
    templateUrl: './single-connexion.component.html',
    styleUrls: ['./single-connexion.component.scss']
})

export class SingleConnexionComponent implements OnInit, OnDestroy {

    public connexion: ConnexionModel;
    public loading: boolean;
    public connexionId: string;
    public part: number;

    private partSub: Subscription;

    constructor(private stateService: StateService,
		private router: Router,
		private route: ActivatedRoute,
		private connexionService: ConnexionService)
		{
		    console.log('Entrée dans constructor');
		};
    
    ngOnInit(){
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.stateService.mode$.next('single-connexion');
	this.connexionId = this.connexionService.connexionId ? this.connexionService.connexionId : 'connexionID40282382';

	this.route.params.subscribe(
	    (params: Params) => {
		this.connexionService.getConnexionById(params.id)
		    .then(
			(connexion: ConnexionModel) => {
			    console.log('Dans ngOnInit connexion', connexion);
			    this.loading = false;
			    this.connexion = connexion;
			}
		    );
	    }
	);
	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
		this.connexionId = this.connexionService.connexionId;
	    }
	);
    };

    onGoBack() {
	this.router.navigate(['/part-five/list-connexions']);
    };

    onModify() {
	this.router.navigate(['/part-five/list-connexions/']);
    };

    onDelete() {
	this.loading = true;
	this.connexionService.deleteConnexion(this.connexion._id).then(
	    () => {
		this.loading = false;
		this.router.navigate(['/part-five/list-connexions']);
	    }
	);
    };

    ngOnDestroy() {
    this.partSub.unsubscribe();
  };

};
