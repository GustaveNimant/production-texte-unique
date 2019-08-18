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
    connexionId: string;
    
    constructor(private router: Router,
		private http: HttpClient) {
	console.log('Entering in constructor with router ', router, ' http client ',http)
    }
    
    createNewUser(email: string, password: string) {
	console.log('Entering in createNewUser with email ', email, ' password ',password);
	const uri = 'http://localhost:3000/api/auth/signup';

	return new Promise((resolve, reject) => {
	    this.http.post(
		uri,
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
	console.log('Entrée dans login email est >', email, '< et password est >',password, '<');
	const uri = 'http://localhost:3000/api/auth/login';

	return new Promise((resolve, reject) => {
	    this.http.post(
		uri,
		{ email: email, password: password })
		.subscribe(
		    (authData:
		     { token: string,
		       connexionId: string
		     }) => {
			this.token = authData.token;
			this.connexionId = authData.connexionId;
			this.isAuth$.next(true);
			console.log('Dans login.subscribe token is ', this.token);
			resolve();
		    },
		    (error) => {
			console.log('Dans login.subscribe error', error, ' pour uri', uri);
			reject(error);
          }
		);
	});
    }
    
    logout() {
	console.log('Entering in logout');
	this.isAuth$.next(false);
	this.connexionId = null;
	this.token = null;
    }
}
