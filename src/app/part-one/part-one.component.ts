import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ConnexionsService } from '../services/connexions.service';
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
		private connexionsService: ConnexionsService,
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

	this.isAuthSub = this.connexionsService.isAuth$.subscribe(
	    (boo) => {  /* Pour afficher les textes */
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans ngOnInit currentUrl', this.currentUrl);
	
    }

}
