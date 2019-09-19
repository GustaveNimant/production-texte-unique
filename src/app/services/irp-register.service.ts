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
	manLib.entering_in_function (here + '(' + irpKey + ', ' + caller +')')
	
	this.irpRegister[irpKey] = irpVal;
	console.log('Dans', here,'irpKey', irpKey,'a été enregistrée\navec irpVal >',irpVal,'<');

	manLib.exiting_from_function (here)
    }

    irpIsStored (irpKey, caller):boolean {
	let here = 'irpIsStored';
	manLib.entering_in_function (here + '(' + irpKey + ', ' + caller +')')

	this.irpRegister$.subscribe(
	    (reg) => {
		this.irpRegister = reg;
		console.log('Dans',here,'irpRegisterService => irpRegister', this.irpRegister);
		if (reg == '') {
		    console.log('Dans',here,'navigation vers /login');
		}
	    },
	    (error) => {
		console.log('Dans',here,'Erreur',error);
	    }
	);
	console.log('Dans',here,'irpRegister', this.irpRegister);
	console.log('Dans', here,'irpRegister["',irpKey,'"] = >',this.irpRegister[irpKey],'<');
	let result = this.irpRegister[irpKey] != undefined;
	console.log('Dans', here,'result',result);
	manLib.exiting_from_function (here)
	return result;
	
    }

    irpRetrieve (irpKey, caller):any {
	let here = 'irpRetrieve';
	manLib.entering_in_function (here + '(' + irpKey + ', ' + caller +')')

	let result = this.irpRegister[irpKey];
	console.log('Dans', here,'result >',result,'<');
	manLib.exiting_from_function (here)
	return result;
    }
}
