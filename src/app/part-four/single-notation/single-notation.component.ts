import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotationModelTs } from '../../models/notation.model';
import { NotationsService } from '../../services/notations.service';
import { Subscription } from 'rxjs';
import { ConnexionsService } from '../../services/connexions.service';

@Component({
    selector: 'app-single-notation',
    templateUrl: './single-notation.component.html',
    styleUrls: ['./single-notation.component.scss']
})
export class SingleNotationComponent implements OnInit, OnDestroy {

    public notation: NotationModelTs;
    public loading: boolean;
    public auteurId: string;
    public part: number;
    public isAuth: boolean;
    public errorMessage: string;

    public debug: boolean;
    public trace: boolean;

    fileIsUploading = false;
    fileUploaded = false;

    currentUrl: string;

    private partSub: Subscription;
    private isAuthSub: Subscription;
    
    constructor(private stateService: StateService,
		private router: Router,
		private route: ActivatedRoute,
		private notationsService: NotationsService,
		private connexionsService: ConnexionsService) { }

    ngOnInit() {
	this.debug = this.stateService.debug;
	console.log('Entrée dans ngOnInit');
	console.log('Dans ngOnInit avec debug', this.debug);

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans ngOnInit currentUrl', this.currentUrl);

	this.loading = true;

	this.stateService.mode$.next('single-notation');
	this.auteurId = this.connexionsService.connexionId ? this.connexionsService.connexionId : 'connexionID40282382';

	this.route.params.subscribe(
	    (params: Params) => {
		console.log('Dans ngOnInit params', params);
		this.notationsService.getNotationById(params.id)
		    .then(
			(not: NotationModelTs) => {
			    this.loading = false;
			    this.notation = not;
			    console.log('Dans ngOnInit notation',this.notation);
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
			    console.log('Dans ngOnInit Erreur', error);
			    this.loading = false;
			}
		    );
	    }
	);
	
	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
		this.auteurId = this.connexionsService.connexionId;
	    }
	);
	console.log('Dans ngOnInit part',this.part);

	this.isAuthSub = this.connexionsService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les notations */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);
    }

    onGoBack() {
	this.router.navigate([this.currentUrl]);
    }

    onGoAllNotation() {
	this.router.navigate(['/part-one/all-notation']);
    }

    onDelete() {
	this.loading = true;
	this.notationsService.deleteNotation(this.notation._id).then(
	    () => {
		this.loading = false;
		this.router.navigate(['/part-one/all-notation']);
	    }
	);
    }
    
    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
