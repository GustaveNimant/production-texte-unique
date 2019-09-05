import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { NotationsService } from '../services/notations.service';

@Component({
    selector: 'app-part-four',
    templateUrl: './part-four.component.html',
    styleUrls: ['./part-four.component.scss']
})

export class PartFourComponent implements OnInit, OnDestroy {

    constructor(private state: StateService) {}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.state.part$.next(4);
	this.state.part = 4;
	console.log('Dans ngOnInit part assigné à', this.state.part);
    }
    
    ngOnDestroy() {
    }
}
