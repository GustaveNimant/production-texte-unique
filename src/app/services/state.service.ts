import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class StateService {
    public part$ = new BehaviorSubject<number>(0);
    public part = 0;
    
    public mode$ = new BehaviorSubject<string>('');

    public debug$ = new BehaviorSubject<boolean>(true);
    public debug = false;

    public currentUrl$ = new BehaviorSubject<string>('');
    public currentUrl = '';

    debugSwitch() {
	console.log('Entrée dans debugSwitch');
	this.debug = !this.debug;
	console.log('Dans debugSwitch debug', this.debug);
    }

    public trace$ = new BehaviorSubject<boolean>(true);
    public trace = false;

    traceSwitch() {
	console.log('Entrée dans traceSwitch');
	this.trace = !this.trace;
	console.log('Dans traceSwitch trace', this.trace);
    }

}
