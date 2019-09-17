import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router }     from '@angular/router';
import { CompteModel }        from '../../models/compte.model';
import { NotationModel }                      from '../../models/notation.model';
import { NotationService }                   from '../../services/notation.service';
import { StateService }                       from '../../services/state.service';
import { Subscription }                       from 'rxjs';
import { CompteService }     from '../../services/compte.service';

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

    private currentDate: string;
    private currentCompte = new CompteModel();
    
    private currentTexteObjectIdSub: Subscription;
    private currentTexteObjectId: string;
    private currentEmail: string;
    private isAuth: boolean;
    
    constructor(private stateService: StateService,
		private formBuilder: FormBuilder,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private compteService: CompteService,
		private notationService: NotationService)
		{
		    console.log('Entrée dans constructor');
		}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.activatedRoute.params.subscribe(
	    (params: Params) => {
		console.log('Dans ngOnInit params', params);
		if (params.id) {
		    this.currentTexteObjectId = params.id;
		    console.log('Dans ngOnInit currentTexteObjectId', this.currentTexteObjectId);
		} else {
		    this.router.navigate(['/part-one/list-texte']);
		}
	    }
	);

	this.currentDate = new Date().toString();
	console.log('Dans ngOnInit currentDate', this.currentDate);
	
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
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

	this.currentEmailSub = this.stateService.currentEmail$.subscribe(
	    (str) => {
		this.currentEmail = str;
		console.log('Dans ngOnInit currentEmail', this.currentEmail);
	    }, (error) => {
		console.log('Dans ngOnInit currentEmailSub Erreur', error);
	    }
	);

    	this.currentParticipantIdSub = this.stateService.currentParticipantId$.subscribe(
	    (id) => {
		console.log('Dans ngOnInit currentParticipantId >', id,'<');
		if (id) {
		    this.currentParticipantId = id;
		    console.log('Dans ngOnInit currentParticipantId', this.currentParticipantId);
		} else {
		    if (this.currentEmail) {
			console.log('Dans ngOnInit currentParticipantIdSub currentEmail', this.currentEmail);

			this.compteService.getCompteByEmail (this.currentEmail)
			    .then(
				(com: CompteModel) => {
				    console.log('Dans ngOnInit getCompteIdByEmail com', com);
				    this.currentCompte = com;
				    this.currentParticipantId = com._id;
				},
			    ).catch (
				(error) => {
				    console.log('Dans ngOnInit currentParticipantIdSub getCompteByEmail Erreur', error);
				}
			    );
		    } else {
			console.log('Dans ngOnInit currentParticipantIdSub navigation vers /login');
			this.router.navigate(['/login']);
		    }
		}
	    }, 
	    (error) => {
		console.log('Dans ngOnInit Erreur', error);
	    }
	);
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	const notation = new NotationModel();
	
	notation.texteObjectId = this.currentTexteObjectId;
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
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
	//	this.currentEmailSub.unsubscribe();
	//	this.isAuthSub.unsubscribe();
	//	this.currentParticipantIdSub.unsubscribe();
	//	this.currentTexteObjectIdSub.unsubscribe();
    }

}
