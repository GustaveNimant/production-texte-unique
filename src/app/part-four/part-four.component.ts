import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { NotationService } from '../services/notation.service';

@Component({
    selector: 'app-part-four',
    templateUrl: './part-four.component.html',
    styleUrls: ['./part-four.component.scss']
})

export class PartFourComponent implements OnInit, OnDestroy {

    constructor(private stateService: StateService) {}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.stateService.part$.next(4);
	this.stateService.part = 4;
	console.log('Dans ngOnInit part assigné à', this.stateService.part);
    }
    
    ngOnDestroy() {
    }
}
