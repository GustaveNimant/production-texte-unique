import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-part-two',
    templateUrl: './part-two.component.html',
    styleUrls: ['./part-two.component.scss']
})

export class PartTwoComponent implements OnInit, OnDestroy {

    constructor(private state: StateService,
		private auth: AuthService) {
	console.log('Entrée dans constructor');
    }
    
    ngOnInit() {
	this.auth.isAuth$.next(false);
	this.auth.participantId = '';
	this.auth.token = '';
	
	this.state.part$.next(2);
	this.state.part = 2;
    }
    
    ngOnDestroy() {
    }
    
}
