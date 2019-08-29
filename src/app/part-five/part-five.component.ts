import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ConnexionsService } from '../services/connexions.service';

@Component({
    selector: 'app-part-five',
    templateUrl: './part-five.component.html',
    styleUrls: ['./part-five.component.scss']
})

export class PartFiveComponent implements OnInit, OnDestroy {

    constructor(private state: StateService,
		private auth: ConnexionsService) { }
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.auth.isAuth$.next(false);
	this.auth.connexionId = '';
	this.auth.token = '';

	this.state.part$.next(5);
	this.state.part = 5;
	console.log('Dans ngOnInit part', this.state.part);
    }
    
    ngOnDestroy() {
    }
}
