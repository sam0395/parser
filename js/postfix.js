$(window).ready(function(){
/*
* Order of operations
*
* 1) parentheses 
* 2) exponents (right to left)
* 3) multiply and divide
* 4) addition and subtraction
*
*/

fn = {};

fn.Parse = function(string) {

	var postfix = string;
	var equation = [];
	var stack = [];
	var error = fn.Error;

	postfix = toArray(postfix);

	for (var i = 0; i < postfix.length; i++) {
		var currentChar = postfix[i];
		if (!isOperator(currentChar)) {
			equation.push(currentChar);
		}else{
			if (stack.length == 0) {
				stack.push(currentChar);
			}else{
				var top = stack[stack.length -1];
				while (getPrecedence(top,currentChar) == top && stack.length > 0){
					equation.push(stack.pop());
					if(stack.length > 0){
						top = stack[stack.length -1];
					}
				}
				stack.push(currentChar);
			}
		}
	}

	while(stack.length > 0){
		equation.push(stack.pop());
	}

	function isOperator(char) {
		return (char == "(" || char == ")" || char == "*" || char == "/" || char == "^" || char == "+" || char =="-");
	}

	// need to find a better way of doing this
	function getPrecedence(char1, char2){

		var md = /([*/])/g; // multiply and divide
		var as = /([+-])/g; // add and substract

		if (char1.match(md) && char2.match(as)) {
			return char1; 
		}else if (char2.match(md) && char1.match(as)) {
			return char2;
		}else if (char1.match(md) && char2.match(md)){
			return char1;
		}else{
			return char1;
		}
	}

	function toArray(string){
		var array = [], eq = string;
		for (var i = 0; i < eq.length; i++) {
			var curChar = eq.substring(i, i+1);

			if ("1234567890".indexOf(curChar) != -1 || curChar == ".") {
				curChar = getNumber(eq.substring(i));
				i += curChar.length -1;
			}

			array.push(curChar);
		}

		// check negatives
		for (var j = 0; j < array.length; i=j++) {
			var neg = array[j];

			if (neg === "-") {
				if(j == 0 && array.length > 0){
					array[0] = "-" + array[1];
					array.splice(1,1);
				}else if(j > 0 && isOperator(array[j - 1]) && "1234567890".indexOf(array[j + 1])){
					array[j] = "-" + array[j + 1];
					array.splice(j+1, 1);
				}
			}
		};

		console.log("Infix: " + array);

		return array;
	}

	// return full number
	function getNumber(string){
		var number = string, curChar;

		curChar = number.substring(0,1);

		// start at 1 to start at next char;
		for (var j = 1; j < number.length; j++) {

			var nextChar = number.substring(j, j+1),
				hasDec = false;

			if (isOperator(nextChar)){
				break;
			}

			curChar += number.substring(j, j+1);
		}

		return curChar;
	}

	return equation;
}

fn.Error = {

	container : $('#Errorcontainer'),
	Display : function(type, message){
		switch(type){
			case 1:
				type = "Syntax Error: ";
		};

		this.container.html(type + message);
	},
	Reset : function(){
		this.container.html(""); 
	}
}

var equation = fn.Parse("-8+-5*8");

console.log("Postfix: " + equation);
});