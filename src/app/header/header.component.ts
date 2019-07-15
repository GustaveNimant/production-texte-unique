import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';
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

    private modeSub: Subscription;
    private partSub: Subscription;
    private isAuthSub: Subscription;

    constructor(private state: StateService,
		private auth: AuthService,
		private router: Router) { 
	// ICI console.log('Entrée dans constructor');
    };
    
    ngOnInit() {
	console.log('Entrée dans ngOnInit');
	this.modeSub = this.state.mode$.subscribe(
	    (mode) => {
		console.log('ngOnInit mode is', mode);
		this.mode = mode;
	    }
	);
	this.partSub = this.state.part$.subscribe(
	    (part) => {
		console.log('ngOnInit part is', part);
		this.part = part;
		switch (part) {
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
		    default:
			break;
		}
	    }
	);
	this.isAuthSub = this.auth.isAuth$.subscribe(
	    (auth) => {
		this.isAuth = auth;
	    }
	);
    }

    onLogout() {
	console.log('Entrée dans onLogout partString', this.partString);
	this.auth.logout();
	this.router.navigate(['/' + this.partString +'/auth/login']);
    }
    
    onBackToParts() {
	console.log('Entrée dans onBackToParts');
	this.router.navigate(['/default']);
    }
    
    ngOnDestroy() {
	// console.log('Entrée dans ngOnDestroy');
	this.modeSub.unsubscribe();
	this.partSub.unsubscribe();
	this.isAuthSub.unsubscribe();
    }
    
}
