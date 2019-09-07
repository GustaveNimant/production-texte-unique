import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ParticipantModel } from '../models/participant.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ParticipantService {

    uri_all = 'http://localhost:3000/api/all-participants/';
    uri_new = this.uri_all;

    constructor(private http: HttpClient) {
	console.log('Entrée dans constructor');
    };

    private participants: ParticipantModel[] = [
	{
	    _id: '324sdfmoih3',
	    email: 'emile.achadde@free.fr',
	    pseudo: 'emile',
	    password: 'azerty',
	    connexionId: '324connexion3',
	    _v: 0
	},
    ];

    public participants$ = new Subject<ParticipantModel[]>();

    getParticipants() {
	console.log('Entrée dans getParticipants avec uri', this.uri_all);

	this.http.get(this.uri_all).subscribe(
	    (par_a: ParticipantModel[]) => {
		if (par_a) {
		    this.participants = par_a;
		    this.emitParticipants();
		}
	    },
	    (error) => {
		console.log('Dans getParticipants Erreur:', error);
	    },
	    () => {console.log('getParticipants fini !')}
	);
    }

    emitParticipants() {
	console.log('Entrée dans emitParticipant avec participants', this.participants);
	this.participants$.next(this.participants);
    }

    getParticipantById(id: string) {
	console.log('Entrée dans getParticipantById avec id', id);

	return new Promise(
	    (resolve, reject) => {
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
    
    createNewParticipant(participant: ParticipantModel) {
	console.log('Entrée dans createNewParticipant avec participant', participant);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_all, participant) /* POST => createParticipantCtrl par uri_all */
		.subscribe(
		    (response) => {
			console.log('Dans createNewParticipant respons est', response);
			resolve(response);
		    },
		    (error) => {
			console.log('Erreur dans createNewParticipant');
			reject(error);
		    },
		    () => {
			console.log('Sortie de createNewParticipant');
		    }
		);
	});
    }

    createNewParticipantWithFile(participant: ParticipantModel, image: File) { /* pas d'image */
	console.log('Entrée dans createNewParticipantWithFile avec participant', participant);

	return new Promise((resolve, reject) => {
	    
	    const participantData = new FormData();
	    participantData.append('participant', JSON.stringify(participant));
	    participantData.append('image', image, participant.pseudo);
	    
	    this.http.post(this.uri_new, participantData).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    modifyParticipant(id: string, participant: ParticipantModel) {
	console.log('Entrée dans modifyParticipant avec id',id, 'et participant', participant);

	return new Promise((resolve, reject) => {
	    this.http.put(this.uri_all + id, participant).subscribe(
		(response) => {
		    resolve(response);
		},
		(error) => {
		    reject(error);
		}
	    );
	});
    }

    deleteParticipant(id: string) {
	console.log('Entrée dans deleteParticipant avec id',id);

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
