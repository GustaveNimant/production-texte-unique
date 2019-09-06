import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Une_notation } from '../../models/Une_notation.model';
import { NotationsService } from '../../services/notations.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-single-notation',
    templateUrl: './single-notation.component.html',
    styleUrls: ['./single-notation.component.scss']
})

export class SingleNotationComponent implements OnInit, OnDestroy {

    public notation: Une_notation;
    public loading: boolean;
    public part: number;

    private partSub: Subscription;

    constructor(private state: StateService,
		private router: Router,
		private route: ActivatedRoute,
		private notationsService: NotationsService,
		private auth: NotationsService)
		{
		    console.log('Entrée dans constructor');
		};
    
    ngOnInit(){
	console.log('Entrée dans ngOnInit');

	this.loading = true;

	this.state.mode$.next('single-notation');

	this.route.params.subscribe(
	    (params: Params) => {
		this.notationsService.getNotationById(params.id)
		    .then(
			(not: Une_notation) => {
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
	this.router.navigate(['/part-four/les-notations']);
    };

    onModify() {
	this.router.navigate(['/part-four/les-notations/']);
    };

    onDelete() {
	this.loading = true;
	this.notationsService.deleteNotation(this.notation._id).then(
	    () => {
		this.loading = false;
		this.router.navigate(['/part-four/les-notations']);
	    }
	);
    };

    ngOnDestroy() {
	this.partSub.unsubscribe();
  };

};
