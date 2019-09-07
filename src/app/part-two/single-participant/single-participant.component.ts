import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParticipantModel } from '../../models/participant.model';
import { ParticipantService } from '../../services/participant.service';
import { ConnexionService }   from '../../services/connexion.service';
import { StateService }        from '../../services/state.service';
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

    constructor(private state: StateService,
		private router: Router,
		private route: ActivatedRoute,
		private participantService: ParticipantService,
		private auth: ConnexionService) {
	console.log('Entrée dans constructor');
    }
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.loading = true;
	this.state.mode$.next('single-participant');
	this.participantId = this.auth.connexionId ? this.auth.connexionId : 'participantID40282382';
	this.route.params.subscribe(
	    (params: Params) => {
		this.participantService.getParticipantById(params.id)
		    .then(
			(par: ParticipantModel) => {
			    console.log('Dans ngOnInit par', par);
			    this.loading = false;
			    this.participantModel = par;
			}
		    );
	    }
	);
	this.partSub = this.state.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
		this.participantId = this.auth.connexionId;
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
