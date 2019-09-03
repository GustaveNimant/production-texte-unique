import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Un_texte } from '../../models/Un_texte.model';
import { TextesService } from '../../services/textes.service';
import { Subscription } from 'rxjs';
import { ConnexionsService } from '../../services/connexions.service';

@Component({
    selector: 'app-single-texte',
    templateUrl: './single-texte.component.html',
    styleUrls: ['./single-texte.component.scss']
})
export class SingleTexteComponent implements OnInit, OnDestroy {

    public texte: Un_texte;
    public loading: boolean;
    public auteurId: string;
    public part: number;
    public isAuth: boolean;
    public errorMessage: string;

    public debug: boolean;
    public trace: boolean;

    fileIsUploading = false;
    fileUrl: string;
    fileUploaded = false;

    private partSub: Subscription;
    private isAuthSub: Subscription;
    
    constructor(private stateService: StateService,
		private router: Router,
		private route: ActivatedRoute,
		private textesService: TextesService,
		private connexionsService: ConnexionsService) { }

    ngOnInit() {
	this.debug = this.stateService.debug;
	console.log('Entrée dans ngOnInit');
	console.log('Dans ngOnInit avec debug', this.debug);
	
	this.loading = true;

	this.stateService.mode$.next('single-texte');
	this.auteurId = this.connexionsService.connexionId ? this.connexionsService.connexionId : 'connexionID40282382';

	this.route.params.subscribe(
	    (params: Params) => {
		console.log('Dans ngOnInit params.id', params.id);
		this.textesService.getTexteById(params.id)
		    .then(
			(tex: Un_texte) => {
			    this.loading = false;
			    this.texte = tex;
			    console.log('Dans ngOnInit texte',this.texte);
			}
		    ).catch(
			(error) => {
			    switch (error.status) {
				case 401:
				    this.errorMessage = 'Erreur d\'authentification';
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
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);
    }

    onGoBack() {
	this.router.navigate(['/part-one/all-texte']);
    }

    onNotate() {
	this.router.navigate(['/part-one/notate-texte/' + this.texte._id]);
    }

    onModify() {
	this.router.navigate(['/part-one/modify-texte/' + this.texte._id]);
    }

    onModifyWithImage() {
	this.router.navigate(['/part-one/modify-texte-with-image/' + this.texte._id]);
    }

    onDelete() {
	this.loading = true;
	this.textesService.deleteTexte(this.texte._id).then(
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
