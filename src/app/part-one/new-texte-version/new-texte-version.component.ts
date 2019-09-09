import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { TexteModel } from '../../models/texte.model';
import { StateService }  from '../../services/state.service';
import { TexteService } from '../../services/texte.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-new-texte-version',
    templateUrl: './new-texte-version.component.html',
    styleUrls: ['./new-texte-version.component.scss']
})

export class NewTexteVersionComponent implements OnInit {

    texte: TexteModel;
    texteForm: FormGroup;
    loading = false;
    errorMessage: string;
    part: number;

    private partSub: Subscription;
    private texteVersion: number;
    
    constructor(private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private stateService: StateService,
		private texteService: TexteService) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.loading = true;
	this.texteForm = this.formBuilder.group({
	    contenu: [null, Validators.required],
	});

	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
	    }
	);
	
	this.stateService.mode$.next('form');

	this.route.params.subscribe(
	    (par) => {
		console.log('Dans ngOnInit par',par);
		
		/* Improve calculer la noteMoyenne pour cet id avec list-notation */

		this.texteService.getTexteById(par.id).then(
		    (tex: TexteModel) => {
			console.log('Dans ngOnInit tex',tex);
			this.texte = tex;
			this.texteForm.get('contenu').setValue(this.texte.contenu);
			this.loading = false;
		    }
		);
	    }
	);
    }

    onNewTexteVersion() {
	console.log('Entrée dans onNewTexteVersion');
	this.loading = true;

//	const salt = bcrypt.genSaltSync(10);
//	console.log('salt', salt);
//	texte.shasum = bcrypt.hashSync(this.texte.contenu, salt); 

	let texteNew = new TexteModel();
        texteNew = this.texte;
	
	texteNew.contenu = this.texteForm.get('contenu').value;
	texteNew.version = this.texte.version +1;

	texteNew._id = this.texte._id;
	texteNew.__v = (this.texte.__v +1);

	console.log('Dans onNewTexteVersion texteNew', texteNew);
	
	this.texteService.createNewTexteVersion(this.texte._id, texteNew).then(
		() => {
		this.texteForm.reset();
		this.loading = false;
		this.router.navigate(['/part-one/list-texte']);
	    },
	    (error) => {
		console.log('Dans onNewTexteVersion Erreur', error.status);
		this.loading = false;
		this.errorMessage = error.message;
	    }
	);
    }

}
