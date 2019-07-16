import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Texte } from '../models/Texte.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class TexteService {

    uri = 'http://localhost:3000/api/les-textes';

    constructor(private http: HttpClient) {}

    private texte: Texte[] = [
	{
	    _id: '324sdfmoih3',
	    titre: 'My texte',
	    contenu: 'All about my texte',
	    shasum: '',
	    noteMoyenne: 4900,
	    participantId: 'will'
	},
	{
	    _id: '324sdfmoih4',
	    titre: 'Another texte',
	    contenu: 'All about my texte',
	    shasum: '',
	    noteMoyenne: 2600,
	    participantId: 'will'
	},
    ];

    public texte$ = new Subject<Texte[]>();

    getTexte() {
	console.log('Entrée dans getTexte uri', this.uri);
	this.http.get(this.uri).subscribe(
	    (des_textes: Texte[]) => {
		if (des_textes) {
		    this.texte = des_textes;
		    this.emitTexte();
		}
	    },
	    (error) => {
		console.log('Erreur dans getTexte ', error);
	    }
	);
    }

    emitTexte() {
	console.log('Entrée dans emitTexte texte est', this.texte);
	this.texte$.next(this.texte);
    }

    getTexteById(id: string) {
	console.log('Entrée dans getTexteById id est', id);
	return new Promise((resolve, reject) => {
	    this.http.get(this.uri + id).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    createNewTexte(texte: Texte) {
	console.log('Entrée dans createNewTexte texte est', texte);
	return new Promise((resolve, reject) => {
	    this.http.post(this.uri, texte).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    createNewTexteWithFile(texte: Texte, image: File) {
	console.log('Entrée dans createNewTexteWithFile texte est', texte);
	return new Promise((resolve, reject) => {
	    const texteData = new FormData();
	    texteData.append('texte', JSON.stringify(texte));
	    texteData.append('image', image, texte.titre);
	    this.http.post(this.uri, texteData).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    modifyTexte(id: string, texte: Texte) {
	console.log('Entrée dans modifyTexte id est',id, 'texte est', texte);
	return new Promise((resolve, reject) => {
	    this.http.put(this.uri + id, texte).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    modifyTexteWithFile(id: string, texte: Texte, image: File | string) {
	console.log('Entrée dans modifyTexteWithFile id est',id, 'texte est', texte);
	return new Promise((resolve, reject) => {
	    let texteData: Texte | FormData;
	    if (typeof image === 'string') {
		texte.shasum = image;
		texteData = texte;
	    } else {
		texteData = new FormData();
		texteData.append('texte', JSON.stringify(texte));
		texteData.append('image', image, texte.titre);
	    }
	    this.http.put(this.uri + id, texteData).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    deleteTexte(id: string) {
	console.log('Entrée dans deleteTexte id est',id);
	return new Promise((resolve, reject) => {
	    this.http.delete(this.uri + id).subscribe(
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
