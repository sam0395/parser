fn = {};

fn.Parser = function(){
	
	var tokens = [];
	var postfix;
	var stack = [];

	operations = {
		sum : function(x,y){return (x + y);},
		subtract : function(x,y){return (x - y);},
		multiply : function(x,y){return (x * y);},
		divide : function(x,y){return (x / y);}
	}
	
	function createTokens(){
		a = {
			type : "num",
			value : "4",
			order : null
		}
		
		b = {
			type : "opr",
			value : "+",
			order : null
		}
		
		c = {
			type : "num",
			value : "4",
			order : null
		}
		
		d = {
			type : "opr",
			value : "/",
			order : null
		}
		
		e = {
			type : "num",
			value : "20",
			order : null
		}
		
		f = {
			type : "opr",
			value : "+",
			order : null
		}
		
		g = {
			type : "num",
			value : "10",
			order : null
		}
		
		tokens.push(a);
		tokens.push(b);
		tokens.push(c);
		tokens.push(d);
		tokens.push(e);
		tokens.push(f);
		tokens.push(g);
	
	}

	function isOpr(ch){
		var result = false;
		
		switch(ch){
			case "*" : result = true;
					   break;
			case "/" : result = true;
					   break;
			case "+" : result = true;
					   break;
			case "-" : result = true;
					   break;
		}
		
		return result;
	}
	
	//sets order of current token if it's an operator
	function setOrder(token){
		var order, opr = token.value, token = token;
		
		switch(opr){
			case "*" : token.order = 1
					   break;
			case "/" : token.order = 1
					   break;
			case "+" : token.order = 2
					   break;
			case "-" : token.order = 2
					   break;
		}
	
	}
	
	//compares current token to stack
	function compareOpr(currentChar, stack, postfix){
		var currentChar = currentChar, stack = stack, postfix = postfix;
		
		for(var i = 0; i < stack.length; i++){
			if(currentChar.order >= stack[i].order){
				postfix.push(stack[i]);
				stack.splice(stack[i].value, 1);
				stack.push(currentChar);
				return postfix;
			}
			else
				stack.push(currentChar);
		}
		
	}
	
	//releases final operators from stack
	function releaseStack(stack, postfix){
		var stack = stack, postfix = postfix;
		if(stack.length > 0){
			for(var i = 0; i <stack.length; i++){
				postfix.push(stack[i]);
			}
		}
		
		return postfix;
	}
	
	
	
	//constructs the postfix string
		//constructs the postfix string
	function createPostfix(){
		var currentChar, stack = [], postfix = [];
		
		for(var i = 0; i < tokens.length; i++){
			currentChar = tokens[i];
			if(currentChar.type === "opr"){
				setOrder(currentChar);
				if(stack.length === 0){
					stack.push(currentChar);
				}else{
					
					postfix = compareOpr(currentChar, stack, postfix);
					
					
				}
				
			}else{
				postfix.push(currentChar);
				
			}
		}
		
		postfix = releaseStack(stack, postfix);
		console.log(postfix);

		var postfixString = "";

		for(var j = 0; j <postfix.length; j++){
			postfixString += postfix[j].value + " ";
			
		}
		console.log(postfixString);
		return postfix;
	}

//--------------------------------------------------- solve -----------------------------------------------------------------
	function arithmetic(num1, num2, opr){
		var answer;

		num1 = parseFloat(num1);
		num2 = parseFloat(num2);

		switch(opr){
			case "*" : answer = {
									value : operations.multiply(num1,num2),
									type : "num"
								}
					   break;
			case "/" : answer = {
									value : operations.divide(num1,num2),
									type: "num"
								}
					   break;
			case "+" : answer = {
									value : operations.sum(num1,num2),
									type: "num"
								}
					   break;
			case "-" : answer = {
									value : operations.subtract(num1,num2),
									type : "num"
								}
					   break;
		}
		
		return answer;
	}

	function solve(postfix){
		if(postfix.length > 1){
			for(var i = 0; i <postfix.length; i++){
				if(postfix[i].type === "opr"){
					answer = arithmetic(postfix[i-2].value, postfix[i-1].value, postfix[i].value);
					postfix.splice(0,3);
					postfix.unshift(answer);
					break;
				}
			}
			solve(postfix);
	}else
		answer = postfix[0].value;
		console.log(answer);
	}

	

	createTokens();
	postfix = createPostfix();
	solve(postfix);

	

		
}

	fn.Parser();