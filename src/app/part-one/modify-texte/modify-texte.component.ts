import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { TextesService } from '../../services/textes.service';
import { Un_texte } from '../../models/Un_texte.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-modify-texte',
    templateUrl: './modify-texte.component.html',
    styleUrls: ['./modify-texte.component.scss']
})
export class ModifyTexteComponent implements OnInit {

    texte: Un_texte;
    texteForm: FormGroup;
    loading = false;
    errorMessage: string;
    part: number;

    private partSub: Subscription;
    private texteVersion: number;
    
    constructor(private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private state: StateService,
		private textesService: TextesService) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.loading = true;
	this.texteForm = this.formBuilder.group({
	    titre: [null, Validators.required],
	    contenu: [null, Validators.required],
	    shasum: [null, Validators.required],
	    noteMoyenne: [6, Validators.required],
	    noteEcartType: [7, Validators.required],
	    auteurId: [null, Validators.required],
	    imageUrl: [null, Validators.required]
	});
	this.partSub = this.state.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);
	this.state.mode$.next('form');
	this.route.params.subscribe(
	    (params) => {
		this.textesService.getTexteById(params.id).then(
		    (tex: Un_texte) => {
			console.log('Dans ngOnInit tex',tex);
			this.texte = tex;
			this.texteForm.get('titre').setValue(this.texte.titre);
			this.texteForm.get('contenu').setValue(this.texte.contenu);
			this.texteForm.get('shasum').setValue(this.texte.shasum);
			this.texteForm.get('noteMoyenne').setValue(this.texte.noteMoyenne);
			this.texteForm.get('noteEcartType').setValue(this.texte.noteEcartType);
			this.texteForm.get('auteurId').setValue(this.texte.auteurId);
			this.texteForm.get('imageUrl').setValue(this.texte.imageUrl);
			this.loading = false;
		    }
		);
	    }
	);
    }

    onModifyTexte() {
	console.log('Entrée dans onModifyTexte');
	this.loading = true;

	const texte = new Un_texte();

	texte.titre = this.texteForm.get('titre').value;
	texte.contenu = this.texteForm.get('contenu').value;
	texte.noteMoyenne = this.texteForm.get('noteMoyenne').value;
	texte.noteEcartType = this.texteForm.get('noteEcartType').value;
	texte.shasum = this.texteForm.get('shasum').value;
	texte.auteurId = this.texteForm.get('auteurId').value;
	texte.imageUrl = this.texteForm.get('imageUrl').value;

	texte._id = this.texte._id;
	texte.__v = (this.texte.__v +1);

	console.log('Dans onModifyTexte texte', texte);
	
	this.textesService.modifyTexte(this.texte._id, texte).then(
	    () => {
		this.texteForm.reset();
		this.loading = false;
		this.router.navigate(['/part-one/les-textes']);
	    },
	    (error) => {
		console.log('Dans onModifyTexte Erreur', error);
		this.loading = false;
		this.errorMessage = error.message;
		
	    }
	);
    }

}
