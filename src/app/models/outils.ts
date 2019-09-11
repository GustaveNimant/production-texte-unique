import * as jsSHA from 'jssha';

export function sumOfArray (num_a :number[]) : number {
    let sum = 0;
    for( let i = 0; i < num_a.length; i++ ){
	sum += num_a[i];
    }
    return sum;
}

export function sumROfArray (num_a : number[]) : number {
    let sum = 0;
    if (num_a.length)
    {
	sum = num_a.reduce(function(a, b) { return a + b; });
    }
    return sum;
}

export function averageOfArray (num_a : number[]) : number {
    let sum = sumOfArray (num_a);
    let average = sum / num_a.length;
    return average;
}

export function varianceOfArray (num_a : number[]) : number {
    let average = averageOfArray (num_a);
    let sum2 = 0;
    let variance = 0;
    for( let i = 0; i < num_a.length; i++ ){
	sum2 += (num_a[i])**2;
    }
    variance = (sum2 / num_a.length) - (average)**2;
    return variance;
}

export function rmsOfArray (num_a : number[]) : number {
    let variance = varianceOfArray (num_a);
    let rms = Math.sqrt (variance);
    return rms
}

export function partStringOfNumber(num : number) : string {
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
