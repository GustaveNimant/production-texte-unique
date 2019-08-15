import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Un_texte } from '../models/Un_texte.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class TextesService {

    uri = 'http://localhost:3000/api/les-textes';
    uri_new = 'http://localhost:3000/api/new-texte';

    constructor(private http: HttpClient) {};

    private textes: Un_texte[] = [
	{
	    _id: '324sdfmoih3',
	    titre: 'Mon texte',
	    contenu: 'Un nouveau texte',
	    shasum: '5cf15f9b922a5d1b9e34216c',
	    noteMoyenne: 4.9,
	    participantId: 'will'
	},
	{
	    _id: '324sdfmoih4',
	    titre: 'Un ancien texte',
	    contenu: 'All about my texte',
	    shasum: '5d137afeb2019211cf28b273',
	    noteMoyenne: 2.5,
	    participantId: 'will'
	},
    ];

    public textes$ = new Subject<Un_texte[]>();

    getTextes() {
	console.log('Entrée dans getTexte avec uri', this.uri);
	this.http.get(this.uri).subscribe(
	    (des_textes: Un_texte[]) => {
		if (des_textes) {
		    this.textes = des_textes;
		    this.emitTexte();
		}
	    },
	    (error) => {
		console.log('getTexte Erreur:', error);
	    },
	    () => {console.log('getTexte fini !')}
	);
    }

    emitTexte() {
	console.log('Entrée dans emitTexte avec texte', this.textes);
	this.textes$.next(this.textes);
    }

    getTexteById(id: string) {
	console.log('Entrée dans getTexteById avec id', id);

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

    createNewTexte(texte: Un_texte) {
	console.log('Entrée dans createNewTexte avec texte', texte);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri, texte).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    console.log('Erreur dans createNewTexte');
		    reject(error);
		},
		() => {
		    console.log('Sortie de createNewTexte');
		}
	    );
	});
    }

    createNewTexteWithFile(texte: Un_texte, image: File) {
	console.log('Entrée dans createNewTexteWithFile avec texte', texte);
	return new Promise((resolve, reject) => {
	    const texteData = new FormData();
	    
	    texteData.append('texte', JSON.stringify(texte));
	    texteData.append('image', image, texte.titre);
	    
	    this.http.post(this.uri_new, texteData).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    modifyTexte(id: string, texte: Un_texte) {
	console.log('Entrée dans modifyTexte avec id',id, 'et texte', texte);
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

    modifyTexteWithFile(id: string, texte: Un_texte, image: File | string) {
	console.log('Entrée dans modifyTexteWithFile avec id',id, 'et texte', texte);
	return new Promise((resolve, reject) => {
	    let texteData: Un_texte | FormData;
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
	console.log('Entrée dans deleteTexte avec id',id);

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
