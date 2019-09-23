import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router }     from '@angular/router';
import { NotationModel }                      from '../../models/notation.model';
import { TexteModel }        from '../../models/texte.model';
import { NotationService }                    from '../../services/notation.service';
import { TexteService }       from '../../services/texte.service';
import { StateService }                       from '../../services/state.service';
import { Subscription }                       from 'rxjs';
import { sumOfArray, averageOfArray, varianceOfArray, rmsOfArray }  from '../../models/outils';

import * as M from '../../irp-provider/managementLibrary';
import * as O from '../../models/outils';

@Component({
    selector: 'app-sum-notation',
    templateUrl: './sum-notation.component.html',
    styleUrls: ['./sum-notation.component.scss']
})

export class SumNotationComponent implements OnInit, OnDestroy {

    private notationForm: FormGroup;
    private loading = false;
    private part: number;
    private errorMessage: string;

    private partSub: Subscription;
    private participantCount: number;
    private texteObjectId: string;
    private texteTitre: string;
    private sum: string;
    private average: string;
    private rms: string;

    private currentUrl: string;
    private currentUrlSub: Subscription;

    constructor(private stateService: StateService,
		private texteService: TexteService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private notationService: NotationService)
		{
		    let here = O.functionName ();
		    console.log('%cEntrée dans','color:#00aa00', here);
		}

    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	let note_a:number[] = [];

	this.loading = true;

	this.stateService.mode$.next('form');

	this.partSub = this.stateService.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);

	this.currentUrlSub = this.stateService.currentUrl$.subscribe(
	    (url) => {
		console.log('Dans',here,'url',url);
		this.currentUrl = url;
		console.log('Dans',here,'currentUrl', this.currentUrl);
	    }
	);

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans',here,'params', params);
		if (params.texteObjectId) {
		    this.texteObjectId = params.texteObjectId;

		    this.texteService.getTexteByObjectId (this.texteObjectId)
			.then(
			    (tex: TexteModel) => {
				console.log('Dans',here,'getTexteIdByObjectId tex', tex);
				this.texteTitre = tex.titre;
			    },
			).catch (
			    (error) => {
				console.log('Dans',here,'getTexteByObjectId Erreur', error);
			    }
			);


		    this.notationService.getNotationsByTexteObjectId(params.texteObjectId)
			.then(
			    (not_a) => {
				this.loading = false;
				console.log('Dans',here,'liste des notations not_a',not_a);

				console.log('Dans',here,'typeof not_a',typeof not_a);
                                for (let i in not_a) {
				    note_a[i] = not_a[i].note;
				}
				
				this.participantCount = note_a.length;
				console.log('Dans',here,'participantCount',this.participantCount);
				if (this.participantCount == 0){
				    this.average = "0";
				    this.rms = "0";
				    this.sum = "0";
				    alert(here+': Mettre une note à ce texte '+this.currentUrl+' ?');
				    this.router.navigate([this.currentUrl]);
				}
				else {
				    console.log('Dans',here,'liste des notes note_a',note_a);
				    this.average = (averageOfArray(note_a).toFixed(1)).toString();
				    this.rms = (rmsOfArray(note_a).toFixed(1)).toString();
				    this.sum = (sumOfArray(note_a)).toString();
				}
				console.log('Dans',here,'somme des notes note_a',this.sum);
				console.log('Dans',here,'moyenne des notes note_a',this.average);
				console.log('Dans',here,'rms des notes note_a',this.rms);
			    }
			)
			.catch(
			    (error) => {
				console.log('Dans',here,'Erreur', error);
				console.log('Dans',here,'Erreur.status', error.status);
				this.loading = false;
				this.errorMessage = error.message;
			    }
			);
		} else {
		    console.log('Dans',here,'Erreur pour params.id', params.id);
		    this.router.navigate(['/part-one/list-texte']);
		}
	    }
	);

    }

    onGoBack() {
	this.router.navigate(['/part-four/list-notation']);
    };

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.partSub.unsubscribe();
    }

}
