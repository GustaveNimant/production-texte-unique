import { mimeType } from '../mime-type.validator';
import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { TexteModel }   from '../../models/texte.model';
import { ConnexionService } from '../../services/connexion.service';
import { StateService }      from '../../services/state.service';
import { TexteService }     from '../../services/texte.service';

@Component({
    selector: 'app-new-texte-with-image',
    templateUrl: './new-texte-with-image.component.html',
    styleUrls: ['./new-texte-with-image.component.scss']
})

export class NewTexteWithImageComponent implements OnInit {

    public texteForm: FormGroup;
    public loading = false;
    public part: number;
    public imagePreview: string;
    public errorMessage: string;
    public debug: boolean;
    
    constructor(private stateService: StateService,
		private formBuilder: FormBuilder,
		private texteService: TexteService,
		private router: Router,
		private connexionService: ConnexionService)
		{
		    console.log('Entrée dans constructor');
		}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.stateService.mode$.next('form');

	this.debug = this.stateService.debug;
    	console.log('Dans ngOnInit debug', this.debug);
	
	this.texteForm = this.formBuilder.group({
	    titre: [null, Validators.required],
	    contenu: [null, Validators.required],
	    shasum: [null, Validators.required],
	    noteMoyenne: [0, Validators.required],
	    noteEcartType: [0, Validators.required],
	    auteurId: [null, Validators.required],
	    imageUrl: [null]
	    //	    imageUrl: [null, Validators.required, mimeType],
	});

	console.log('Dans ngOnInit ');
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;
	const texte = new TexteModel();
	
	texte.titre = this.texteForm.get('titre').value;
	texte.contenu = this.texteForm.get('contenu').value;
	texte.auteurId = this.texteForm.get('auteurId').value; /* null */

	texte.shasum = this.texteForm.get('shasum').value;
	texte.noteMoyenne = this.texteForm.get('noteMoyenne').value;
	texte.noteEcartType = this.texteForm.get('noteEcartType').value;
	texte.imageUrl = this.texteForm.get('imageUrl').value;

	console.log('Dans onSubmit texte', texte);
	
	this.texteService.createNewTexteWithFile(texte, this.texteForm.get('imageUrl').value)
	    .then(
		() => {
		    this.texteForm.reset();
		    this.loading = false;
		    this.router.navigate(['/part-one/all-texte']);
		},
		(error) => {
		    this.loading = false;
		    this.errorMessage = error.message;
		}
	    );
    }

    onImagePick(event: Event) {
	console.log('Entrée dans onImagePick avec event', event);
	
	const file = (event.target as HTMLInputElement).files[0];

	console.log('Dans onImagePick file', file);
	this.texteForm.get('imageUrl').patchValue(file);
	this.texteForm.get('imageUrl').updateValueAndValidity();
	console.log('Dans onImagePick texteForm', this.texteForm);

	const reader = new FileReader();

	console.log('Dans onImagePick reader', reader);
	reader.onload = () => {
	    if (this.texteForm.get('imageUrl').valid) {
		this.imagePreview = <string>reader.result;
	    } else {
		this.imagePreview = null;
	    }
	};
	console.log('Dans onImagePick imagePreview', this.imagePreview);
	reader.readAsDataURL(file);
	console.log('Dans onImagePick Sortie reader', reader);
    }
}
