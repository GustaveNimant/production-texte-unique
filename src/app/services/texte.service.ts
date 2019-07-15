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
	console.log('Entrée dans getTexte');
	this.http.get(this.uri).subscribe(
	    (texte: Texte[]) => {
		if (texte) {
		    this.texte = texte;
		    this.emitTexte();
		}
	    },
	    (error) => {
		console.log('Erreur dans getTexte ', error);
      }
    );
  }

  emitTexte() {
    this.texte$.next(this.texte);
  }

  getTexteById(id: string) {
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
