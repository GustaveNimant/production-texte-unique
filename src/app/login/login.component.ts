import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router }                       from '@angular/router';
import { CompteModel }               from '../models/compte.model';
import { partStringOfNumber }           from '../models/outils';
import { CompteService }            from '../services/compte.service';
import { StateService }                 from '../services/state.service';
import { IrpRegisterService }   from '../services/irp-register.service';
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
    public currentEmail: string;
    public partString: string;
    public userId: string;
    public errorMessage: string;
    public errorSubMessage: string;

    private partSub: Subscription;
    private currentUrlSub: Subscription;
    private currentSub: Subscription;

    constructor(private stateService: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private irpRegisterService: IrpRegisterService,
		private compteService: CompteService){
	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('%cEntrée dans %cngOnInit','color: #00aa00','color: #0000aa');;

	this.compteService.isAuth$.next(true);
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
	let here = 'onLogin';
	console.log('%cEntrée dans %c','color: #00aa00','color: #0000aa', here);;
	
	this.loading = true;

	const email = this.loginForm.get('email').value;
	const password = this.loginForm.get('password').value;

	console.log('Dans onLogin email', email);
	console.log('Dans onLogin password', password);
	
//Tentative	this.stateService.currentEmail$.next(email);
	let irpRegister = this.irpRegisterService.irpRegister;
        let irpKey = 'CurrentEmail';
	let irpVal = email;
	this.irpRegisterService.irpStore(irpKey, irpVal, here);
	this.irpRegisterService.irpRegister$.next(irpRegister)
	
	this.compteService.login(email, password)
	    .then(
		() => {
		    this.loginForm.reset();
		    this.loading = false;
		    console.log('Dans onLogin currentUrl >', this.currentUrl,'<');

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
			    this.errorSubMessage = 'Créer la compte avec ces paramètres';
			    console.log('Dans onLogin.login navigation vers','/part-five/new-compte' + '/' + email);
			    this.router.navigate(['/part-five/new-compte' + '/' + email]);
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
	console.log('%cDans ngOnDestroy partSub unsubscribe','color:#aa0000');
	this.currentUrlSub.unsubscribe();
	console.log('%cDans ngOnDestroy currentUrlSub unsubscribe','color:#aa0000');
    }

}
