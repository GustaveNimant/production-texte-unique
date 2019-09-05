import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { TextesService } from '../../services/textes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnexionsService } from '../../services/connexions.service';
import { mimeType } from '../mime-type.validator';
import { Un_texte } from '../../models/Un_texte.model';

@Component({
    selector: 'app-modify-texte-with-image',
    templateUrl: './modify-texte-with-image.component.html',
    styleUrls: ['./modify-texte-with-image.component.scss']
})

export class ModifyTexteWithImageComponent implements OnInit {

    public texteForm: FormGroup;
    public texte: Un_texte;
    public loading = false;
    public part: number;
    public auteurId: string;
    public imagePreview: string;
    public errorMessage: string;

    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private textesService: TextesService,
		private route: ActivatedRoute,
		private router: Router,
		private auth: ConnexionsService)
		{
		    console.log('Entrée dans constructor')
		}

    ngOnInit() {
	console.log('Entrée dans ngOnInit')
	
	this.loading = true;
	this.state.mode$.next('form');
	this.auteurId = this.auth.connexionId;
	this.route.params.subscribe(
	    (params) => {
		this.textesService.getTexteById(params.id).then(
		    (tex: Un_texte) => {
			this.texte = tex;
			this.texteForm = this.formBuilder.group({
			    titre: [tex.titre, Validators.required],
			    contenu: [tex.contenu, Validators.required],
			    shasum: [tex.shasum, Validators.required, mimeType],
			    noteMoyenne: [tex.noteMoyenne, Validators.required],
			    noteEcartType: [tex.noteEcartType, Validators.required],
			    auteurId: [tex.auteurId, Validators.required],
			    imageUrl: [tex.imageUrl, Validators.required, mimeType]
			});
			this.imagePreview = tex.imageUrl;
			this.loading = false;
		    }
		);
	    }
	);
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;
	const texte = new Un_texte();
	texte._id = this.texte._id;
	texte.titre = this.texteForm.get('titre').value;
	texte.contenu = this.texteForm.get('contenu').value;
	texte.shasum = 'someShasumWithImage';
	texte.noteMoyenne = this.texteForm.get('noteMoyenne').value;
	texte.noteEcartType = this.texteForm.get('noteEcartType').value;
	texte.auteurId = this.auteurId;
	
	this.textesService.modifyTexteWithFile(this.texte._id, texte, this.texteForm.get('image').value).then(
	    () => {
		this.texteForm.reset();
		this.loading = false;
		this.router.navigate(['/part-one/les-textes']);
	    },
	    (error) => {
		this.loading = false;
		this.errorMessage = error.message;
	    }
	);
    }

    onImagePick(event: Event) {
	console.log('Entrée dans onImagePick');
	const file = (event.target as HTMLInputElement).files[0];
	console.log('Dans onImagePick file',file);

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
