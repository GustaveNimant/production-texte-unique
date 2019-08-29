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

    debugSwitch() {
	console.log('Entrée dans debugSwitch');
	this.debug = !this.debug;
	console.log('Dans debugSwitch debug', this.debug);
    }

    partStringOfNumber(num : number) {
	switch (num) {
	    case 1:
		return 'part-one';
		break;
	    case 2:
		return 'part-two';
		break;
	    case 3:
		return 'part-three';
		break;
	    case 4:
		return 'part-four';
		break;
	    case 5:
		return 'part-five';
		break;
	    default:
		return 'part-five';
		break;
	}
    }
}
