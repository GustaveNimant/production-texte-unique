import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { TextesService } from '../../services/textes.service';
import { Subscription } from 'rxjs';
import { Un_texte } from '../../models/Un_texte.model';
import { Router } from '@angular/router';
import { ConnexionsService } from '../../services/connexions.service';

@Component({
    selector: 'app-textes-list',
    templateUrl: './textes-list.component.html',
    styleUrls: ['./textes-list.component.scss']
})

export class TextesListComponent implements OnInit, OnDestroy {

    public textes: Un_texte[] = [];
    public part: number;
    public loading: boolean;
    public isAuth: boolean;
    
    private textesSub: Subscription;
    private partSub: Subscription;
    private isAuthSub: Subscription;
    
    constructor(private state: StateService,
		private connexionsService: ConnexionsService,
		private textesService: TextesService,
		private router: Router) { }

    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	
	this.loading = true;
	this.state.mode$.next('list');
	
	this.textesSub = this.textesService.textes$.subscribe(
	    (tex_a) => {
		console.log('Dans ngOnInit tex_a',tex_a);
		this.textes = tex_a;
		this.loading = false;
	    }
	);
	
	this.partSub = this.state.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
		this.part = num;
	    }
	);

	this.isAuthSub = this.connexionsService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);
	
	this.textesService.getTextes(); /* afficher les textes */
    }

    onTexteClicked(id: string) {
	console.log('Entrée dans onTexteClicked avec id',id);
	this.router.navigate(['/part-one/un_texte/' + id]);
    }

    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.textesSub.unsubscribe();
	this.partSub.unsubscribe();
    }

}
