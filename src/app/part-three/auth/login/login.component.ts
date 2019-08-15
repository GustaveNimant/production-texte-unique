import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    errorMessage: string;

    constructor(private formBuilder: FormBuilder,
		private router: Router,
		private auth: AuthService,
		private state: StateService) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.state.mode$.next('form');
	this.loginForm = this.formBuilder.group({
	    email: [null, [Validators.required, Validators.email]],
	    password: [null, Validators.required],
	    _id: [null] /* Improve */ 
	});
    }

    onLogin() {
	console.log('Entrée dans onLogin');
	this.loading = true;
	const email = this.loginForm.get('email').value;
	const password = this.loginForm.get('password').value;
	const id = this.loginForm.get('_id').value; /* Improve */
	console.log('Dans onLogin email est ', email);
	console.log('Dans onLogin password est ', password);
	console.log('Dans onLogin id est ', id);
	this.auth.login(email, password)
	    .then(
		() => {
		    this.loading = false;
		    if (this.state.part === 3) {
			this.router.navigate(['/part-three/les-textes']);
		    } else if (this.state.part === 4) {
			this.router.navigate(['/part-four/les-textes']);
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
    
}
