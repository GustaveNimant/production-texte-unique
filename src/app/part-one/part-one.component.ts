import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { CompteService } from '../services/compte.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-part-one',
  templateUrl: './part-one.component.html',
  styleUrls: ['./part-one.component.scss']
})

export class PartOneComponent implements OnInit {

    public titre: string;
    public isAuth: boolean;
    private isAuthSub: Subscription;
    private currentUrl: string;

    constructor(private stateService: StateService,
		private compteService: CompteService,
		private router: Router)
		{
		    console.log('Entrée dans constructor');
		}

    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.stateService.part$.next(1);
	this.stateService.part = 1;
	console.log('Dans ngOnInit part assigné à', this.stateService.part);

	this.titre = "Les textes"

	this.isAuthSub = this.compteService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

	this.stateService.currentUrl$.next(this.router.url);
	console.log('Dans ngOnInit this.router.url', this.router.url);
	
    }

}
