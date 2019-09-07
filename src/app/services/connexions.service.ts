import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConnexionModel } from '../models/connexion.model';

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

    private connexions: ConnexionModel[] = [];

    public connexions$ = new Subject<ConnexionModel[]>();

    createNewConnexion(connexion: ConnexionModel) { /* signup */
	console.log('Entrée dans createNewConnexion avec connexion ', connexion);

	const uri_signup = this.uri_all + 'signup';

	return new Promise((resolve, reject) => {
	    this.http.post(uri_signup, connexion) /* utilise connexionCtrl.js.signup */
		.subscribe(
		    (resp) => {
			this.login (connexion)
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
	    console.log('Sortie de createNewConnexion');
	});
    }

    login(connexion: ConnexionModel) {
	console.log('Entrée dans login avec connexion',connexion);

	const uri_login = this.uri_all + 'login';
	
	return new Promise((resolve, reject) => {
	    this.http.post(uri_login, connexion)
		.subscribe(
		    (authData: /* get authData from middleware/auth.js from 3000 */
		     { token: string,
		       connexionId: string
		     }) => {
			 console.log('Dans login.subscribe authData',authData);

			 this.token = authData.token;
			 this.connexionId = authData.connexionId;
			 this.isAuth$.next(true);
			 console.log('Dans login.subscribe isAuth$ assigné à true');
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
	    (con_a: ConnexionModel[]) => {
		if (con_a) {
		    this.connexions = con_a;
		    this.emitConnexion();
		}
	    },
	    (error) => {
		console.log('Dans getConnexions Erreur:', error);
	    },
	    () => {console.log('Dans getConnexions fini !')}
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
