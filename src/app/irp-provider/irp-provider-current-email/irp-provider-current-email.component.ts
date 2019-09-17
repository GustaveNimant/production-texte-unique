import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService }      from '../../services/state.service';

@Component({
    selector: 'app-irp-provider-current-email',
    templateUrl: './irp-provider-current-email.component.html',
    styleUrls: ['./irp-provider-current-email.component.scss']
})

export class IrpProviderCurrentEmailComponent implements OnInit {

    private currentEmailSub: Subscription;
    private currentEmail: string;
    
    constructor(
	private stateService: StateService)
	{
	    console.log('Entrée dans constructor');
	}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	/* récupère currentEmail initialisé par login */
	this.currentEmailSub = this.stateService.currentEmail$.subscribe(
	    (str) => { 
		this.currentEmail = str;
		console.log('Dans ngOnInit currentEmail', this.currentEmail);
	    },
	    (error) => {
		console.log('%cDans ngOnInit naviguer vers login?','#aa0000');
		console.log('Dans ngOnInit currentEmailSub Erreur',error);
	    }
	);
	
    }

}
