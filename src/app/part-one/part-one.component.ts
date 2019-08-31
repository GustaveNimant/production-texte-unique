import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-part-one',
  templateUrl: './part-one.component.html',
  styleUrls: ['./part-one.component.scss']
})

export class PartOneComponent implements OnInit {

    constructor(private state: StateService) {
	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.state.part$.next(1);
	this.state.part = 1;
	console.log('Dans ngOnInit part assigné à', this.state.part);
    }

}
