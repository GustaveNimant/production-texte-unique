import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router }     from '@angular/router';
import { NotationModel }                      from '../../models/notation.model';
import { NotationService }                   from '../../services/notation.service';
import { StateService }                       from '../../services/state.service';
import { Subscription }                       from 'rxjs';

@Component({
    selector: 'app-new-notation',
    templateUrl: './new-notation.component.html',
    styleUrls: ['./new-notation.component.scss']
})

export class NewNotationComponent implements OnInit, OnDestroy {

    public notationForm: FormGroup;
    public loading = false;
    public part: number;
    public errorMessage: string;

    private partSub: Subscription;
    private currentConnexionIdSub: Subscription;
    private currentTexteIdSub: Subscription;
    
    private texteId: string;
    private participantId: string;
    private currentDate: string;
    private currentTexteId: string;
    
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

	this.currentDate = new Date().toString();
	console.log('Dans ngOnInit currentDate', this.currentDate);
	
	this.stateService.mode$.next('form');

    	this.currentTexteIdSub = this.stateService.currentTexteId$.subscribe(
	    (id) => {
		console.log('Dans ngOnInit currentTexteId >', id,'<');
		if (id) {
		    this.currentTexteId = id;
		} else {
		    this.router.navigate(['/part-one/list-texte']);
		}
	    }, 
	    (error) => {
		console.log('Dans ngOnInit Erreur', error);
	    }

	);
	
	this.notationForm = this.formBuilder.group({
	    note: [6],
	});
	
	this.partSub = this.stateService.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);

    	this.currentConnexionIdSub = this.stateService.currentConnexionId$.subscribe(
	    (id) => {
		console.log('Dans ngOnInit id >', id,'<');
		if (id) {
		    this.participantId = id;
		} else {
		    this.router.navigate(['/login']);
		}
	    }, 
	    (error) => {
		console.log('Dans ngOnInit Erreur', error);
	    }

	);
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	const notation = new NotationModel();
	
	notation.texteId = this.currentTexteId;
	notation.participantId = this.participantId;
	notation.date = this.currentDate;

	notation.note = this.notationForm.get('note').value;
	console.log('Dans onSubmit notation', notation);
	
	this.notationService.createNewNotation(notation)
	    .then(
		() => {
		    this.notationForm.reset();
		    this.loading = false;
		    this.router.navigate(['/part-four/list-notation']);
		    }
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur', error);
		    console.log('Dans onSubmit Erreur.status', error.status);
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
