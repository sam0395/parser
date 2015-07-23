fn = {};

fn.Parser = function(){
	
	var tokens = [];
	var postfix;
	
	operations = {
		add : function(x,y){return (x + y);},
		subtract : function(x,y){return (x - y);},
		multiply : function(x,y){return (x * y);},
		divide : function(x,y){return (x / y);}
	}
	
	function createTokens(){
		a = {
			type : "num",
			value : "2",
			order : null
		}
		
		b = {
			type : "opr",
			value : "*",
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
			value : "6",
			order : null
		}
		
		f = {
			type : "opr",
			value : "+",
			order : null
		}
		
		g = {
			type : "num",
			value : "8",
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
				postfix += stack[i].value;
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
				postfix += stack[i].value;
			}
		}
		
		return postfix;
	}
	
	function rewritePostfix(temp, postfix){
		var temp = temp, postfix = postfix;
		
		postfix.slice(0,2);
		postfix = temp + postfix;
		
		return postfix;
	}
	
	//constructs the postfix string
	function createPostfix(){
		var currentChar, stack = [], postfix = "";
		
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
				postfix += currentChar.value;
				
			}
		}
		
		postfix = releaseStack(stack, postfix);
		console.log(postfix);
		return postfix;
	}
	
	function solve(postfix){
		var postfix = postfix, temp;
		
		for(var i = 0; i < postfix.length; i++){
			if(postfix.charAt(i) == "+"){
				temp = operations.add(postfix.charAt(i-2),postfix.charAt(i-1));
				postfix = rewritePostfix(temp, postfix);
			}
			else
				if(postfix.charAt(i) == "-"){
					temp = operations.subtract(postfix.charAt(i-2),postfix.charAt(i-1));
					postfix = rewritePostfix(temp, postfix);
				}
				else
					if(postfix.charAt(i) == "*"){
						temp = operations.multiply(postfix.charAt(i-2),postfix.charAt(i-1));
						postfix = rewritePostfix(temp, postfix);
					}
					else
					`	if(postfix.charAt(i) == "/"){
							temp = operations.divide(postfix.charAt(i-2),postfix.charAt(i-1));
							postfix = rewritePostfix(temp, postfix);
					}else
					console.write("hey");
			
		}
		console.log(postfix);
	}
	
	createTokens();
	postfix = createPostfix();
	solve(postfix);
}

fn.Parser();