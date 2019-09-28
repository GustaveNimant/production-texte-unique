import * as jsSHA from 'jssha';

export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function errorStack () {
    var stack = new Error().stack;
    return stack;
}

export function functionNameByIndex (i:number) {
    var stack = new Error().stack,
	caller = (stack.split('\n')[i].trim()).split('@')[0];
    return caller;
}

export function functionName () {
    var stack = new Error().stack,
	caller = (stack.split('\n')[1].trim()).split('@')[0];
    return caller;
}

export function functionNameForbidden () {
    var ownName = arguments.callee.toString();
    ownName = ownName.substr('function '.length);        // trim off "function "
    ownName = ownName.substr(0, ownName.indexOf('('));        // trim off everything after the function name
    return ownName;
}

export function createSha (str:string, typeSha:string, formatInput: string, formatOutput: string) {
    switch (typeSha) {
	case "SHA-1":
	case "SHA-224":
	case "SHA3-224":
	case "SHA-256":
	case "SHA3-256":
	case "SHA-384":
	case "SHA3-384":
	case "SHA-512":
	case "SHA3-512":
	case "SHAKE128":
	case "SHAKE256":
	    break;
	default:
	    console.log('Dans createShaOfTypeOfString le type de SHA illégal',typeSha);
	    break;
    }
    
    switch (formatInput) {
	case "TEXT":
	    break;
	default:
	    console.log('Dans createShaOfTypeOfString le format d\'Input de SHA illégal',formatInput);
	    break;
    }

    switch (formatOutput) {
	case "HEX":
	    break;
	default:
	    console.log('Dans createShaOfTypeOfString le format d\'Output de SHA illégal',formatOutput);
	    break;
    }

    const shaObj = new jsSHA(typeSha, formatInput);
    shaObj.update(str);
    const hash = shaObj.getHash(formatOutput);
    return hash;
}

export function entering_in_function (str_fun: string) {
    console.log ("entering in function " + str_fun + "()");
};

export function exiting_from_function (str_fun: string ) {
    console.log("exiting from function " + str_fun + "()");
};

export function exiting_from_function_with_what (str_fun: string, str_with:string, what: string ) {
    console.log("exiting from function " + str_fun + "() with "+str_with+" >"+what+"<");
};

export function unsubscribeLog (here:string, what:string) {
    return console.log('%cDans '+here+' %c'+what+' %cunsubscribe','color:#00aa00','color:#aa0000','color:#00aa00')
}
