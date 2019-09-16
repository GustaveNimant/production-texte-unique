import * as manLib from './managementLibrary';

function irp_is_providable_of_irp_key (irp_key, caller) {
    //    let here = manLib.getFuncName();
    let here = 'irp_is_providable_of_irp_key';
    manLib.entering_in_function (here + " (" + irp_key + ", "+ caller +")");
    
    let irp_build = irp_key + "_build";

    let boo = typeof irp_build === "function";

    manLib.exiting_from_function (here + " is " + boo.toString);
    return boo;
}

function buildA () {
    let result = 4;
    return result;
}

function buildB () {
    let result = 5;
    return result;
}

function buildAPlusB() {
    let a = provideA();
    let b = provideB();
    
    let result = a + b;
    return result;
}

function provideA () {
    let result = buildA ()
    return result;
}

function provideB () {
    let result = buildB ()
    return result;
}

function provideAPlusB () {
    let result = buildAPlusB();
    return result;
}

export function irp_provide (irp_key, caller) {
    //    let here = manLib.getFuncName();
    let here = 'irp_provide';
    manLib.entering_in_function (here);

    let build_irp_key = 'build'+irp_key+ '()';
    let result = eval (build_irp_key);

    manLib.exiting_from_function (here);
    return result;
}

