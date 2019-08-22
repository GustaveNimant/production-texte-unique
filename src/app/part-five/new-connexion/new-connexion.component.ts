import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService }                 from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Une_connexion }                from '../../models/Une_connexion.model';
import { Router }                       from '@angular/router';
import { Subscription }                 from 'rxjs';
import { ConnexionsService }            from '../../services/connexions.service';

@Component({
    selector: 'app-new-connexion',
    templateUrl: './new-connexion.component.html',
    styleUrls: ['./new-connexion.component.scss']
})

export class NewConnexionComponent implements OnInit, OnDestroy {

    public connexionForm: FormGroup;
    public loading = false;
    public part: number;
    public connexionId: string;
    public errorMessage: string;

    private partSub: Subscription;

    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private connexionsService: ConnexionsService){
	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.state.mode$.next('form');
	this.connexionForm = this.formBuilder.group({
	    email: [null, Validators.required],
	    password: [null, Validators.required],
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

	const connexion = new Une_connexion();
	connexion.email = this.connexionForm.get('email').value;
	connexion.password = this.connexionForm.get('password').value;
	connexion._id = new Date().getTime().toString();

	this.connexionsService.createNewConnexion(connexion)
	    .then(
		() => {
		    this.connexionForm.reset();
		    this.loading = false;
		    switch (this.part) {
			case 1:
			    this.router.navigate(['/part-one/les-textes']);
			    break;
			case 2:
			    this.router.navigate(['/part-two/les-participants']);
			    break;
			case 3:
			    this.router.navigate(['/part-three/les-buts']);
			    break;
			case 4:
			    this.router.navigate(['/part-four/les-notations']);
			    break;
			case 5:
			    this.router.navigate(['/part-five/les-connexions']);
			    break;
		    }
		}
	    )
	    .catch(
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
