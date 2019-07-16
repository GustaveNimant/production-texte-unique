import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { TexteService } from '../../services/texte.service';
import { Subscription } from 'rxjs';
import { Texte } from '../../models/Texte.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-texte-list',
    templateUrl: './texte-list.component.html',
    styleUrls: ['./texte-list.component.scss']
})

export class TexteListComponent implements OnInit, OnDestroy {

    public texte: Texte[] = [];
    public part: number;
    public loading: boolean;

    private texteSub: Subscription;
    private partSub: Subscription;

    constructor(private state: StateService,
		private texteService: TexteService,
		private router: Router) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.loading = true;
	this.state.mode$.next('list');
	this.texteSub = this.texteService.texte$.subscribe(
	    (un_texte) => {
		this.texte = un_texte;
		this.loading = false;
	    }
	);
	this.partSub = this.state.part$.subscribe(
	    (part) => {
		this.part = part;
	    }
	);
	this.texteService.getTexte();
    }

    onProductClicked(id: string) {
	console.log('Entrée dans ngOnInit');
	if (this.part === 1) {
	    this.router.navigate(['/part-one/texte/' + id]);
	} else if (this.part === 3) {
	    this.router.navigate(['/part-three/texte/' + id]);
	} else if (this.part === 4) {
	    this.router.navigate(['/part-four/texte/' + id]);
	}
    }

    ngOnDestroy() {
	this.texteSub.unsubscribe();
	this.partSub.unsubscribe();
    }

}
