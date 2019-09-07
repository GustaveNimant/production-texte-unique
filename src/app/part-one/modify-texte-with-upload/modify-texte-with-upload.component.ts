import { mimeType } from '../mime-type.validator';
import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { TexteModel } from '../../models/texte.model';
import { ConnexionService } from '../../services/connexion.service';
import { StateService } from '../../services/state.service';
import { TexteService } from '../../services/texte.service';

@Component({
    selector: 'app-modify-texte-with-upload',
    templateUrl: './modify-texte-with-upload.component.html',
    styleUrls: ['./modify-texte-with-upload.component.scss']
})

export class ModifyTexteWithUploadComponent implements OnInit {

    public texteForm: FormGroup;
    public texte: TexteModel;
    public loading = false;
    public part: number;
    public auteurId: string;
    public imagePreview: string;
    public errorMessage: string;

    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private texteService: TexteService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private connexionService: ConnexionService) { }

    ngOnInit() {
	this.loading = true;
	this.state.mode$.next('form');
	this.auteurId = this.connexionService.connexionId;
	this.activatedRoute.params.subscribe(
	    (params) => {
		this.texteService.getTexteById(params.id).then(
		    (texte: TexteModel) => {
			this.texte = texte;
			this.texteForm = this.formBuilder.group({
			    titre: [texte.titre, Validators.required],
			    contenu: [texte.contenu, Validators.required],
			    noteMoyenne: [texte.noteMoyenne, Validators.required],
			    noteEcartType: [texte.noteEcartType, Validators.required],
			    image: [texte.shasum, Validators.required, mimeType]
			});
			this.imagePreview = texte.shasum;
			this.loading = false;
		    }
		);
	    }
	);
    }

    onSubmit() {
	this.loading = true;
	const texte = new TexteModel();
	texte._id = this.texte._id;
	texte.titre = this.texteForm.get('titre').value;
	texte.contenu = this.texteForm.get('contenu').value;
	texte.noteMoyenne = this.texteForm.get('noteMoyenne').value;
	texte.noteEcartType = this.texteForm.get('noteEcartType').value;
	texte.shasum = '';
	texte.auteurId = this.auteurId;
	this.texteService.modifyTexteWithFile(this.texte._id, texte, this.texteForm.get('image').value).then(
	    () => {
		this.texteForm.reset();
		this.loading = false;
		this.router.navigate(['/part-one/list-texte']);
	    },
	    (error) => {
		this.loading = false;
		this.errorMessage = error.message;
	    }
	);
    }

    onImagePick(event: Event) {
	const file = (event.target as HTMLInputElement).files[0];
	console.log(file);
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
