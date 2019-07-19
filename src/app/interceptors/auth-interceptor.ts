import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {
	console.log('Entrée dans constructor');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
	console.log('Entrée dans intercept with req ', req);

	const authToken = this.auth.token;
	console.log('Dans intercept authToken est', authToken);

	const newRequest = req.clone({
	    headers: req.headers.set('Authorization', 'Bearer ' + authToken)
	});
	
	return next.handle(newRequest);
    }
}
