import { Router }                             from '@angular/router';
import { Component, OnDestroy, OnInit }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TexteModel }        from '../../models/texte.model';
import { TextesService }     from '../../services/textes.service';
import { ConnexionsService } from '../../services/connexions.service';
import { StateService }      from '../../services/state.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-new-texte',
    templateUrl: './new-texte.component.html',
    styleUrls: ['./new-texte.component.scss']
})

export class NewTexteComponent implements OnInit, OnDestroy {

    public texteForm: FormGroup;
    public loading = false;
    public part: number;
    public errorMessage: string;
    public debug: boolean;
    
    private partSub: Subscription;

    constructor(
	private formBuilder: FormBuilder,
	private stateService: StateService,
	private textesService: TextesService,
	private connexionsService: ConnexionsService,
    	private router: Router)
		{
		    console.log('Entrée dans constructor');
		}

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.stateService.mode$.next('form');

	this.debug = this.stateService.debug;
    	console.log('Dans ngOnInit debug', this.debug);

	this.texteForm = this.formBuilder.group({
	    titre: [null],
	    contenu: [null],
	    shasum: ["someShasum_0"],
	    noteMoyenne: [4],
	    noteEcartType: [5],
	    auteurId: ["someAuteurId_0"],
	    imageUrl: ["imageUrl_0"]
	});
	
	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		this.part = num;
	    }
	);
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	/* copie le contenu du texteForm */
	const texte = new TexteModel();

	texte.titre = this.texteForm.get('titre').value;
	texte.contenu = this.texteForm.get('contenu').value;
	texte.shasum = this.texteForm.get('shasum').value;
	texte.noteMoyenne = this.texteForm.get('noteMoyenne').value;
	texte.noteEcartType = this.texteForm.get('noteEcartType').value;
	texte.auteurId = this.texteForm.get('auteurId').value;
	texte.imageUrl = this.texteForm.get('imageUrl').value;

	texte._id = new Date().getTime().toString();

	console.log('Dans onSubmit texte', texte);
	
	this.textesService.createNewTexte(texte)
	    .then(
		() => {
		    this.texteForm.reset();
		    this.loading = false;
		    this.router.navigate(['/part-one/list-texte']);
		}
	    )
	    .catch(
		(error) => {
		    console.log('Dans onSubmit Erreur est', error);
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }

    ngOnDestroy() {
	this.partSub.unsubscribe();
    }

}
