import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParticipantModel } from '../../models/participant.model';
import { ParticipantService } from '../../services/participant.service';
import { CompteService }   from '../../services/compte.service';
import { StateService }       from '../../services/state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-single-participant',
    templateUrl: './single-participant.component.html',
    styleUrls: ['./single-participant.component.scss']
})
export class SingleParticipantComponent implements OnInit, OnDestroy {

    public participantModel: ParticipantModel;
    public loading: boolean;
    public participantId: string;
    public part: number;

    private partSub: Subscription;

    constructor(private stateService: StateService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private participantService: ParticipantService,
		private compteService: CompteService) {
	console.log('Entrée dans constructor');
    }
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.loading = true;
	this.stateService.mode$.next('single-participant');
	this.participantId = this.compteService.userId ? this.compteService.userId : 'participantID40282382';
	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		this.participantService.getParticipantById(params.id)
		    .then(
			(participant: ParticipantModel) => {
			    console.log('Dans ngOnInit participant', participant);
			    this.loading = false;
			    this.participantModel = participant;
			}
		    );
	    }
	);
	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
		this.participantId = this.compteService.userId;
	    }
	);
    }

    onGoBack() {
	this.router.navigate(['/part-two/list-participant']);
    }

    onModify() {
	this.router.navigate(['/part-two/modify-participant/' + this.participantModel._id]);
    }

    onDelete() {
	this.loading = true;
	this.participantService.deleteParticipant(this.participantModel._id).then(
	    () => {
		this.loading = false;
			this.router.navigate(['/part-two/list-participant']);
	    }
	);
    }

    ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
