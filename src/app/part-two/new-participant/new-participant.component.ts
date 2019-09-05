import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                       from '@angular/router';
import { Subscription }                 from 'rxjs';
import { Un_participant }               from '../../models/Un_participant.model';
import { ConnexionsService }            from '../../services/connexions.service';
import { ParticipantsService }          from '../../services/participants.service';
import { StateService }                 from '../../services/state.service';

@Component({
    selector: 'app-new-participant',
    templateUrl: './new-participant.component.html',
    styleUrls: ['./new-participant.component.scss']
})

export class NewParticipantComponent implements OnInit, OnDestroy {

    public participantForm: FormGroup;
    public loading = false;
    public part: number;
    public connexionId: string;
    public errorMessage: string;

    private partSub: Subscription;

    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private participantsService: ParticipantsService,
		private router: Router,
		private connexionService: ConnexionsService) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.state.mode$.next('form');
	this.participantForm = this.formBuilder.group({
	    email: [null, Validators.required],
	    pseudo: [null, Validators.required],
	    password: [null, Validators.required],
	    connexionId: [null]
	});
	this.partSub = this.state.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);
	this.connexionId = this.part == 2 ? this.connexionService.connexionId : 'participantID40282382';
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	const participant = new Un_participant();
	participant.email = this.participantForm.get('email').value;
	participant.pseudo = this.participantForm.get('pseudo').value;
	participant.password = this.participantForm.get('password').value;
//	participant.connexionId = this.participantForm.get('connection_id').value;
	participant._id = new Date().getTime().toString();

	console.log('Dans onSubmit le participant est', participant);
	
	this.participantsService.createNewParticipant(participant)
	    .then(
		() => {
		    this.participantForm.reset();
		    this.loading = false;
		    switch (this.part) {
			case 1:
			    this.router.navigate(['/part-one/les-textes']);
			    break;
			case 2:
			    this.router.navigate(['/part-two/les-participants']);
			    break;
			case 3:
			    this.router.navigate(['/part-three/les-buts']);
			    break;
			case 4:
			    this.router.navigate(['/part-four/les-notations']);
			    break;
			case 5:
			    this.router.navigate(['/part-five/les-connexions']);
			    break;
		    }
		}
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur est', error);
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
