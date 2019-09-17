import { Component, OnDestroy, OnInit }       from '@angular/core';
import { StateService }      from '../services/state.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as manLib from './managementLibrary';
import * as irpLib from './irpLibrary';

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
	private stateService: StateService,
	private formBuilder: FormBuilder,
	private router: Router){
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

	this.irpProviderForm = this.formBuilder.group({
	    objectName: [''],
	});
	
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;
	
	this.objectName = this.irpProviderForm.get('objectName').value;
	console.log('Dans onSubmit objectName', this.objectName);

	this.loading = false;
	
	this.irpResult = irpLib.irp_provide(this.objectName, 'onSubmit');
	console.log('Dans ngOnInit irpResult=',this.irpResult);

	this.stateService.irpResult$.next(this.irpResult);

	this.router.navigate(['/irp-provider-result']);
	
    }

    buildCurrentCompte () {
	this.here = 'buildCurrentCompte';
	console.log('Entrée dans',this.here);
	this.router.navigate(['/irp-provider-current-compte']);
    }
    
    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.debugSub.unsubscribe();
    }

}
