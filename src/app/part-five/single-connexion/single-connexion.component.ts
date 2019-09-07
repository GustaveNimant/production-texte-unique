import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConnexionModel } from '../../models/connexion.model';
import { ConnexionsService } from '../../services/connexions.service';
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
		private connexionsService: ConnexionsService)
		{
		    console.log('Entrée dans constructor');
		};
    
    ngOnInit(){
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.stateService.mode$.next('single-connexion');
	this.connexionId = this.connexionsService.connexionId ? this.connexionsService.connexionId : 'connexionID40282382';

	this.route.params.subscribe(
	    (params: Params) => {
		this.connexionsService.getConnexionById(params.id)
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
		this.connexionId = this.connexionsService.connexionId;
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
	this.connexionsService.deleteConnexion(this.connexion._id).then(
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
