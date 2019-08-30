import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }     from 'rxjs';
import { StateService }     from '../services/state.service';
import { ConnexionsService } from '../services/connexions.service';
import { Router } from '@angular/router';
// import { Outils } from '../models/outils';

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
    public trace: boolean;
    
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
	    (mod) => {
		this.mode = mod;
		console.log('Dans ngOnInit mode',this.mode);
	    }
	);

	this.partSub = this.stateService.part$.subscribe(
	    (num) => {
		console.log('Dans ngOnInit num',num);
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
			this.partString = 'part-five';
			break;
		}
//		this.partString = this.outils.partStringOfNumber(num);
		console.log('Dans ngOnInit partString', this.partString);
	    }
	);
	
	this.isAuthSub = this.connexionsService.isAuth$.subscribe(
	    (boo) => {
		this.isAuth = boo;
		console.log('Dans ngOnInit isAuth', this.isAuth);
	    }
	);
    }

    onLogout() {
	console.log('Entrée dans onLogout avec partString', this.partString);
	this.connexionsService.logout();
	this.router.navigate(['/default']);
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

    onTraceSwitch() {
	console.log('Entrée dans onTraceSwitch');
	this.stateService.traceSwitch();
	this.trace = this.stateService.trace;
	console.log('Dans onTraceSwitch trace', this.trace);
    }

    ngOnDestroy() {
	console.log('Entrée dans ngOnDestroy');
	this.modeSub.unsubscribe();
	this.partSub.unsubscribe();
	this.isAuthSub.unsubscribe();
    }
    
}
