import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Une_notation } from '../models/Une_notation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class NotationsService {

    uri_all = 'http://localhost:3000/api/all-notations/';
    
    constructor(private http: HttpClient){};

    private notations: Une_notation[] = [];
    public notations$ = new Subject<Une_notation[]>();

    createNewNotation(notation: Une_notation) {
	console.log('Entrée dans createNewNotation avec notation', notation);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_all, notation)
		.subscribe( /* POST => createNotationCtrl par uri_all */
			    (response) => {
				resolve(response);
			    },
			    (error) => {
				console.log('Dans createNewNotation Erreur de connexion', error);
				reject(error);
			    },
			    () => {
				console.log('Sortie de createNewNotation');
			    }
		);
	});
    }
    
    getNotations() {
	console.log('Entrée dans getNotations avec uri_all', this.uri_all);

	return new Promise((resolve, reject) => {
	    console.log('Dans getNotations resolve', resolve);
	    this.http.get(this.uri_all).subscribe(
		(not_a: Une_notation[]) => {
		    if (not_a) {
			this.notations = not_a;
			this.emitNotation();
		    }
		},
		(error) => {
		    console.log('Dans getNotations Erreur', error);
		    console.log('Dans getNotations error.status', error.status);
		    switch (error.status) {
			case 0:
			    console.log('Dans getNotations run nodemon server');
			    break;
			default:
			    break;
		    }
		},
		() => {
		    console.log('Dans getNotations terminé!')
		}
	    );
	});
    }
    
    emitNotation() {
	console.log('Entrée dans emitNotation avec les notations', this.notations);
	this.notations$.next(this.notations);
    }

    getNotationById(id: string) {
	console.log('Entrée dans getNotationById avec id', id);

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

    deleteNotation(id: string) {
	console.log('Entrée dans deleteNotation avec id',id);

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
