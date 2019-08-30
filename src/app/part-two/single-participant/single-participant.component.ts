import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Un_participant } from '../../models/Un_participant.model';
import { ParticipantsService } from '../../services/participants.service';
import { Subscription } from 'rxjs';
import { ConnexionsService } from '../../services/connexions.service';

@Component({
    selector: 'app-single-participant',
    templateUrl: './single-participant.component.html',
    styleUrls: ['./single-participant.component.scss']
})
export class SingleParticipantComponent implements OnInit, OnDestroy {

    public participant: Un_participant;
    public loading: boolean;
    public participantId: string;
    public part: number;

    private partSub: Subscription;

    constructor(private state: StateService,
		private router: Router,
		private route: ActivatedRoute,
		private participantsService: ParticipantsService,
		private auth: ConnexionsService) {
	console.log('Entrée dans constructor');
    }
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.loading = true;
	this.state.mode$.next('single-participant');
	this.participantId = this.auth.connexionId ? this.auth.connexionId : 'participantID40282382';
	this.route.params.subscribe(
	    (params: Params) => {
		this.participantsService.getParticipantById(params.id)
		    .then(
			(participant: Un_participant) => {
			    console.log('Dans ngOnInit participant', participant);
			    this.loading = false;
			    this.participant = participant;
			}
		    );
	    }
	);
	this.partSub = this.state.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
		if (num == 2) {
		    this.participantId = this.auth.connexionId;
		}
	    }
	);
    }

    onGoBack() {
	if (this.part === 1) {
	    this.router.navigate(['/part-one/all-texte']);
	} else if (this.part === 2) {
	    this.router.navigate(['/part-two/all-participant']);
	} else if (this.part === 3) {
	    this.router.navigate(['/part-three/all-but']);
	} else if (this.part === 4) {
	    this.router.navigate(['/part-four/all-examen']);
	}  else if (this.part === 5) {
	this.router.navigate(['/part-five/all-connexion']);
	}
    }

    onModify() {
	this.router.navigate(['/part-two/modify-participant/' + this.participant._id]);
    }

    onDelete() {
	this.loading = true;
	this.participantsService.deleteParticipant(this.participant._id).then(
	    () => {
		this.loading = false;
		switch (this.part) {
		    case 1:
			this.router.navigate(['/part-one/all-texte']);
			break;
		    case 2:
			this.router.navigate(['/part-two/all-participant']);
			break;
		    case 3:
			this.router.navigate(['/part-three/all-participant']);
			break;
		    case 4:
			this.router.navigate(['/part-four/all-participant']);
			break;
		}
	    }
	);
    }

    ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
