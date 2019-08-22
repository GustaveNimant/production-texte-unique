import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ConnexionsService } from '../services/connexions.service';

@Component({
  selector: 'app-part-three',
  templateUrl: './part-three.component.html',
  styleUrls: ['./part-three.component.scss']
})
export class PartThreeComponent implements OnInit, OnDestroy {

    constructor(private state: StateService,
		private auth: ConnexionsService) { }
    
    ngOnInit() {
	this.auth.isAuth$.next(false);
	this.auth.connexionId = '';
	this.auth.token = '';
	
	this.state.part$.next(3);
	this.state.part = 3;
    }
    
    ngOnDestroy() {
    }
    
}
