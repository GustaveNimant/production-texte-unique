import { Component, OnDestroy, OnInit }       from '@angular/core';
import { ActivatedRoute, Params, Router }     from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription }               from 'rxjs';
import { CompteModel }                from '../../models/compte.model';
import { CompteService }              from '../../services/compte.service';
import { StateService }               from '../../services/state.service';

@Component({
    selector: 'app-new-compte',
    templateUrl: './new-compte.component.html',
    styleUrls: ['./new-compte.component.scss']
})

export class NewCompteComponent implements OnInit, OnDestroy {

    public compteForm: FormGroup;
    public loading = false;
    public part: number;
    public errorMessage: string;

    private partSub: Subscription;
    private currentEmail: string ='';
    
    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private compteService: CompteService,
		private stateService: StateService)
		{
		    console.log('Entrée dans constructor');
		}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.state.mode$.next('form');

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans ngOnInit params', params);
		if (params.id) {
		    this.currentEmail = params.id;
		} 
	    }
	);

	console.log('Dans ngOnInit currentEmail', this.currentEmail);
	
	this.compteForm = this.formBuilder.group({
	    pseudo: [null, Validators.required],
	    email: [null, Validators.required, Validators.email],
	    password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
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

	const compte = new CompteModel();
	compte.pseudo = this.compteForm.get('pseudo').value;
	compte.email = this.compteForm.get('email').value;
	compte.password = this.compteForm.get('password').value;
	compte._id = new Date().getTime().toString();

	console.log('Dans onSubmit compte', compte);
	
	this.stateService.currentParticipantId$.next(compte._id);
	console.log('Dans onSubmit currentParticipantId', compte._id);
	
	this.compteService.createNewCompte(compte)
	    .then(
		() => {
		    this.compteForm.reset();
		    this.loading = false;
		    this.router.navigate(['/part-five/list-compte']);
		    }
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur', error);
		    this.loading = false;
		    this.errorMessage = error.message;
		    switch (error.status) {
			case 500:
			    const message = 'l\'adresse '+ compte.email +' est déjà enregistrée.\nEntrez une nouvelle adresse';
			    alert (message);
			    break;
			default:
			    break;
		    }
		}
	    );
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
