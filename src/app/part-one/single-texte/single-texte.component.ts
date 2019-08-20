import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Un_texte } from '../../models/Un_texte.model';
import { TextesService } from '../../services/textes.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-single-texte',
    templateUrl: './single-texte.component.html',
    styleUrls: ['./single-texte.component.scss']
})
export class SingleTexteComponent implements OnInit, OnDestroy {

    public texte: Un_texte;
    public loading: boolean;
    public auteurId: string;
    public part: number;

    private partSub: Subscription;

    constructor(private state: StateService,
		private router: Router,
		private route: ActivatedRoute,
		private textesService: TextesService,
		private auth: AuthService) { }

    ngOnInit() {
	this.loading = true;
	this.state.mode$.next('single-texte');
	this.auteurId = this.auth.connexionId ? this.auth.connexionId : 'connexionID40282382';
	this.route.params.subscribe(
	    (params: Params) => {
		this.textesService.getTexteById(params.id).then(
		    (texte: Un_texte) => {
			this.loading = false;
			this.texte = texte;
		    }
		);
	    }
	);
	this.partSub = this.state.part$.subscribe(
	    (part) => {
		this.part = part;
		if (part >= 3) {
		    this.auteurId = this.auth.connexionId;
		}
	    }
	);
    }

    onGoBack() {
	if (this.part === 1) {
	    this.router.navigate(['/part-one/all-texte']);
	} else if (this.part === 3) {
	    this.router.navigate(['/part-three/all-texte']);
	} else if (this.part === 4) {
	    this.router.navigate(['/part-four/all-texte']);
	}
    }

    onModify() {
	switch (this.part) {
	    case 1:
	    case 2:
		this.router.navigate(['/part-one/modify-texte/' + this.texte._id]);
		break;
	    case 3:
		this.router.navigate(['/part-three/modify-texte/' + this.texte._id]);
		break;
	    case 4:
		this.router.navigate(['/part-four/modify-texte/' + this.texte._id]);
		break;
	}
    }

    onDelete() {
	this.loading = true;
	this.textesService.deleteTexte(this.texte._id).then(
	    () => {
		this.loading = false;
		switch (this.part) {
		    case 1:
			this.router.navigate(['/part-one/all-texte']);
			break;
		    case 2:
			this.router.navigate(['/part-two/all-participant']);
			break;
		    case 3:
			this.router.navigate(['/part-three/all-texte']);
			break;
		    case 4:
			this.router.navigate(['/part-four/all-texte']);
			break;
		}
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
