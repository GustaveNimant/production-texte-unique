import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Un_texte } from '../models/Un_texte.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class TextesService {

    uri_all = 'http://localhost:3000/api/all-textes/';
    uri_new = this.uri_all;

    constructor(private http: HttpClient) {};

    private textes: Un_texte[] = [
	{
	    _id: '324sdfmoih3',
	    titre: 'Mon texte',
	    contenu: 'Un nouveau texte',
	    shasum: '5cf15f9b922a5d1b9e34216c',
	    noteMoyenne: 4.9,
	    noteEcartType: 0.7,
	    auteurId: 'will',
	    _v: 0
	},
	{
	    _id: '324sdfmoih4',
	    titre: 'Un ancien texte',
	    contenu: 'All about my texte',
	    shasum: '5d137afeb2019211cf28b273',
	    noteMoyenne: 2.5,
	    noteEcartType: 0.3,
	    auteurId: 'will',
	    _v: 0
	},
    ];

    public textes$ = new Subject<Un_texte[]>();

    getTextes() {
	console.log('Entrée dans getTextes avec uri_all', this.uri_all);
	this.http.get(this.uri_all).subscribe(
	    (des_textes: Un_texte[]) => {
		if (des_textes) {
		    this.textes = des_textes;
		    this.emitTexte();
		}
	    },
	    (error) => {
		console.log('Dans getTextes Erreur:', error);
	    },
	    () => {console.log('Dans getTextes fini !')}
	);
    }

    emitTexte() {
	console.log('Entrée dans emitTexte avec les textes', this.textes);
	this.textes$.next(this.textes);
    }

    getTexteById(id: string) {
	console.log('Entrée dans getTexteById avec id', id);

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

    createNewTexte(texte: Un_texte) {
	console.log('Entrée dans createNewTexte avec texte', texte);

	if (texte.auteurId == undefined) {
	    texte.auteurId = "someId";
	}
	if (texte.shasum == null) {
	    texte.shasum = "someShasum";
	}
	console.log('Dans createNewTexte avec texte', texte);
	
	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_new, texte).subscribe(
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
	    this.http.put(this.uri_all + id, texte).subscribe(
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
	    this.http.put(this.uri_all + id, texteData).subscribe(
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
