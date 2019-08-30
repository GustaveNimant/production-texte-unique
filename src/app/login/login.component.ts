import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService }                 from '../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Une_connexion }                from '../models/Une_connexion.model';
//import { partStringOfNumber }                from '../models/outils';
import { Router }                       from '@angular/router';
import { Subscription }                 from 'rxjs';
import { ConnexionsService }            from '../services/connexions.service';

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
		switch (num) {
		    case 1:
			this.partString = 'part-one';
			break;
		    case 2:
			this.partString = 'part-two';
			break;
		    case 3:
			this.partString = 'part-three';
			break;
		    case 4:
			this.partString = 'part-four';
			break;
		    case 5:
			this.partString = 'part-five';
			break;
		    default:
			this.partString = 'part-five';
			break;
		}
	    }
	);
//	this.partString = this.outils.partStringOfNumber(this.part);
	console.log('Dans ngOnInit partString',this.partString);
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	const connexion = new Une_connexion();
	connexion.email = this.connexionForm.get('email').value;
	connexion.password = this.connexionForm.get('password').value;
	connexion._id = new Date().getTime().toString();

	console.log('Dans onSubmit connexion', connexion);
	
	this.connexionsService.login(connexion.email, connexion.password)
	    .then(
		() => {
		    console.log('Dans onSubmit part', this.part);
		    this.connexionForm.reset();
		    this.loading = false;
		    this.router.navigate(['/', this.partString]);
		}
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur', error);
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
