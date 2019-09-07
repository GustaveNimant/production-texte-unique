import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ConnexionsService } from '../services/connexions.service';

@Component({
  selector: 'app-part-three',
  templateUrl: './part-three.component.html',
  styleUrls: ['./part-three.component.scss']
})
export class PartThreeComponent implements OnInit, OnDestroy {

    constructor(private stateService: StateService,
		private connexionsService: ConnexionsService) { }
    
    ngOnInit() {
	this.connexionsService.isAuth$.next(false);
	this.connexionsService.connexionId = '';
	this.connexionsService.token = '';
	
	this.stateService.part$.next(3);
	this.stateService.part = 3;
    }
    
    ngOnDestroy() {
    }
    
}
