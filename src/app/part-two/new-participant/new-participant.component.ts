import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { ParticipantModel }             from '../../models/participant.model';
import { ConnexionService }            from '../../services/connexion.service';
import { ParticipantService }          from '../../services/participant.service';
import { StateService }                 from '../../services/state.service';
import { Subscription }                 from 'rxjs';

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
		private participantService: ParticipantService,
		private router: Router,
		private connexionService: ConnexionService) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.state.mode$.next('form');
	this.participantForm = this.formBuilder.group({
	    nom: [null, Validators.required],
	    prenom: [null, Validators.required],
	    email: [null, Validators.required],
	    pseudo: [null, Validators.required],
	    password: [null, Validators.required],
	    clePublique: [null, Validators.required],
	    connexionId: [null, Validators.required],
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

	const participant = new ParticipantModel();
	
	participant.nom = this.participantForm.get('nom').value;
	participant.prenom = this.participantForm.get('prenom').value;
	participant.email = this.participantForm.get('email').value;
	participant.pseudo = this.participantForm.get('pseudo').value;
	participant.password = this.participantForm.get('password').value;
	participant.clePublique = this.participantForm.get('clePublique').value;
	participant.connexionId = this.participantForm.get('connexionId').value;

	participant._id = new Date().getTime().toString();

	console.log('Dans onSubmit le participant est', participant);
	
	this.participantService.createNewParticipant(participant)
	    .then(
		() => {
		    this.participantForm.reset();
		    this.loading = false;
		    this.router.navigate(['/part-two/list-participant']);
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
