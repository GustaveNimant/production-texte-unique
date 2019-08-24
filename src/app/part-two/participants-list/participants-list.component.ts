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
    public debug: boolean;

    private participantsSub: Subscription;
    private partSub: Subscription;

    constructor(private stateService: StateService,               /* BehaviorSubjects */
		private participantsService: ParticipantsService, /* Subjects */
		private router: Router) {
    	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.debug = this.stateService.debug;
	console.log('Dans ngOnInit debug', this.debug);
	
	this.stateService.mode$.next('list');
	this.participantsSub = this.participantsService.participants$.subscribe(
	    (les_participants) => {
		this.participants = les_participants;
		this.loading = false;
	    }
	);
	this.partSub = this.stateService.part$.subscribe((num) => {this.part = num;});
	this.participantsService.getParticipants();
    }

    onParticipantClicked(id: string) {
	console.log('Entrée dans onParticipantClicked avec id', id);
	console.log('Entrée dans onParticipantClicked avec part', this.part);
	console.log('Entrée dans onParticipantClicked navigation vers ', '/part-two/un_participant/' + id);
	this.router.navigate(['/part-two/un_participant/' + id]);
    }

    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.participantsSub.unsubscribe();
	this.partSub.unsubscribe();
    }

}
