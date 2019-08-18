import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService }                 from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Un_participant }               from '../../models/Un_participant.model';
import { ParticipantsService }          from '../../services/participants.service';
import { Router }                       from '@angular/router';
import { Subscription }                 from 'rxjs';
import { AuthService }                  from '../../services/auth.service';

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
		private auth: AuthService) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.state.mode$.next('form');
	this.participantForm = this.formBuilder.group({
	    email: [null, Validators.required],
	    pseudo: [null, Validators.required],
	    password: [null],
	    connexionId: [null]
	});
	this.partSub = this.state.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);
	this.connexionId = this.part == 2 ? this.auth.connexionId : 'participantID40282382';
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	this.loading = true;

	const participant = new Un_participant();
	participant.email = this.participantForm.get('email').value;
	participant.pseudo = this.participantForm.get('pseudo').value;
	participant.password = this.participantForm.get('password').value;
	participant.connexionId = this.participantForm.get('connection_id').value;
	participant._id = new Date().getTime().toString();

	this.participantsService.createNewParticipant(participant)
	    .then(
		() => {
		    this.participantForm.reset();
		    this.loading = false;
		    switch (this.part) {
			case 1:
			case 2:
			    this.router.navigate(['/part-two/les-participants']);
			    break;
			case 3:
			    this.router.navigate(['/part-three/les-participants']);
			    break;
			case 4:
			    this.router.navigate(['/part-four/les-participants']);
			    break;
		    }
		}
	    )
	    .catch(
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
