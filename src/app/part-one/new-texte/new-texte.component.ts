import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Un_texte } from '../../models/Un_texte.model';
import { TextesService } from '../../services/textes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-new-texte',
    templateUrl: './new-texte.component.html',
    styleUrls: ['./new-texte.component.scss']
})

export class NewTexteComponent implements OnInit, OnDestroy {

    public texteForm: FormGroup;
    public loading = false;
    public part: number;
    public auteurId: string;
    public errorMessage: string;

    private partSub: Subscription;

    constructor(private state: StateService,
		private formBuilder: FormBuilder,
		private textesService: TextesService,
		private router: Router,
		private auth: AuthService) {
	console.log('Entrée dans constructor');
    }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.state.mode$.next('form');
	this.texteForm = this.formBuilder.group({
	    titre: [null],
	    contenu: [null],
	    auteurId: "someId",
	    noteMoyenne: [0],
	    noteEcartType: [0],
	    shasum: ["someShasum"]
	});
	this.partSub = this.state.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);
    }

    onSubmit() {
	console.log('Entrée dans onSubmit');
	
	this.loading = true;

	const texte = new Un_texte();
	texte.titre = this.texteForm.get('titre').value;
	texte.contenu = this.texteForm.get('contenu').value;
	texte.noteMoyenne = this.texteForm.get('noteMoyenne').value;
	texte.noteEcartType = this.texteForm.get('noteEcartType').value;
	texte.shasum = this.texteForm.get('shasum').value;
	texte.auteurId = this.auteurId;
	texte._id = new Date().getTime().toString();

	if (texte.auteurId == undefined) {
	    texte.auteurId = "someId";
	}
	if (texte.shasum == null) {
	    texte.shasum = "someShasum";
	}

	console.log('Dans onSubmit le texte est', texte);
	
	this.textesService.createNewTexte(texte)
	    .then(
		() => {
		    this.texteForm.reset();
		    this.loading = false;
		    switch (this.part) {
			case 1:
			    this.router.navigate(['/part-one/new-texte']);
			    break;
			case 2:
			    this.router.navigate(['/part-two/les-participants']);
			    break;
			case 3:
			    this.router.navigate(['/part-three/les-textes']);
			    break;
			case 4:
			    this.router.navigate(['/part-four/les-textes']);
			    break;
		    }
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
