import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router }     from '@angular/router';
import { CompteModel }        from '../../models/compte.model';
import { TexteModel }        from '../../models/texte.model';
import { NotationModel }                      from '../../models/notation.model';
import { NotationService }                   from '../../services/notation.service';
import { StateService }                       from '../../services/state.service';
import { CompteService }       from '../../services/compte.service';
import { TexteService }       from '../../services/texte.service';
import { DataProviderService } from '../../services/data-provider.service';
import { IrpRegisterService } from '../../services/irp-register.service';

import { Subscription }                       from 'rxjs';

import * as M from '../../irp-provider/managementLibrary';
import * as O from '../../models/outils';

@Component({
    selector: 'app-new-notation',
    templateUrl: './new-notation.component.html',
    styleUrls: ['./new-notation.component.scss']
})

export class NewNotationComponent implements OnInit, OnDestroy {

    public notationForm: FormGroup;
    public loading = false;
    public part: number;
    public errorMessage: string;

    private partSub: Subscription;
    private currentEmailSub: Subscription;
    private isAuthSub: Subscription;
    private currentParticipantIdSub: Subscription;
    private currentParticipantId: string;
    private currentParticipantPseudo: string;

    private currentDate: string;
    private currentCompte = new CompteModel();

    private currentTexteObjectIdSub: Subscription;
    private currentTexteObjectId: string;

    private irpRegisterSub: Subscription;
    private irpRegister= new Object();
	
    private currentTexte = new TexteModel();
    private currentTexteTitre: string;
    private currentEmail: string;
    private isAuth: boolean;
    
    constructor(private stateService: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private irpRegisterService: IrpRegisterService,
		private dataProviderService: DataProviderService,
		private compteService: CompteService,
		private texteService: TexteService,
		private notationService: NotationService)
		{
		    console.log('Entrée dans constructor');
		}
    
    ngOnInit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	/* Une notation se fait en cliquant sur un Texte */
	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans',here,' params', params);
		if (params.id) {
		    this.currentTexteObjectId = params.id;
		    console.log('Dans',here,' currentTexteObjectId', this.currentTexteObjectId);
		} else {
		    this.router.navigate(['/part-one/list-texte']);
		}
	    }
	);

	this.texteService.getTexteByObjectId (this.currentTexteObjectId)
	    .then(
		(tex: TexteModel) => {
		    console.log('Dans',here,' getTexteIdByObjectId tex', tex);
		    this.currentTexte = tex;
		    this.currentTexteTitre = tex.titre;
		},
	    ).catch (
		(error) => {
		    console.log('Dans',here,'getTexteByObjectId Erreur', error);
		}
	    );

	
	this.currentDate = new Date().toString();
	console.log('Dans',here,' currentDate', this.currentDate);
	
	this.stateService.mode$.next('form');

 	this.notationForm = this.formBuilder.group({
	    note: [1],
	});
	
	this.partSub = this.stateService.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);
	
	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {
		this.isAuth = boo;
		console.log('Dans',here,' isAuth', this.isAuth);
	    }
	);

	/* Pseudo et Id à partir de Email */
	
	//	this.currentEmail = this.dataProviderService.dataProvide ('currentEmail', here);
	//	console.log('Dans',here,'from DataProvider currentEmail',this.currentEmail);
	this.irpRegisterSub = this.irpRegisterService.irpRegister$.subscribe(
	    (reg) => {
		this.irpRegister = reg;
		console.log('%cDans ngOnInit','color:#00aa00', 'irpRegisterService => irpRegister', this.irpRegister);
		this.currentEmail = reg['currentEmail'];
		console.log('%cDans ngOnInit','color:#00aa00', 'irpRegisterService => currentEmail', this.currentEmail);

		if (reg == '' || reg == undefined || this.currentEmail == undefined) {
		    console.log('Dans',here,'navigation vers /login');
		    this.router.navigate(['/login']);
		}
	    },
	    (error) => {
		console.log('%cDans',here,'naviguer vers login?','#aa0000');
		console.log('Dans',here,'currentEmailSub Erreur',error);
	    }
	);

	console.log('Dans',here,'from irpRegisterService currentEmail',this.currentEmail);


	this.compteService.getCompteByEmail (this.currentEmail)
	    .then(
		(com: CompteModel) => {
		    console.log('Dans',here,' getCompteIdByEmail com', com);
		    this.currentCompte = com;
		    this.currentParticipantPseudo = com.pseudo;
		    this.currentParticipantId = com._id;
		},
	    ).catch (
		(error) => {
		    console.log('Dans',here,' currentParticipantIdSub getCompteByEmail Erreur', error);
		}
	    );
	M.exiting_from_function (here);	
    }

    onSubmit() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
	
	this.loading = true;

	const notation = new NotationModel();
	
	notation.texteTitre = this.currentTexteTitre;
	notation.texteObjectId = this.currentTexteObjectId;
	notation.participantPseudo = this.currentParticipantPseudo;
	notation.participantId = this.currentParticipantId;
	notation.date = this.currentDate;

	notation.note = this.notationForm.get('note').value;
	console.log('Dans onSubmit notation', notation);
	
	this.notationService.createNewNotation(notation)
	    .then(
		() => {
		    this.notationForm.reset();
		    this.loading = false;
		    this.router.navigate(['/part-four/list-notation']);
		}
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur', error);
		    console.log('Dans onSubmit Erreur.status', error.status);
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
	M.exiting_from_function (here);	
    }

    ngOnDestroy() {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);

	this.partSub.unsubscribe();
	O.unsubscribeLog(here, 'partSub');
	M.exiting_from_function (here);	
	//	this.currentEmailSub.unsubscribe();
	//	this.isAuthSub.unsubscribe();
	//	this.currentParticipantIdSub.unsubscribe();
	//	this.currentTexteObjectIdSub.unsubscribe();
    }

}
