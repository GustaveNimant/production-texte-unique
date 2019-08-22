import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Une_connexion } from '../../models/Une_connexion.model';
import { ConnexionsService } from '../../services/connexions.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-single-connexion',
    templateUrl: './single-connexion.component.html',
    styleUrls: ['./single-connexion.component.scss']
})

export class SingleConnexionComponent implements OnInit, OnDestroy {

    public connexion: Une_connexion;
    public loading: boolean;
    public connexionId: string;
    public part: number;

    private partSub: Subscription;

    constructor(private state: StateService,
		private router: Router,
		private route: ActivatedRoute,
		private connexionsService: ConnexionsService,
		private auth: ConnexionsService) {
	console.log('Entrée dans constructor');
    }
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.loading = true;
	this.state.mode$.next('single-connexion');
	this.connexionId = this.auth.connexionId ? this.auth.connexionId : 'connexionID40282382';
	this.route.params.subscribe(
	    (params: Params) => {
		this.connexionsService.getConnexionById(params.id)
		    .then(
			(connexion: Une_connexion) => {
			    console.log('Dans ngOnInit connexion', connexion);
			    this.loading = false;
			    this.connexion = connexion;
			}
		    );
	    }
	);
	this.partSub = this.state.part$.subscribe(
	    (part) => {
		this.part = part;
		if (part == 2) {
		    this.connexionId = this.auth.connexionId;
		}
	    }
	);
    }

    onGoBack() {
	if (this.part === 1) {
	    this.router.navigate(['/part-one/all-texte']);
	} else if (this.part === 2) {
	    this.router.navigate(['/part-two/all-connexion']);
	} else if (this.part === 3) {
	    this.router.navigate(['/part-three/les-buts']);
	} else if (this.part === 4) {
	    this.router.navigate(['/part-four/les-examens']);
	}
    }

    onModify() {
	switch (this.part) {
	    case 1:
	    case 2:
		this.router.navigate(['/part-one/modify-connexion/' + this.connexion._id]);
		break;
	    case 3:
		this.router.navigate(['/part-three/modify-connexion/' + this.connexion._id]);
		break;
	    case 4:
		this.router.navigate(['/part-four/modify-connexion/' + this.connexion._id]);
		break;
	}
    }

    onDelete() {
	this.loading = true;
	this.connexionsService.deleteConnexion(this.connexion._id).then(
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
			this.router.navigate(['/part-three/all-but']);
			break;
		    case 4:
			this.router.navigate(['/part-four/all-notation']);
			break;
		    case 5:
			this.router.navigate(['/part-four/all-connexion']);
			break;
		}
	    }
	);
    }

    ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
