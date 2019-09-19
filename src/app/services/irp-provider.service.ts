import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IrpRegisterService } from './irp-register.service';  
import * as manLib from '../irp-provider/managementLibrary';
import * as outils from '../models/outils';

@Injectable({
    providedIn: 'root'
})

export class IrpProviderService {

    constructor(
	private router: Router,
	private irpRegisterService: IrpRegisterService,
    )
    {
	let here = 'constructor';
	console.log('%cEntrée dans','color:#00aa00', here);
    }

    buildCurrentEmail () {
	let here = 'buildCurrentEmail';
	manLib.entering_in_function (here + '()');

	let url = '/irp-provider-current-email';
	console.log('Dans',here,'navigation vers',url);
	this.router.navigate([url]);

	manLib.exiting_from_function (here);	
	return here + ' done'
    }

    buildCurrentCompte () {
	let here = 'buildCurrentCompte';
	manLib.entering_in_function (here + '()');

	let url = '/irp-provider-current-compte';
	console.log('Dans',here,'navigation vers', url);
	this.router.navigate([url]);

	manLib.exiting_from_function (here);	
	return here + ' done'
    }

    irpBuild (irpKey, caller):any {
	let here = 'irpBuild';
	manLib.entering_in_function (here + '(' + irpKey + ', ' + caller +')');

	let buildIrpKey = 'this.build'+irpKey+ '()';
	console.log('Dans ',here,'buildIrpKey',buildIrpKey);

	let result ='';
	console.log('Dans ',here,'typeof',buildIrpKey,' ',typeof(buildIrpKey));

	try {
	    let result = eval (buildIrpKey);
	} catch (error) {
	    let result = 'La fonction ' + buildIrpKey + 'n\'existe pas';
	    alert (result)
	}

	if (!result) {
	    alert ('Dans ' + here +' le résultat est vide!');
	}
	console.log('Dans',here,'result >',result,'<');
	manLib.exiting_from_function (here);	
	return result;
    }
    
    irpBuildAndStore (irpKey, caller):any {
	let here = 'irpProvide';
	manLib.entering_in_function (here + '(' + irpKey + ', ' + caller +')');

	let irpVal = this.irpBuild (irpKey, here);
	console.log('Dans ',here,'irpVal',irpVal);

	this.irpRegisterService.irpStore (irpKey, irpVal, here);
	console.log ('Dans',here,'irpKey',irpKey,' a été enregistrée avec irpVal>',irpVal,'<');

	manLib.exiting_from_function (here);	
	return irpVal;
    }
    
    irpProvide (irpKey, caller):any {
	let here = 'irpProvide';
	manLib.entering_in_function (here + '(' + irpKey + ', ' + caller +')');
	
	let IrpKey = outils.capitalize(irpKey);

	if (this.irpRegisterService.irpIsStored(IrpKey, here)) {
	    let result = this.irpRegisterService.irpRetrieve(IrpKey, here);
	    console.log('Dans',here,'isStored result >',result,'<');
	    manLib.exiting_from_function (here);	
	    return result;
	} else {
	    let result = this.irpBuildAndStore(IrpKey, here);
	    console.log('Dans',here,'isBuilt result >',result,'<');
	    manLib.exiting_from_function (here);	
	    return result;
	}
	
    }
    
}
