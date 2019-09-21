import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CompteModel } from '../models/compte.model';

import * as M from '../irp-provider/managementLibrary';
import * as O from '../models/outils';

@Injectable({
    providedIn: 'root'
})

export class CompteService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    token: string;  /* utilisé dans intercept */
    userId: string; /* utilisé dans intercept */

    private compte_a: CompteModel[] = [];
    public compte_a$ = new BehaviorSubject<CompteModel[]>([]);

    private currentCompte = new CompteModel();
    public currentCompte$ = new BehaviorSubject<CompteModel>(this.currentCompte);
    private loading:boolean = false;
    
    uri_all = 'http://localhost:3000/api/all-comptes/';

    constructor(private router: Router,
		private http: HttpClient)
		{
		    console.log('Entrée dans constructor avec router ', router)
		    console.log('Entrée dans constructor avec http client ',http)
		}

    createNewCompte(compte: CompteModel) { /* signup */
	console.log('Entrée dans createNewCompte avec compte ', compte);

	const uri_signup = this.uri_all + 'signup';

	return new Promise((resolve, reject) => {
	    this.http.post(uri_signup, compte) /* utilise compteCtrl.js.signup */
		.subscribe(
		    (resp) => {
			this.login (compte.email, compte.password)
			    .then(
				(res) => {
				    resolve(res);
				},
			    ).catch (
				(error) => {
				    console.log('Dans createNewCompte Erreur', error)
				    reject(error);
				}
			    );
		    },
		    (error) => {
			console.log('Dans createNewCompte Erreur, error')
			reject(error);
		    }
		);
	    console.log('Sortie de createNewCompte');
	});
    }

    deleteCompte(id: string) {
	console.log('Entrée dans deleteCompte avec id',id);

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
    } // deleteCompte

    emitCompte() {
	console.log('Entrée dans emitCompte avec les comptes', this.compte_a);
	this.compte_a$.next(this.compte_a);
    }

    getComptes() {
	console.log('Entrée dans getComptes avec uri_all', this.uri_all);
	this.http.get(this.uri_all).subscribe(
	    (con_a: CompteModel[]) => {
		if (con_a) {
		    this.compte_a = con_a;
		    this.emitCompte();
		}
	    },
	    (error) => {
		console.log('Dans getComptes Erreur:', error);
	    },
	    () => {console.log('Dans getComptes fini !')}
	);
    }

    getCompteById(id: string) {
	console.log('Entrée dans getCompteById avec id', id);

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

    getCompteByEmail(email: string) {
	console.log('Entrée dans getCompteByEmail avec email', email);

	return new Promise((resolve, reject) => {
	    this.http.get(this.uri_all + email).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    console.log('Dans getCompteByEmail Erreur', error);
		    reject(error);
		}
	    );
	});
    }

    getCompteIdByEmail(email: string) {
	console.log('Entrée dans getCompteIdByEmail avec email', email);

	this.getCompteByEmail (email)
	    .then(
		(com: CompteModel) => {
		    console.log('Dans onLogin getCompteIdByEmail com', com);
		    return com._id;
		},
	    ).catch (
		(error) => {
		    console.log('Dans onLogin getCompteIdByEmail Erreur', error);
		}
	    );
    }

    getComptePseudoByEmail(email: string) {
	console.log('Entrée dans getComptePseudoByEmail avec email', email);

	this.getCompteByEmail (email)
	    .then(
		(com: CompteModel) => {
		    console.log('Dans onLogin getComptePseudoByEmail com', com);
		    return com.pseudo;
		},
	    ).catch (
		(error) => {
		    console.log('Dans onLogin getComptePseudoByEmail Erreur', error);
		}
	    );
    }

    login(email:string, password:string) {
	let here ='login';
	console.log('Entrée dans',here,'avec email',email);
	console.log('Entrée dans',here,'avec password',password);

	const uri_login = this.uri_all + 'login';

	return new Promise((resolve, reject) => {
	    this.http.post(uri_login,
			   {email: email, password: password})
		.subscribe(
		    (authData: /* get authData from middleware/auth.js from 3000 */
		     { token: string,
		       userId: string
		     }) => {
			 console.log('Dans login.subscribe authData',authData);

			 this.token = authData.token;
			 this.userId = authData.userId;
			 this.isAuth$.next(true);
			 console.log('Dans login.subscribe token', this.token);
			 console.log('Dans login.subscribe userId', this.userId);
			 console.log('Dans login.subscribe isAuth$', this.isAuth$);
			 resolve();
		     },
		    (error) => {
			console.log('Dans login.subscribe Erreur', error, 'pour uri_login', uri_login);
			reject(error);
		    }
		);
	});
    }

    logout() {
	console.log('Entering in logout');
	this.isAuth$.next(false);
	this.userId = null;
	this.token = null;
    }

}
