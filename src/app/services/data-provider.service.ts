import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IrpRegisterService } from './irp-register.service';  

import * as M from '../irp-provider/managementLibrary';
import * as O from '../models/outils';

@Injectable({
    providedIn: 'root'
})

export class DataProviderService {

    constructor(
	private router: Router,
	private irpRegisterService: IrpRegisterService,
    )
    {
	let here = O.functionName ();
	console.log('%cEntrée dans','color:#00aa00', here);
    }

    currentEmailBuild () {
	let here = O.functionName ();
	M.entering_in_function (here + '()');

	console.log('Dans',here,'navigation vers /irp-provider-current-email');
	this.router.navigate(['/irp-provider-current-email']);

	M.exiting_from_function (here);	
	return here + ' done'
    }

    dataBuild (irpKey, caller):any {
	let here = O.functionName ();
	M.entering_in_function (here + '(' + irpKey + ', ' + caller +')');

	let irpKeyBuild = 'this.'+irpKey+'Build()';
	console.log('Dans ',here,'irpKeyBuild',irpKeyBuild);

	console.log('Dans ',here,'typeof',irpKeyBuild,' ',typeof(irpKeyBuild));

	try {
	    let result = eval (irpKeyBuild);
	    console.log('Dans',here,'result >',result,'<');
	    if (!result) {
		alert ('dans ' + here +' le résultat est vide!');
	    }
	    M.exiting_from_function (here);	
	    return result;
	} catch (error) {
	    let result = here+': la fonction ' + irpKeyBuild + 'n\'existe pas';
	    alert (result)
	}
	
    }
    
    dataBuildAndStore (irpKey, caller):any {
	let here = O.functionName ();
	M.entering_in_function (here + '(' + irpKey + ', ' + caller +')');

	let irpVal = this.dataBuild (irpKey, here);
	console.log('Dans ',here,'irpVal',irpVal);

	this.irpRegisterService.irpStore (irpKey, irpVal, here);
	console.log ('Dans',here,'irpKey',irpKey,' a été enregistrée avec irpVal>',irpVal,'<');

	M.exiting_from_function (here);	
	return irpVal;
    }
    
    dataProvide (irpKey, caller):any {
	let here = O.functionName ();
	M.entering_in_function (here + '(' + irpKey + ', ' + caller +')');


	if (irpKey == O.capitalize(irpKey)){
	    alert ('irpKey >'+irpKey+'< ne doit pas être capitalisée!')
	}

	if (this.irpRegisterService.irpIsStored(irpKey, here)) {
	    let result = this.irpRegisterService.irpRetrieve(irpKey, here);
	    console.log('Dans',here,'isStored result >',result,'<');
	    M.exiting_from_function (here);	
	    return result;
	} else {
	    let result = this.dataBuildAndStore(irpKey, here);
	    console.log('Dans',here,'isBuilt result >',result,'<');
	    M.exiting_from_function (here);	
	    return result;
	}
	
    }
    
}
