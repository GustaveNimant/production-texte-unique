import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotationModel }     from '../../models/notation.model';
import { NotationsService }  from '../../services/notations.service';
import { ConnexionsService } from '../../services/connexions.service';
import { StateService }      from '../../services/state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-single-notation',
    templateUrl: './single-notation.component.html',
    styleUrls: ['./single-notation.component.scss']
})

export class SingleNotationComponent implements OnInit, OnDestroy {

    public notation: NotationModel;
    public loading: boolean;
    public part: number;

    private partSub: Subscription;

    constructor(private state: StateService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private notationsService: NotationsService,
		private connexionsService: ConnexionsService)
		{
		    console.log('Entrée dans constructor');
		};
    
    ngOnInit(){
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.state.mode$.next('single-notation');

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		this.notationsService.getNotationById(params.id)
		    .then(
			(not: NotationModel) => {
			    console.log('Dans ngOnInit notation', not);
			    this.loading = false;
			    this.notation = not;
			}
		    );
	    }
	);
	
	this.partSub = this.state.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
	    }
	);
    };

    onGoBack() {
	this.router.navigate(['/part-four/list-notation']);
    };

    onModify() {
	this.router.navigate(['/part-four/list-notation/']);
    };

    onDelete() {
	this.loading = true;
	this.notationsService.deleteNotation(this.notation._id).then(
	    () => {
		this.loading = false;
		this.router.navigate(['/part-four/list-notation']);
	    }
	);
    };

    ngOnDestroy() {
	this.partSub.unsubscribe();
  };

};
