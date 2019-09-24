import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { CompteService } from '../services/compte.service';

@Component({
    selector: 'app-comptes',
    templateUrl: './comptes.component.html',
    styleUrls: ['./comptes.component.scss']
})

export class PartFiveComponent implements OnInit, OnDestroy {

    constructor(private stateService: StateService,
		private compteService: CompteService) { }
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
//	this.compteService.isAuth$.next(false);
	this.compteService.userId = '';
	this.compteService.token = '';
	console.log('Dans ngOnInit initialisation isAuth$ userId token');
	
	this.stateService.part$.next(5);
	this.stateService.part = 5;
	console.log('Dans ngOnInit part assigné à', this.stateService.part);
    }
    
    ngOnDestroy() {
    }
}
