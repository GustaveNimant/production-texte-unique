import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { CompteService } from '../services/compte.service';

@Component({
  selector: 'app-buts',
  templateUrl: './buts.component.html',
  styleUrls: ['./buts.component.scss']
})

export class PartThreeComponent implements OnInit, OnDestroy {

    constructor(private stateService: StateService,
		private compteService: CompteService) { }
    
    ngOnInit() {
//	this.compteService.isAuth$.next(false);
	this.compteService.userId = '';
	this.compteService.token = '';
	
	this.stateService.part$.next(3);
	this.stateService.part = 3;
    }
    
    ngOnDestroy() {
    }
    
}
