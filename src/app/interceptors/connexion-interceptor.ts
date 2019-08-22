import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnexionsService } from '../services/connexions.service';

@Injectable()

export class ConnexionInterceptor implements HttpInterceptor {

    constructor(private auth: ConnexionsService) {
	console.log('Entrée dans constructor');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
	console.log('Entrée dans intercept with req ', req);

	const authToken = this.auth.token;
	console.log('Dans intercept authToken est >', authToken,'<');

	const newRequest = req.clone({
	    headers: req.headers.set('Authorization', 'Bearer ' + authToken)
	});
	
	return next.handle(newRequest);
    }
}
