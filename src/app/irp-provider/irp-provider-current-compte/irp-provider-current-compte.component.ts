import { Component, OnInit } from '@angular/core';
import { Subscription }  from 'rxjs';
import { CompteModel }   from '../../models/compte.model';
import { CompteService }      from '../../services/compte.service';
import { StateService }       from '../../services/state.service';
import { IrpProviderService } from '../../services/irp-provider.service';

@Component({
    selector: 'app-irp-provider-current-compte',
    templateUrl: './irp-provider-current-compte.component.html',
    styleUrls: ['./irp-provider-current-compte.component.scss']
})

export class IrpProviderCurrentCompteComponent implements OnInit {

    private here: string;
    private currentCompteSub: Subscription;
    private currentCompte = new CompteModel();
    private loading: boolean;
    private currentEmail: string;

    constructor(
	private compteService: CompteService,
	private stateService: StateService,
	private irpProviderService: IrpProviderService)
	{
	    console.log('Entrée dans constructor');
	}
    
    ngOnInit() {
	let here = 'ngOnInit';
	console.log('%cEntrée dans','color:#00aa00', here);

	this.loading = true;

	this.currentEmail = this.irpProviderService.irpProvide ('currentEmail', here);
 
	console.log('%cDans ngOnInit','color:#00aa00', 'irpProvide (currentEmail) >', this.currentEmail),'<';
	
	this.currentCompteSub = this.compteService.currentCompte$.subscribe(
	    (com) => {
		console.log('%cDans ngOnInit', 'color:#00aa00','subscribe => com', com);

		if (com) {
		    this.currentCompte = com;
		    console.log('%cDans ngOnInit currentCompte', 'color:#00aa00', this.currentCompte);
		    console.log('pseudo', this.currentCompte.pseudo);
		    if (this.currentCompte.pseudo == undefined ) {
			alert ('pseudo undefined');
		    }
		} else {
		    this.compteService.getCompteByEmail(this.currentEmail)
			.then(
			    (com: CompteModel) => {
				console.log('Dans ngOnInit getCompteIdByEmail com', com);
				this.loading = false;
				this.currentCompte = com;
				this.compteService.currentCompte$.next(this.currentCompte);
				
			    }
			).catch (
			    (error) => {
				console.log('Dans ngOnInit currentParticipantIdSub getCompteByEmail Erreur', error);
			    }
			);
		} // <= else 
	    },
	    (error) => {
		console.log('Dans ngOnInit currentParticipantIdSub getCompteByEmail Erreur', error);
	    }
	); // <= subscribe
    } // <= ngOnInit
} // <= class
