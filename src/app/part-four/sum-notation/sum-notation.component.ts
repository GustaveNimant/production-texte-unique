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
    private currentParticipantIdSub: Subscription;
    public currentParticipantId: string;
    public participantCount: number;
    public texteObjectId: string;
    public sum: string;
    public average: string;
    public rms: string;

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

	let note_a:number[] = [];
	
	this.loading = true;
	
	this.stateService.mode$.next('form');

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans ngOnInit params', params);
		if (params.texteObjectId) {
		    this.texteObjectId = params.texteObjectId;
		    this.notationService.getNotationsByTexteObjectId(params.texteObjectId)
			.then(
			    (not_a) => {
				this.loading = false;
				console.log('Dans ngOnInit liste des notations not_a',not_a);

                                for (let i in not_a) {
				    note_a[i] = not_a[i].note;
				}				
				console.log('Dans ngOnInit liste des notes note_a',note_a);

				this.participantCount = note_a.length;
				
				this.average = (averageOfArray(note_a).toFixed(1)).toString();
				this.rms = (rmsOfArray(note_a).toFixed(1)).toString();
				this.sum = (sumOfArray(note_a)).toString();
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

    	    this.currentParticipantIdSub = this.stateService.currentParticipantId$.subscribe(
		(id) => {
		    console.log('Dans ngOnInit currentParticipantId >', id,'<');
		    if (id) {
			this.currentParticipantId = id;
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
