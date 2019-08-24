import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { TextesService } from '../../services/textes.service';
import { Router } from '@angular/router';
import { ConnexionsService } from '../../services/connexions.service';
import { Un_texte } from '../../models/Un_texte.model';
import { mimeType } from '../mime-type.validator';

@Component({
    selector: 'app-new-texte-with-image',
    templateUrl: './new-texte-with-image.component.html',
    styleUrls: ['./new-texte-with-image.component.scss']
})

export class NewTexteWithImageComponent implements OnInit {

    public texteForm: FormGroup;
    public loading = false;
    public part: number;
    public auteurId: string;
    public imagePreview: string;
    public errorMessage: string;

    constructor(private stateService: StateService,
		private formBuilder: FormBuilder,
		private textesService: TextesService,
		private router: Router,
		private auth: ConnexionsService)
		{
		    console.log('Entrée dans constructor');
		}
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.stateService.mode$.next('form');
	
	this.texteForm = this.formBuilder.group({
	    titre: [null, Validators.required],
	    contenu: [null, Validators.required],
	    noteMoyenne: [0, Validators.required],
	    noteEcartType: [0, Validators.required],
	    image: [null, Validators.required, mimeType]
	});
	this.auteurId = this.auth.connexionId;
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;
	const texte = new Un_texte();
	texte.titre = this.texteForm.get('titre').value;
	texte.noteMoyenne = this.texteForm.get('noteMoyenne').value;
	texte.noteEcartType = this.texteForm.get('noteEcartType').value;
	texte.shasum = 'someShasum';
	texte.auteurId = this.auteurId;

	console.log('Dans onSubmit texte', texte);
	
	this.textesService.createNewTexteWithFile(texte, this.texteForm.get('image').value)
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
	this.texteForm.get('image').patchValue(file);
	this.texteForm.get('image').updateValueAndValidity();

	const reader = new FileReader();

	reader.onload = () => {
	    if (this.texteForm.get('image').valid) {
		this.imagePreview = <string>reader.result;
	    } else {
		this.imagePreview = null;
	    }
	};
	reader.readAsDataURL(file);
    }
}
