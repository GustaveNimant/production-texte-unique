import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'app-irp-provider-current-email',
    templateUrl: './irp-provider-current-email.component.html',
    styleUrls: ['./irp-provider-current-email.component.scss']
})

export class IrpProviderCurrentEmailComponent implements OnInit, OnDestroy {

    private currentEmailSub: Subscription;
    private currentEmail: string;
    
    constructor(
	private router: Router,
	private stateService: StateService)
	{
	    let here = 'constructor';
	    console.log('%cEntrée dans','color:#00aa00', here);
	}
    
    ngOnInit() {
	let here = 'ngOnInit';
	console.log('%cEntrée dans','color:#00aa00', here);

	/* récupère currentEmail initialisé par login */
	this.currentEmailSub = this.stateService.currentEmail$.subscribe(
	    (str) => { 
		this.currentEmail = str;
		console.log('%cDans ngOnInit','color:#00aa00', 'stateService => currentEmail', this.currentEmail);
		if (str == '') {
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
	this.currentEmailSub.unsubscribe();
	console.log('Dans',here,'unsubscribe currentEmailSub');
    }
}
