import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { CompteService } from '../services/compte.service';

@Component({
    selector: 'app-part-two',
    templateUrl: './part-two.component.html',
    styleUrls: ['./part-two.component.scss']
})

export class PartTwoComponent implements OnInit, OnDestroy {

    constructor(private stateService: StateService,
		private compteService: CompteService) {
	console.log('Entrée dans constructor');
    }
    
    ngOnInit() {
//	this.compteService.isAuth$.next(false);
	this.compteService.userId = '';
	this.compteService.token = '';
	
	this.stateService.part$.next(2);
	this.stateService.part = 2;
	console.log('Dans ngOnInit part assigné à', this.stateService.part);
    }
    
    ngOnDestroy() {
    }
    
}
