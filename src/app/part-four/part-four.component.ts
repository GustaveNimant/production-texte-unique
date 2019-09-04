import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { ConnexionsService } from '../services/connexions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-part-four',
  templateUrl: './part-four.component.html',
  styleUrls: ['./part-four.component.scss']
})
export class PartFourComponent implements OnInit, OnDestroy {

    private currentUrl: string;

    constructor(private stateService: StateService,
		private auth: ConnexionsService,
		private router: Router) 
		{
		    console.log('Entrée dans constructor');
		}
        
    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.auth.isAuth$.next(false);
	this.auth.connexionId = '';
	this.auth.token = '';

	this.stateService.part$.next(4);
	this.stateService.part = 4;
	console.log('Dans ngOnInit part', this.stateService.part);

	this.currentUrl = this.router.url;
	this.stateService.currentUrl$.next(this.currentUrl);
	console.log('Dans ngOnInit currentUrl', this.currentUrl);
    }
    
    ngOnDestroy() {
    }
}
