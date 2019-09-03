import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService }                 from '../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Une_connexion }                from '../models/Une_connexion.model';
import { Router }                       from '@angular/router';
import { Subscription }                 from 'rxjs';
import { ConnexionsService }            from '../services/connexions.service';
import { partStringOfNumber }           from '../models/outils';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

    public connexionForm: FormGroup;
    public loading = false;
    public part: number;
    public partString: string;
    public connexionId: string;
    public errorMessage: string;

    private partSub: Subscription;

    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private auth: ConnexionsService,
		private connexionsService: ConnexionsService){
	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.auth.isAuth$.next(true);

	this.state.mode$.next('form');

	this.connexionForm = this.formBuilder.group({
	    email: [null, [Validators.required, Validators.email]],
	    password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
	});
	
	this.partSub = this.state.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
		this.partString = partStringOfNumber(num);
		console.log('Dans ngOnInit partString', this.partString);
	    }
	);
    }

    onLogin() {
	console.log('Entrée dans onLogin');
	
	this.loading = true;

	const connexion = new Une_connexion();
	connexion.email = this.connexionForm.get('email').value;
	connexion.password = this.connexionForm.get('password').value;
	connexion._id = new Date().getTime().toString();

	console.log('Dans onLogin connexion', connexion);
	
	this.connexionsService.login(connexion)
	    .then(
		() => {
		    console.log('Dans onLogin part', this.part);
		    this.connexionForm.reset();
		    this.loading = false;
		    this.router.navigate(['/', this.partString]);
		}
	    )
	    .catch(
		(error) => {
		    switch (error.status) {
			case 0:
			    this.errorMessage = 'Dans backend lancer nodemon server';
			    break;
			case 401:
			    this.errorMessage = 'Erreur d\'authentification';
			    break;
			default:
			    this.errorMessage = error.message;
			    break;
		    }
		    console.log('Dans onLogin Erreur', error);
		    this.loading = false;
		}
	    );
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
