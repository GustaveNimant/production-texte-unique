import { Component, OnDestroy, OnInit }       from '@angular/core';
import { StateService }                       from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Une_notation }                       from '../../models/Une_notation.model';
import { ActivatedRoute, Params, Router }     from '@angular/router';
import { Subscription }                       from 'rxjs';
import { NotationsService }                   from '../../services/notations.service';

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
    private texteId: string;
    
    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private notationsService: NotationsService)
		{
		    console.log('Entrée dans constructor');
		}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.state.mode$.next('form');

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans ngOnInit params', params);
		this.texteId = params.id;
	    }
	);

	this.notationForm = this.formBuilder.group({
	    texteId:[this.texteId],
	    participantId: [null],
	    note: [6],
	    date: [null]
	});
	
	this.partSub = this.state.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	const notation = new Une_notation();
	
	notation.texteId = this.texteId;
	notation.participantId = this.notationForm.get('participantId').value;
	notation.note = this.notationForm.get('note').value;
	notation.date = new Date().getTime().toString();

	console.log('Dans onSubmit notation', notation);
	
	this.notationsService.createNewNotation(notation)
	    .then(
		() => {
		    this.notationForm.reset();
		    this.loading = false;
		    this.router.navigate(['/part-four/les-notations']);
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
