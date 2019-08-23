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
    public debug: boolean;

    private debugSub: Subscription;
    private partSub: Subscription;
    
    constructor(private state: StateService,
		private router: Router,
		private route: ActivatedRoute,
		private textesService: TextesService,
		private auth: ConnexionsService) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.loading = true;

	this.debugSub = this.state.debug$.subscribe((x) => {this.debug = x;});
	
	this.state.mode$.next('single-texte');
	this.auteurId = this.auth.connexionId ? this.auth.connexionId : 'connexionID40282382';

	console.log('Dans ngOnInit debug',this.debug);
	
	this.route.params.subscribe(
	    (params: Params) => {
		this.textesService.getTexteById(params.id).then(
		    (a_text: Un_texte) => {
			this.loading = false;
			this.texte = a_text;
		    }
		);
	    }
	);
	this.partSub = this.state.part$.subscribe(
	    (a_part) => {
		this.part = a_part;
		this.auteurId = this.auth.connexionId;
	    }
	);

    }

    onGoBack() {
	this.router.navigate(['/part-one/all-texte']);
    }

    onModify() {
	this.router.navigate(['/part-one/modify-texte/' + this.texte._id]);
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
