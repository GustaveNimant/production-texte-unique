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
	console.log('Entrée dans constructor avec router ', router, ' http client ',http)
    }
    
    signup(email: string, password: string) {
	console.log('Entrée dans signup avec email ', email, ' password ',password);
	const uri_signup = 'http://localhost:3000/api/auth/signup';

	return new Promise((resolve, reject) => {
	    this.http.post(
		uri_signup,
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
			console.log('Dans signup.subscribe Erreur est', error, ' pour uri_signup', uri_signup);
			reject(error);
		    }
		);
	});
    }
    
    login(email: string, password: string) {
	console.log('Entrée dans login email est >', email, '< et password est >',password, '<');
	const uri_login = 'http://localhost:3000/api/auth/login';

	return new Promise((resolve, reject) => {
	    this.http.post(
		uri_login,
		{ email: email, password: password })
		.subscribe(
		    (authData:
		     { token: string,
		       connexionId: string
		     }) => {
			this.token = authData.token;
			this.connexionId = authData.connexionId;
			this.isAuth$.next(true);
			console.log('Dans login.subscribe token est >', this.token,'<');
			resolve();
		    },
		    (error) => {
			console.log('Dans login.subscribe Erreur est', error, ' pour uri_login', uri_login);
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
