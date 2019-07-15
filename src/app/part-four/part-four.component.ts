import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-part-four',
  templateUrl: './part-four.component.html',
  styleUrls: ['./part-four.component.scss']
})
export class PartFourComponent implements OnInit, OnDestroy {

    constructor(private state: StateService,
		private auth: AuthService) { }
    
    ngOnInit() {
	this.auth.isAuth$.next(false);
	this.auth.participantId = '';
	this.auth.token = '';

	this.state.part$.next(4);
	this.state.part = 4;
	console.log('Dans ngOnInit part est', this.state.part);
    }
    
    ngOnDestroy() {
    }
}
