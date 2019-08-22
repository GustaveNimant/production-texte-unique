import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ConnexionsService } from './connexions.service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable()

export class ConnexionGuard implements CanActivate {

    constructor(private auth: ConnexionsService,
		private state: StateService,
		private router: Router) {
        console.log('Entrée dans constructor avec state', state);
    };

    canActivate(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot) : Observable<boolean> {
		    console.log('Entrée dans canActivate');
		    return Observable.create(
			(observer) => {
			    this.auth.isAuth$.subscribe(
				(auth) => {
				    if (!auth) {
					this.state.part$.subscribe(
					    (part) => {
						if (part === 5) {
						    this.router.navigate(['/part-five/all-connexions/single-connexion']);
						    this.router.navigate(['/part-five/all-connexions/new-connexion']);
						}
					    }
					);
				    }
				    observer.next(true);
				}
			    );
			}
		    );
		}
}
