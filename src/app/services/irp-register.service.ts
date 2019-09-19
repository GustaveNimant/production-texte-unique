import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import * as manLib from '../irp-provider/managementLibrary';
import * as outils from '../models/outils';

@Injectable({
  providedIn: 'root'
})

export class IrpRegisterService {

    public irpRegister$ = new BehaviorSubject<any>('');
    public irpRegister = new Object();

    constructor() { }

    irpStore (irpKey, irpVal, caller) {
	let here = 'irpStore';
	manLib.entering_in_function (here + '(' + irp_key + ', ' + caller +')')
	
	this.irpRegister[irpKey] = irpVal;
	console.log('Dans', here,'la clé',irpKey,'a été enregistrée');

	manLib.exiting_from_function (here)
    }

    irpIsStored (irpKey, caller):boolean {
	let here = 'irpIsStored';
	manLib.entering_in_function (here + '(' + irp_key + ', ' + caller +')')

	let result = this.irpRegister[irpKey] != undefined;
	console.log('Dans', here,'result',result);
	manLib.exiting_from_function (here)
	return result;
	
    }

    irpRetrieve (irpKey, caller):boolean {
	let here = 'irpRetrieve';
	manLib.entering_in_function (here + '(' + irp_key + ', ' + caller +')')

	let result = this.irpRegister[irpKey] != undefined;
	console.log('Dans', here,'result',result);
	manLib.exiting_from_function (here)
	return result;
	
    }
}
