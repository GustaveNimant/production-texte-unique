import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService }                 from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnexionModel }                from '../../models/connexion.model';
import { Router }                       from '@angular/router';
import { Subscription }                 from 'rxjs';
import { ConnexionService }            from '../../services/connexion.service';

@Component({
    selector: 'app-new-connexion',
    templateUrl: './new-connexion.component.html',
    styleUrls: ['./new-connexion.component.scss']
})

export class NewConnexionComponent implements OnInit, OnDestroy {

    public connexionForm: FormGroup;
    public loading = false;
    public part: number;
    public errorMessage: string;

    private partSub: Subscription;

    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private connexionService: ConnexionService)
		{
		    console.log('Entrée dans constructor');
		}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.state.mode$.next('form');

	this.connexionForm = this.formBuilder.group({
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

	const connexion = new ConnexionModel();
	connexion.email = this.connexionForm.get('email').value;
	connexion.password = this.connexionForm.get('password').value;
	connexion._id = new Date().getTime().toString();

	console.log('Dans onSubmit connexion', connexion);
	
	this.connexionService.createNewConnexion(connexion)
	    .then(
		() => {
		    this.connexionForm.reset();
		    this.loading = false;
		    this.router.navigate(['/part-five/list-connexion']);
		    }
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur', error);
		    this.loading = false;
		    this.errorMessage = error.message;
		    switch (error.status) {
			case 500:
			    const message = 'l\'adresse '+ connexion.email +' est déjà enregistrée.\nEntrez une nouvelle adresse';
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
