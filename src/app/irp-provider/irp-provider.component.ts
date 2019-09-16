import { Component, OnInit } from '@angular/core';
import { StateService }      from '../services/state.service';
import { Subscription } from 'rxjs';

import * as manLib from './managementLibrary';
import * as irpLib from './irpLibrary';

@Component({
    selector: 'app-irp-provider',
    templateUrl: './irp-provider.component.html',
    styleUrls: ['./irp-provider.component.scss']
})

export class IrpProviderComponent implements OnInit {

    public result:number;
    private debugSub: Subscription;
    private debug: boolean;

    constructor(
	private stateService: StateService,
    ){
	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.debugSub = this.stateService.debug$.subscribe(
	    (boo) => {
		console.log('Dans ngOnInit boo',boo);
		this.debug = boo;
		console.log('Dans ngOnInit debug', this.debug);
	    }
	);

	this.result = irpLib.irp_provide('APlusB', 'ngOnInit');
	console.log('Dans ngOnInit result=',this.result);

	function buildA () {
	    let result = 4;
	    return result;
	}

	function buildB () {
	    let result = 5;
	    return result;
	}

	function buildAPlusB() {
	    let a = irpLib.irp_provide('A', 'buildAPlusB');
	    let b = irpLib.irp_provide('B', 'buildAPlusB');

	    let result = a + b;
	    return result;
	}

	function provideA () {
	    let result = buildA ()
	    return result;
	}

	function provideB () {
	    let result = buildB ()
	    return result;
	}

	function provideAPlusB () {
	    let result = buildAPlusB();
	    return result;
	}

    }

    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.debugSub.unsubscribe();
    }

}
