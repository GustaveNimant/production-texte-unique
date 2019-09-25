import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { Subscription } from 'rxjs';

import * as O from '../outils/outils-management';

@Injectable({
    providedIn: 'root'
})

export class IrpRegisterService {

    private irpRegisterSub: Subscription;
    public irpRegister$ = new BehaviorSubject<any>('');
    public irpRegister = new Object();

    constructor() { }

    irpStore (irpKey, irpVal, caller) {
	let here = O.functionName ();
	O.entering_in_function (here + '(' + irpKey + ', ' + caller +')')
	console.log(here,'irpVal',irpVal);

	console.log(here,'irpRegister >',this.irpRegister,'<');
	
	if (this.irpRegister == undefined || this.irpRegister == "") {
	    this.irpRegister = new Object();
	}
	this.irpRegister[irpKey] = irpVal;
	console.log(here,': irpRegister["'+irpKey+'"] <= "'+irpVal+'"');
	
	O.exiting_from_function (here)
    }

    irpIsStored (irpKey, caller):boolean {
	let here = O.functionName ();
	O.entering_in_function (here + ' : (' + irpKey + ', ' + caller +')')

	this.irpRegisterSub = this.irpRegister$.subscribe(
	    (reg) => {
		this.irpRegister = reg;
		console.log(here,': subscribe irpRegisterService => irpRegister >',this.irpRegister,'<');
		if (reg == '') {
//		    alert(here+': irpRegister est vide!');
//		    this.irpRegisterSub.unsubscribe();
//		    O.unsubscribeLog(here, 'currentRegisterSub');
		    return false;
		}
	    },
	    (error) => {
		console.log(here,': Erreur',error);
	    }
	);

	console.log(here,': irpRegister["',irpKey,'"] = >',this.irpRegister[irpKey],'<');
	let result = this.irpRegister[irpKey] != undefined;
	console.log(here,': result',result);
	O.exiting_from_function (here)
	return result;
	
    }

    irpRetrieve (irpKey, caller):any {
	let here = O.functionName ();
	O.entering_in_function (here + '(' + irpKey + ', ' + caller +')')

	let result = this.irpRegister[irpKey];
	console.log(here,': "'+irpKey+'" =>',result,'<');
	O.exiting_from_function (here)
	return result;
    }
}
