export function entering_in_function (str_fun: string) {
	console.log ("entering in function " + str_fun + "()");
    };
    
export function exiting_from_function (str_fun: string ) {
	console.log("exiting from function " + str_fun + "()");
    };

export function getFuncName() {
    return getFuncName.caller.name;
}

