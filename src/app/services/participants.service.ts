import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Un_participant } from '../models/Un_participant.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class ParticipantsService {

    uri_all = 'http://localhost:3000/api/les-participants';
    uri_new = 'http://localhost:3000/api/new-participant';

    constructor(private http: HttpClient) {};

    private participants: Un_participant[] = [
	{
	    _id: '324sdfmoih3',
	    email: 'emile.achadde@free.fr',
	    pseudo: 'emile',
	    password: 'azerty',
	    connexion_id: '324connexion3',
	    _v: 0
	},
    ];

    public participants$ = new Subject<Un_participant[]>();

    getParticipants() {
	console.log('Entrée dans getParticipants avec uri', this.uri_all);

	this.http.get(this.uri_all).subscribe(
	    (les_participants: Un_participant[]) => {
		if (les_participants) {
		    this.participants = les_participants;
		    this.emitParticipants();
		}
	    },
	    (error) => {
		console.log('getParticipant Erreur:', error);
	    },
	    () => {console.log('getParticipant fini !')}
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
    
    createNewParticipant(participant: Un_participant) {
	console.log('Entrée dans createNewParticipant avec participant', participant);

	return new Promise((resolve, reject) => {
	    this.http.post(this.uri_all, participant).subscribe(
		(response) => {
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

    createNewParticipantWithFile(participant: Un_participant, image: File) { /* pas d'image */
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

    modifyParticipant(id: string, participant: Un_participant) {
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