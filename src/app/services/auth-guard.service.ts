import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService,
		private state: StateService,
		private router: Router) {
        console.log('Entrée dans constructor avec state', state);
    };
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
	console.log('Entrée dans canActivate');
	return Observable.create(
	    (observer) => {
        this.auth.isAuth$.subscribe(
          (auth) => {
            if (!auth) {
              this.state.part$.subscribe(
                (part) => {
                  if (part === 2) {
                    this.router.navigate(['/part-two/auth/login']);
                  } else if (part === 2) {
                    this.router.navigate(['/part-two/auth/signup']);
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
