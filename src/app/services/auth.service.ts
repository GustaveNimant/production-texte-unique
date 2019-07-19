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
	console.log('Entrée dans constructor avec router ', router, ' et http client ',http)
    }
    
    createNewUser(email: string, password: string) {
	console.log('Entrée dans createNewUser avec email >', email, '< password >',password, '<');
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
	console.log('Entrée dans login avec email >', email, '< password >',password, '<');

	return new Promise((resolve, reject) => {
	    this.http.post(
		'http://localhost:3000/api/auth/login',
		{ email: email, password: password })
		.subscribe(
		    (authData: { token: string, participantId: string }) => {
			this.token = authData.token;
			console.log('Dans login.subscribe token est >', this.token,'<');
			this.participantId = authData.participantId;
			console.log('Dans login.subscribe participantId est >', this.participantId,'<');
			this.isAuth$.next(true);
			console.log('Dans login.subscribe Isauth$ est >', this.isAuth$,'<');
			resolve();
		    },
		    (error) => {
			console.log('Dans login subscribe error ', error);
			reject(error);
          }
		);
	});
    }
    
    logout() {
	console.log('Entrée dans logout');
	this.isAuth$.next(false);
	this.participantId = null;
	this.token = null;
    }
}
