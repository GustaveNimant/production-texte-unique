import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router }                       from '@angular/router';
import { ConnexionModel }               from '../models/connexion.model';
import { partStringOfNumber }           from '../models/outils';
import { ConnexionService }            from '../services/connexion.service';
import { StateService }                 from '../services/state.service';
import { Subscription }                 from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

    public loginForm: FormGroup;
    public loading = false;
    public part: number;
    public currentUrl: string;
    public partString: string;
    public connexionId: string;
    public errorMessage: string;
    public errorSubMessage: string;

    private partSub: Subscription;
    private currentUrlSub: Subscription;

    constructor(private stateService: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private connexionService: ConnexionService){
	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.connexionService.isAuth$.next(true);

	this.stateService.mode$.next('form');

	this.loginForm = this.formBuilder.group({
	    email: [null, [Validators.required, Validators.email]],
	    password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
	});
	
	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
		this.partString = partStringOfNumber(num);
		console.log('Dans ngOnInit partString', this.partString);
	    }
	);

    	this.currentUrlSub = this.stateService.currentUrl$.subscribe(
	    (url) => {
		console.log('Dans ngOnInit url',url);
		this.currentUrl = url;
		console.log('Dans ngOnInit currentUrl', this.currentUrl);
	    }
	);
    }

    onLogin() {
	console.log('Entrée dans onLogin');
	
	this.loading = true;

	const connexion = new ConnexionModel();
	connexion.email = this.loginForm.get('email').value;
	connexion.password = this.loginForm.get('password').value;
	connexion._id = new Date().getTime().toString();

	console.log('Dans onLogin connexion', connexion);
	
	this.stateService.currentConnexionId$.next(connexion._id);
	
	this.connexionService.login(connexion)
	    .then(
		() => {
		    console.log('Dans onLogin part', this.part);
		    this.loginForm.reset();
		    this.loading = false;
		    console.log('Dans onLogin currentUrl >', this.currentUrl);

		    if (this.currentUrl && this.currentUrl != '/login') {
			this.router.navigate([this.currentUrl]);
		    } else {
			this.router.navigate(['/main-menu']);
		    }
		}
	    )
	    .catch(
		(error) => {
		    switch (error.status) {
			case 0:
			    this.errorSubMessage = 'Dans backend lancer nodemon server';
			    break;
			case 401:
			    this.errorSubMessage = 'Créer la connexion avec ces paramètres';
			    this.router.navigate(['/part-five/new-connexion']);
			    break;
			default:
			    this.errorMessage = error.message;
			    break;
		    }
		    console.log('Dans onLogin Erreur', error);
		    this.errorMessage = this.errorSubMessage + ' '+ error.message;
		    this.loading = false;
		}
	    );
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
	this.currentUrlSub.unsubscribe();
    }

}
