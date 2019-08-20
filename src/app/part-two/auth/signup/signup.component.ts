import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

    signupForm: FormGroup;
    loading = false;
    errorMessage: string;

    constructor(private formBuilder: FormBuilder,
		private router: Router,
		private auth: AuthService,
		private state: StateService) {
    	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.state.mode$.next('form');
	this.signupForm = this.formBuilder.group({
	    email: [null, [Validators.required, Validators.email]],
	    password: [null, Validators.required]
	});
    }

    onSignup() {
	console.log('Entrée dans onSignup');
	
	this.loading = true;
	const email = this.signupForm.get('email').value;
	const password = this.signupForm.get('password').value;
	console.log('Dans onSignup email est', email);
	console.log('Dans onSignup password est', password);
	
	this.auth.signup(email, password).
	     then(
		 () => {
		     this.loading = false;
		     if (this.state.part === 1) {
			 this.router.navigate(['/part-one/les-textes']);
		     } else if (this.state.part === 2) {
			 this.router.navigate(['/part-two/les-participants']);
		     } else if (this.state.part === 3) {
			 this.router.navigate(['/part-three/les-buts']);
		     } else if (this.state.part === 4) {
			 this.router.navigate(['/part-four/les-examens']);
		     }
		 }
	     ).catch(
		 (error) => {
		     this.loading = false;
		     this.errorMessage = 'Dans signup.component.ts onSignup Erreur est ' + error.message;
		 }
	     );
    }
}
