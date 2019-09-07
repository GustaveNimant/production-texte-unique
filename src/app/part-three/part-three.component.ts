import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ConnexionService } from '../services/connexion.service';

@Component({
  selector: 'app-part-three',
  templateUrl: './part-three.component.html',
  styleUrls: ['./part-three.component.scss']
})
export class PartThreeComponent implements OnInit, OnDestroy {

    constructor(private stateService: StateService,
		private connexionService: ConnexionService) { }
    
    ngOnInit() {
	this.connexionService.isAuth$.next(false);
	this.connexionService.connexionId = '';
	this.connexionService.token = '';
	
	this.stateService.part$.next(3);
	this.stateService.part = 3;
    }
    
    ngOnDestroy() {
    }
    
}
