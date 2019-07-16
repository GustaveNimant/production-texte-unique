import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { TexteService } from '../../services/texte.service';
import { Texte } from '../../models/Texte.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-modify-texte',
    templateUrl: './modify-texte.component.html',
    styleUrls: ['./modify-texte.component.scss']
})
export class ModifyTexteComponent implements OnInit {

    texte: Texte;
    texteForm: FormGroup;
    loading = false;
    errorMessage: string;
    part: number;

    private partSub: Subscription;

    constructor(private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private state: StateService,
		private texteService: TexteService) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.loading = true;
	this.texteForm = this.formBuilder.group({
	    titre: [null, Validators.required],
	    contenu: [null, Validators.required],
	    noteMoyenne: [0, Validators.required],
	    shasum: [null, Validators.required]
	});
	this.partSub = this.state.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);
	this.state.mode$.next('form');
	this.route.params.subscribe(
	    (params) => {
		this.texteService.getTexteById(params.id).then(
		    (texte: Texte) => {
			this.texte = texte;
			this.texteForm.get('titre').setValue(this.texte.titre);
			this.texteForm.get('contenu').setValue(this.texte.contenu);
			this.texteForm.get('noteMoyenne').setValue(this.texte.noteMoyenne / 100);
			this.texteForm.get('shasum').setValue(this.texte.shasum);
			this.loading = false;
		    }
		);
	    }
	);
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	this.loading = true;
	const texte = new Texte();
	texte.titre = this.texteForm.get('titre').value;
	texte.contenu = this.texteForm.get('contenu').value;
	texte.noteMoyenne = this.texteForm.get('noteMoyenne').value * 100;
	texte.shasum = this.texteForm.get('shasum').value;
	texte._id = new Date().getTime().toString();
	texte.participantId = this.texte.participantId;
	this.texteService.modifyTexte(this.texte._id, texte).then(
	    () => {
		this.texteForm.reset();
		this.loading = false;
		switch (this.part) {
		    case 1:
		    case 2:
			this.router.navigate(['/part-one/les-textes']);
			break;
		    case 3:
			this.router.navigate(['/part-three/les-textes']);
			break;
		    case 4:
			this.router.navigate(['/part-four/les-textes']);
			break;
		}
	    },
	    (error) => {
		this.loading = false;
		this.errorMessage = error.message;
	    }
	);
    }

}
