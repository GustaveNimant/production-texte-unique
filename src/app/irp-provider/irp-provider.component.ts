import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { StateService }       from '../services/state.service';
import { IrpProviderService } from '../services/irp-provider.service';
import { Subscription } from 'rxjs';

import * as manLib from './managementLibrary';

@Component({
    selector: 'app-irp-provider',
    templateUrl: './irp-provider.component.html',
    styleUrls: ['./irp-provider.component.scss']
})

export class IrpProviderComponent implements OnInit, OnDestroy {

    private debugSub: Subscription;
    private debug: boolean;

    private irpResultSub: Subscription;
    private irpResult:string;
    
    private irpProviderForm: FormGroup;
    private objectName: string;
    public loading = false;
    
    private here:string;

    constructor(
	private irpProviderService: IrpProviderService,
	private stateService: StateService,
	private formBuilder: FormBuilder,
	private router: Router)
	{
	    let here = 'constructor';
	    console.log('%cEntrée dans','color:#0000aa', here);
	}
    
    ngOnInit() {
	let here = 'ngOnInit';
	console.log('%cEntrée dans','color:#00aa00', here);

	this.debugSub = this.stateService.debug$.subscribe(
	    (boo) => {
		this.debug = boo;
		console.log('Dans ngOnInit debug', this.debug);
	    }
	);

	this.irpProviderForm = this.formBuilder.group({
	    objectName: [''],
	});
	
    }

    onSubmit() {
	let here = 'onSubmit'
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.loading = true;
	
	this.objectName = this.irpProviderForm.get('objectName').value;
	console.log(here, 'irpProviderForm => objectName', this.objectName);

	this.irpResult = this.irpProviderService.irpProvide(this.objectName, here);
	console.log(here,': "'+this.objectName+'" => >'+this.irpResult+'<');

	this.irpProviderForm.reset();

	this.loading = false;
    }

    ngOnDestroy() {
	let here = 'ngOnDestroy';
	console.log('%cEntrée dans','color:#aa0000', here);
	this.debugSub.unsubscribe();
	console.log('Dans',here,'unsubscribe debugSub');
    }

}
