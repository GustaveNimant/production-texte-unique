import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateService } from '../../services/state.service';
import { IrpRegisterService }   from '../../services/irp-register.service';

import * as M from '../../irp-provider/managementLibrary';
import * as O from '../../models/outils';

@Component({
    selector: 'app-irp-provider-current-email',
    templateUrl: './irp-provider-current-email.component.html',
    styleUrls: ['./irp-provider-current-email.component.scss']
})

export class IrpProviderCurrentEmailComponent implements OnInit, OnDestroy {

    private currentRegisterSub: Subscription;
    private currentRegister= new Object();
    private currentEmail: string;
    
    constructor(
	private router: Router,
	private irpRegisterService: IrpRegisterService,
	private stateService: StateService)
	{
	    let here = 'constructor';
	    console.log('%cEntrée dans','color:#00aa00', here);
	}
    
    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	/* récupère currentEmail initialisé par login */
	this.irpRegisterService.irpRegister$.subscribe(
	    (reg) => {
		this.currentRegister = reg;
		console.log('%cDans ngOnInit','color:#00aa00', 'irpRegisterService => currentRegister', this.currentRegister);
		this.currentEmail = reg['currentEmail'];
		console.log('%cDans ngOnInit','color:#00aa00', 'irpRegisterService => currentEmail', this.currentEmail);
		if (reg == '') {
		    console.log('Dans',here,'navigation vers /login');
		    this.router.navigate(['/login']);
		}
	    },
	    (error) => {
		console.log('%cDans ngOnInit naviguer vers login?','#aa0000');
		console.log('Dans ngOnInit currentEmailSub Erreur',error);
	    }
	);
    }

    ngOnDestroy () {
	let here = 'ngOnDestroy';
	console.log('%cEntrée dans','color:#aa0000', here);
	this.currentRegisterSub.unsubscribe();
	console.log('Dans',here,'unsubscribe currentRegisterSub');
    }
}
