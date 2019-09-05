import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotationModelTs } from '../../models/notation.model';
import { NotationsService } from '../../services/notations.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    public debug: boolean;

    private partSub: Subscription;

    constructor(private stateService: StateService,
		private formBuilder: FormBuilder,
		private notationsService: NotationsService,
		private router: Router)
		{
		    console.log('Entrée dans constructor');
		}


    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.stateService.mode$.next('form');

	this.notationForm = this.formBuilder.group({
	    texteId: [null],
	    date: [null],
	    note: [6],
	    participantId: [null]
	});
	console.log('Dans ngOnInit notationForm',this.notationForm);
	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
	    }
	);
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');

	this.loading = true;

	/* copie le contenu du notationForm */
	const notation = new NotationModelTs();
	notation.texteId = this.notationForm.get('texteId').value;
	notation.participantId = this.notationForm.get('participantId').value;
	notation.note = this.notationForm.get('note').value;
	notation.date = new Date().getTime().toString(); 
	
	console.log('Dans onSubmit notation', notation);

	this.notationsService.createNewNotation(notation)
	    .then(
		() => {
		    this.notationForm.reset();
		    this.loading = false;
	//	    this.router.navigate(['/part-four/les-notations']);
		}
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur est', error);
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}

