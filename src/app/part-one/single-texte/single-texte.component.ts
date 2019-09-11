import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TexteModel }       from '../../models/texte.model';
import { TexteService }     from '../../services/texte.service';
import { ConnexionService } from '../../services/connexion.service';
import { StateService }     from '../../services/state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-single-texte',
    templateUrl: './single-texte.component.html',
    styleUrls: ['./single-texte.component.scss']
})
export class SingleTexteComponent implements OnInit, OnDestroy {

    public texte: TexteModel;
    public loading: boolean;
    public auteurId: string;
    public part: number;
    public isAuth: boolean;
    public errorMessage: string;

    public debug: boolean;
    public trace: boolean;

    private currentUrl: string;

    private partSub: Subscription;
    private isAuthSub: Subscription;
    
    constructor(private stateService: StateService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private texteService: TexteService,
		private connexionService: ConnexionService) { }

    ngOnInit() {
	this.debug = this.stateService.debug;
	console.log('Entrée dans ngOnInit');
	console.log('Dans ngOnInit avec debug', this.debug);

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans ngOnInit currentUrl', this.currentUrl);

	this.loading = true;

	this.stateService.mode$.next('single-texte');
	this.auteurId = this.connexionService.connexionId ? this.connexionService.connexionId : 'connexionID40282382';

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans ngOnInit params', params);
		this.texteService.getTexteByObjectId(params.id)
		    .then(
			(tex: TexteModel) => {
			    this.loading = false;
			    this.texte = tex;
			    console.log('Dans ngOnInit tex',tex);
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
		this.auteurId = this.connexionService.connexionId;
	    }
	);
	console.log('Dans ngOnInit part',this.part);

	this.isAuthSub = this.connexionService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);
    }

    onGoBack() {
	this.router.navigate([this.currentUrl]);
    }

    onGoAllTexte() {
	this.router.navigate(['/part-one/all-texte']);
    }

    onNotate() {
	console.log('Entrée dans onNotate navigation vers /part-four/new-notation/'+this.texte._id);
	this.router.navigate(['/part-four/new-notation/' + this.texte._id]);
    }

    onAverageNote() {
	console.log('Entrée dans onAverageNote navigation vers /part-four/sum-notation/'+this.texte._id);
	this.router.navigate(['/part-four/sum-notation/' + this.texte._id]);
    }

    onModifyTexte() {
	this.router.navigate(['/part-one/modify-texte/' + this.texte._id]);
    }

    onNewTexteVersion() {
	this.router.navigate(['/part-one/new-texte-version/' + this.texte._id]);
    }

    onDelete() {
	this.loading = true;
	this.texteService.deleteTexte(this.texte._id).then(
	    () => {
		this.loading = false;
		this.router.navigate(['/part-one/all-texte']);
	    }
	);
    }
    
    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
