import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { TextesService } from '../../services/textes.service';
import { Subscription } from 'rxjs';
import { Un_texte } from '../../models/Un_texte.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-textes-list',
    templateUrl: './textes-list.component.html',
    styleUrls: ['./textes-list.component.scss']
})

export class TextesListComponent implements OnInit, OnDestroy {

    public textes: Un_texte[] = [];
    public part: number;
    public loading: boolean;

    private textesSub: Subscription;
    private partSub: Subscription;

    constructor(private state: StateService,
		private textesService: TextesService,
		private router: Router) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.loading = true;
	this.state.mode$.next('list');
	
	this.textesSub = this.textesService.textes$.subscribe(
	    (les_textes) => {
		this.textes = les_textes;
		this.loading = false;
	    }
	);
	this.partSub = this.state.part$.subscribe(
	    (a_part) => {
		this.part = a_part;
	    }
	);
	this.textesService.getTextes();
    }

    onTexteClicked(id: string) {
	if (this.part === 1) {
	    this.router.navigate(['/part-one/un_texte/' + id]);
	} else if (this.part === 3) {
	    this.router.navigate(['/part-three/un_but/' + id]);
	} else if (this.part === 4) {
	    this.router.navigate(['/part-four/une_notation/' + id]);
	}
    }

    ngOnDestroy() {
	this.textesSub.unsubscribe();
	this.partSub.unsubscribe();
    }

}
