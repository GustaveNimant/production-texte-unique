import { mimeType } from '../mime-type.validator';
import { Router }                             from '@angular/router';
import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TexteModel } from '../../models/texte.model';
import { StateService }      from '../../services/state.service';
import { TextesService }     from '../../services/textes.service';
import { ConnexionsService } from '../../services/connexions.service';

@Component({
    selector: 'app-new-texte-with-upload',
    templateUrl: './new-texte-with-upload.component.html',
    styleUrls: ['./new-texte-with-upload.component.scss']
})

export class NewTexteWithUploadComponent implements OnInit {

    public texteForm: FormGroup;
    public loading = false;
    public part: number;
    public auteurId: string;
    public imagePreview: string;
    public errorMessage: string;

    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private textesService: TextesService,
		private router: Router,
		private connexionsService: ConnexionsService) { }

    ngOnInit() {
	this.state.mode$.next('form');
	this.texteForm = this.formBuilder.group({
	    titre: [null, Validators.required],
	    contenu: [null, Validators.required],
	    noteMoyenne: [0, Validators.required],
	    noteEcartType: [0, Validators.required],
	    image: [null, Validators.required, mimeType]
	});
	this.auteurId = this.connexionsService.connexionId;
    }

    onSubmit() {
	this.loading = true;
	const texte = new TexteModel();
	texte.titre = this.texteForm.get('titre').value;
	texte.noteMoyenne = this.texteForm.get('noteMoyenne').value;
	texte.noteEcartType = this.texteForm.get('noteEcartType').value;
	texte.shasum = '';
	texte.auteurId = this.auteurId;
	this.textesService.createNewTexteWithFile(texte, this.texteForm.get('image').value).then(
	    () => {
		this.texteForm.reset();
		this.loading = false;
		this.router.navigate(['/part-four/all-texte']);
	    },
	    (error) => {
		this.loading = false;
		this.errorMessage = error.message;
	    }
	);
    }

    onImagePick(event: Event) {
	const file = (event.target as HTMLInputElement).files[0];
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
