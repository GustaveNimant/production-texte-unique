import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ParticipantsService } from '../../services/participants.service';
import { Subscription } from 'rxjs';
import { Un_participant } from '../../models/Un_participant.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-participants-list',
    templateUrl: './participants-list.component.html',
    styleUrls: ['./participants-list.component.scss']
})

export class ParticipantsListComponent implements OnInit, OnDestroy {

    public participants: Un_participant[] = [];
    public part: number;
    public loading: boolean;

    private participantsSub: Subscription;
    private partSub: Subscription;

    constructor(private state: StateService,
		private participantsService: ParticipantsService,
		private router: Router) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.loading = true;
	this.state.mode$.next('list');
	this.participantsSub = this.participantsService.participants$.subscribe(
	    (les_participants) => {
		this.participants = les_participants;
		this.loading = false;
	    }
	);
	this.partSub = this.state.part$.subscribe(
	    (a_part) => {
		this.part = a_part;
	    }
	);
	this.participantsService.getParticipants();
    }

    onParticipantClicked(id: string) {
	if (this.part === 2) {
	    this.router.navigate(['/part-two/un_participant/' + id]);
	}
    }

    ngOnDestroy() {
	this.participantsSub.unsubscribe();
	this.partSub.unsubscribe();
    }

}
