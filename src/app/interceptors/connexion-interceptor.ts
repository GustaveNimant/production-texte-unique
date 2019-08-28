import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnexionsService } from '../services/connexions.service';
import { Observable } from 'rxjs';

@Injectable()

export class ConnexionInterceptor implements HttpInterceptor {

    constructor(private auth: ConnexionsService) {
	console.log('Entrée dans constructor');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
	console.log('Entrée dans intercept with req.headers', req.headers);

	const authToken = this.auth.token; /* Improve */
	console.log('Dans intercept authToken >',authToken,'<');

	const newRequest = req.clone({ /* req est inchangé. */
	    headers: req.headers.set('Authorization', 'Bearer ' + authToken)
	});
	
	return next.handle(newRequest);
    }
}
