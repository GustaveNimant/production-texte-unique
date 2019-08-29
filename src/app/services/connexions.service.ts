import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Une_connexion } from '../models/Une_connexion.model';

@Injectable({
    providedIn: 'root'
})

export class ConnexionsService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    token: string; /* utilisé dans intercept */
    connexionId: string;

    uri_all = 'http://localhost:3000/api/all-connexions/';

    constructor(private router: Router,
		private http: HttpClient) {
	console.log('Entrée dans constructor avec router ', router, ' http client ',http)
    }

    private connexions: Une_connexion[] = [
	{
	    _id: 'idconnexion',
	    email: 'machin@truc.fr',
	    password: 'un mot de passe',
	    _v: 0
	}
    ];

    public connexions$ = new Subject<Une_connexion[]>();

    createNewConnexion(connexion: Une_connexion) { /* signup */
	console.log('Entrée dans createNewConnexion avec connexion ', connexion);

	const uri_signup = this.uri_all + 'signup';

	return new Promise((resolve, reject) => {
	    this.http.post(uri_signup, connexion) /* utilise connexionCtrl.js.signup */
		.subscribe(
		    (res) => {
			this.login (connexion.email, connexion.password)
			    .then(
				(res) => {
				    resolve(res);
				},
			    ).catch (
				(error) => {
				    console.log('Dans createNewConnexion Erreur', error)
				    reject(error);
				}
			    );
		    },
		    (error) => {
			console.log('Dans createNewConnexion Erreur, error')
			reject(error);
		    }
		);
	});
	console.log('Sortie de createNewConnexion');
    }

    createNewConnexionWithLogin(connexion: Une_connexion) { /* signup */
	console.log('Entrée dans createNewConnexionWithLogin avec connexion ', connexion);
	
	const uri_signup = this.uri_all + 'signup';

	return new Promise((resolve, reject) => {
	    this.http.post(uri_signup, connexion).subscribe(
		() => {
		    this.login(connexion.email, connexion.password)
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
		    console.log('Dans createNewConnexionWithLogin.subscribe Erreur', error, ' pour uri_signup', uri_signup);
		    reject(error);
		}
	    );
	});
    }

    login(email: string, password: string) {
	console.log('Entrée dans login email >', email, '< et password >',password, '<');

	const uri_login = this.uri_all + 'login';
	
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
			 console.log('Dans login.subscribe token >', this.token,'<');
			 resolve();
		     },
		    (error) => {
			console.log('Dans login.subscribe Erreur', error, ' pour uri_login', uri_login);
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

    emitConnexion() {
	console.log('Entrée dans emitConnexion avec les connexions', this.connexions);
	this.connexions$.next(this.connexions);
    }

    getConnexions() {
	console.log('Entrée dans getConnexions avec uri_all', this.uri_all);
	this.http.get(this.uri_all).subscribe(
	    (des_connexions: Une_connexion[]) => {
		if (des_connexions) {
		    this.connexions = des_connexions;
		    this.emitConnexion();
		}
	    },
	    (error) => {
		console.log('getConnexions Erreur:', error);
	    },
	    () => {console.log('getConnexions fini !')}
	);
    }

    getConnexionById(id: string) {
	console.log('Entrée dans getConnexionById avec id', id);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + id).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    deleteConnexion(id: string) {
	console.log('Entrée dans deleteConnexion avec id',id);

	return new Promise((resolve, reject) => {
	    this.http.delete(this.uri_all + id).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

}
