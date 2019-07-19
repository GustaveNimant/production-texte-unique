import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  participantId: string;

    constructor(private router: Router,
		private http: HttpClient) {
	console.log('Entering in constructor with router ', router, ' http client ',http)
    }
    
    createNewUser(email: string, password: string) {
	console.log('Entering in createNewUser with email ', email, ' password ',password);
	return new Promise((resolve, reject) => {
	    this.http.post(
		'http://localhost:3000/api/auth/signup',
		{ email: email, password: password })
		.subscribe(
		    () => {
			this.login(email, password)
			    .then(
				() => {
				    resolve();
				}
			    ).catch(
				(error) => {
				    reject(error);
				}
			    );
		    },
		    (error) => {
			reject(error);
		    }
		);
	});
    }
    
    login(email: string, password: string) {
	console.log('Entering in login with email >', email, '< password >',password, '<');

	return new Promise((resolve, reject) => {
	    this.http.post(
		'http://localhost:3000/api/auth/login',
		{ email: email, password: password })
		.subscribe(
		    (authData: { token: string, participantId: string }) => {
			this.token = authData.token;
			this.participantId = authData.participantId;
			this.isAuth$.next(true);
			console.log('In login.subscribe token is ', this.token);
			resolve();
		    },
		    (error) => {
			console.log('In login subscribe error ', error);
			reject(error);
          }
		);
	});
    }
    
    logout() {
	// console.log('Entering in logout');
	this.isAuth$.next(false);
	this.participantId = null;
	this.token = null;
    }
}
