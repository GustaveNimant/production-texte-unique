import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService }      from '../../services/state.service';

import { CompteModel } from '../../models/compte.model';
import { CompteService }     from '../../services/compte.service';
import * as IrpLib from '../../irp-provider/irpLibrary';

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
	private stateService: StateService)
	{
	    console.log('Entrée dans constructor');
	}
    
    ngOnInit() {
	this.here = 'ngOnInit';
	console.log('Entrée dans', this.here);

	this.loading = true;
	
	this.currentCompteSub = this.compteService.currentCompte$.subscribe(
	      (com) => {
		this.currentCompte = com;
		console.log('Dans ngOnInit currentCompte', this.currentCompte);
	      },
	    (error) => {
		this.currentEmail = IrpLib.irp_provide ('currentEmail', this.here);

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
	    }
	)
    } // ngOnInit
}
