import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
	console.log('%cEntrée dans','color:#00aa00', here);

	let url = '/irp-provider-current-email';
	console.log('Dans',here,'navigation vers',url);
	this.router.navigate([url]);

	return here + ' done'
    }

    buildCurrentCompte () {
	let here = 'buildCurrentCompte';
	console.log('%cEntrée dans','color:#00aa00', here);

	let url = '/irp-provider-current-compte';
	console.log('Dans',here,'navigation vers', url);
	this.router.navigate([url]);

	return here + ' done'
    }

    irpProvide (irpKey, caller):string {
	let here = 'irpProvide';
	manLib.entering_in_function (here + '(' + irpKey + ', ' + caller +')');

	let IrpKey = outils.capitalize(irpKey); 
	let buildIrpKey = 'this.build'+IrpKey+ '()';
	console.log('Dans ',here,'buildIrpKey',buildIrpKey);

	let result ='';
	console.log('Dans ',here,'typeof',buildIrpKey,' ',typeof(buildIrpKey));
	try {
	    let result = eval (buildIrpKey);
	} catch (error) {
	    let result = 'La fonction ' + buildIrpKey + 'n\'existe pas';
	    alert (result)
	}
	manLib.exiting_from_function (here);	
	return result;
    }

}
