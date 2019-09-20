import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IrpRegisterService } from './irp-register.service';  

import * as M from '../irp-provider/managementLibrary';
import * as O from '../models/outils';

@Injectable({
    providedIn: 'root'
})

export class IrpProviderService {

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

	let url = '/irp-provider-current-email';
	console.log('Dans',here,'navigation vers',url);
	this.router.navigate([url]);

	M.exiting_from_function (here);	
	return here + ' done'
    }

    currentCompteBuild () {
	let here = O.functionName ();
	M.entering_in_function (here + '()');

	let url = '/irp-provider-current-compte';
	console.log('Dans',here,'navigation vers', url);
	this.router.navigate([url]);

	M.exiting_from_function (here);	
	return here + ' done'
    }

    irpBuild (irpKey, caller):any {
	let here = O.functionName ();
	M.entering_in_function (here + '(' + irpKey + ', ' + caller +')');

	let irpKeyBuild = 'this.'+irpKey+ 'Build()';
	console.log('Dans ',here,'irpKeyBuild',irpKeyBuild);

	let result ='';
	console.log('Dans ',here,'typeof',irpKeyBuild,' ',typeof(irpKeyBuild));

	try {
	    let result = eval (irpKeyBuild);
	} catch (error) {
	    let result = 'La fonction ' + irpKeyBuild + 'n\'existe pas';
	    alert (result)
	}

	if (!result) {
	    alert ('Dans ' + here +' le résultat est vide!');
	}
	
	console.log('Dans',here,'result >',result,'<');
	M.exiting_from_function (here);	
	return result;
    }
    
    irpBuildAndStore (irpKey, caller):any {
	let here = O.functionName ();
	M.entering_in_function (here + '(' + irpKey + ', ' + caller +')');

	let irpVal = this.irpBuild (irpKey, here);
	console.log('Dans ',here,'irpVal',irpVal);

	this.irpRegisterService.irpStore (irpKey, irpVal, here);
	console.log ('Dans',here,'irpKey',irpKey,' a été enregistrée avec irpVal>',irpVal,'<');

	M.exiting_from_function (here);	
	return irpVal;
    }
    
    irpProvide (irpKey, caller):any {
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
	    let result = this.irpBuildAndStore(irpKey, here);
	    console.log('Dans',here,'isBuilt result >',result,'<');
	    M.exiting_from_function (here);	
	    return result;
	}
	
    }
    
}
