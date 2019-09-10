import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router }     from '@angular/router';
import { NotationModel }                      from '../../models/notation.model';
import { NotationService }                    from '../../services/notation.service';
import { StateService }                       from '../../services/state.service';
import { Subscription }                       from 'rxjs';
import { sumOfArray, averageOfArray, varianceOfArray, rmsOfArray }  from '../../models/outils';

@Component({
    selector: 'app-sum-notation',
    templateUrl: './sum-notation.component.html',
    styleUrls: ['./sum-notation.component.scss']
})

export class SumNotationComponent implements OnInit, OnDestroy {

    public notationForm: FormGroup;
    public loading = false;
    public part: number;
    public errorMessage: string;

    private partSub: Subscription;
    private currentConnexionIdSub: Subscription;

    public currentConnexionId: string;
    public texteId: string;
    public sum: number;
    public average: number;
    public rms: number;

    constructor(private stateService: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private notationService: NotationService)
		{
		    console.log('Entrée dans constructor');
		}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	let note_a = [];
	
	
	this.loading = true;
	
	this.stateService.mode$.next('form');

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans ngOnInit params', params);
		if (params.texteId) {
		    this.texteId = params.texteId;
		    this.notationService.getNotationsByTexteId(params.texteId)
			.then(
			    (not_a) => {
				this.loading = false;
				console.log('Dans ngOnInit liste des notations not_a',not_a);
				for( let i = 0; i < not_a.length; i++ ){
                       		    note_a[i] = not_a[i].note;
				}				
				console.log('Dans ngOnInit liste des notes note_a',note_a);

				this.sum = sumOfArray(note_a);
				this.average = averageOfArray(note_a);
				this.rms = rmsOfArray(note_a);
				console.log('Dans ngOnInit rms des notes note_a',this.rms);
			    }
			)
			.catch(
			    (error) => {
				console.log('Dans ngOnInit Erreur', error);
				console.log('Dans ngOnInit Erreur.status', error.status);
				this.loading = false;
				this.errorMessage = error.message;
			    }
			);
		} else {
		    console.log('Dans ngOnInit Erreur pour params.id', params.id);
		    this.router.navigate(['/part-one/list-texte']);
		}
	    }
	);

	this.partSub = this.stateService.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);

    	this.currentConnexionIdSub = this.stateService.currentConnexionId$.subscribe(
	    (id) => {
		console.log('Dans ngOnInit currentConnexionId >', id,'<');
		if (id) {
		    this.currentConnexionId = id;
		} else {
		    this.router.navigate(['/login']);
		}
	    }, 
	    (error) => {
		console.log('Dans ngOnInit Erreur', error);
	    }

	);
    }

    onGoBack() {
	this.router.navigate(['/part-four/list-notation']);
    };

    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
