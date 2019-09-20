import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import * as M from '../irp-provider/managementLibrary';
import * as O from '../models/outils';

@Injectable({
  providedIn: 'root'
})

export class IrpRegisterService {

    public irpRegister$ = new BehaviorSubject<any>('');
    public irpRegister = new Object();

    constructor() { }

    irpStore (irpKey, irpVal, caller) {
	let here = O.functionName ();
	M.entering_in_function (here + '(' + irpKey + ', ' + caller +')')
	
	this.irpRegister[irpKey] = irpVal;
	console.log(here,': irpRegister["'+irpKey+'"] <= "'+irpVal+'"');

	    M.exiting_from_function (here)
    }

    irpIsStored (irpKey, caller):boolean {
	let here = O.functionName ();
	M.entering_in_function (here + ' : (' + irpKey + ', ' + caller +')')

	this.irpRegister$.subscribe(
	    (reg) => {
		this.irpRegister = reg;
		console.log(here,': subscribe irpRegisterService => irpRegister >',this.irpRegister,'<');
		if (reg == '') {
		    alert(here+' irpRegister est vide!');
		}
	    },
	    (error) => {
		console.log(here,': Erreur',error);
	    }
	);

	console.log(here,': irpRegister["',irpKey,'"] = >',this.irpRegister[irpKey],'<');
	let result = this.irpRegister[irpKey] != undefined;
	console.log(here,': result',result);
	M.exiting_from_function (here)
	return result;
	
    }

    irpRetrieve (irpKey, caller):any {
	let here = O.functionName ();
	M.entering_in_function (here + '(' + irpKey + ', ' + caller +')')

	let result = this.irpRegister[irpKey];
	console.log(here,': "'+irpKey+'" =>',result,'<');
	M.exiting_from_function (here)
	return result;
    }
}
