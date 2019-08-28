import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }     from 'rxjs';
import { StateService }     from '../services/state.service';
import { ConnexionsService } from '../services/connexions.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

    public mode: string;
    public part: number;
    public partString: string;
    public isAuth: boolean;
    public debug: boolean;
    
    private modeSub: Subscription;
    private partSub: Subscription;
    private isAuthSub: Subscription;

    constructor(private stateService: StateService,
		private connexionsService: ConnexionsService,
		private router: Router)
		{ 
		    console.log('Entrée dans constructor');
		};
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');

	this.modeSub = this.stateService.mode$.subscribe(
	    (a_mode) => {
		console.log('Dans ngOnInit mode >', a_mode,'<');
		this.mode = a_mode;
	    }
	);

	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('ngOnInit num is', num);
		this.part = num;
		switch (num) {
		    case 1:
			this.partString = 'part-one';
			break;
		    case 2:
			this.partString = 'part-two';
			break;
		    case 3:
			this.partString = 'part-three';
			break;
		    case 4:
			this.partString = 'part-four';
			break;
		    case 5:
			this.partString = 'part-five';
			break;
		    default:
			break;
		}
	    }
	);
	
	this.isAuthSub = this.connexionsService.isAuth$.subscribe(
	    (connexionsService) => {
		this.isAuth = connexionsService;
	    }
	);
    }

    onLogout() {
	console.log('Entrée dans onLogout avec partString', this.partString);
	this.connexionsService.logout();
	this.router.navigate(['/' + this.partString +'/all-connexions/login']);
    }
    
    onBackToMainMenu() {
	console.log('Entrée dans onBackToMainMenu');
	this.router.navigate(['/default']);
    }

    onDebugSwitch() {
	console.log('Entrée dans onDebugSwitch');
	this.stateService.debugSwitch();
	this.debug = this.stateService.debug;
	console.log('Dans onDebugSwitch debug', this.debug);
    }

    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.modeSub.unsubscribe();
	this.partSub.unsubscribe();
	this.isAuthSub.unsubscribe();
    }
    
}
