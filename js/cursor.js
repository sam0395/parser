$(function() {

var fn = {};

fn.Editor = function(container) {
	var editor, cursor; 

	function focus() {
		if (cursor != null) {
			cursor.show();
		}
		editor.focus();
	}

	function setup(){

		//setup editor 
		//Add a tabindex of 1 so it is focusable
		editor = document.getElementById(container);
		editor.setAttribute("tabindex", "1");

		// created a cursor class.
		// added some api methods. 
		// cursor.hide() && cursor.show()
		cursor = new fn.Cursor(editor);
		cursor.create();

		editor.addEventListener('mousedown', function (e) {
			var x, y, element, x1, x2, y1, y2;

			cursor.show();


			// algorithim for setting the position of the cursor
			x = e.clientX;
			y = e.clientY; 
		    for (i = 0; i < editor.childNodes.length -1; i += 1) {
		    	element = editor.childNodes[i];
		    	x1 = element.offsetLeft - 2;
	            x2 = x1 + element.offsetWidth;
	            y1 = element.offsetTop;
	            y2 = y1 + element.offsetHeight;
	            if (x1 <= x && x < x2 && y1 <= y && y < y2) {
	                cursor.move(i);
	            }
		    }
		});

		editor.addEventListener("keyup", function(e) {keyPress(e);});

	}

	function keyPress(e) {
		console.log(e.which);
	}

	// unused...
	function insertText(index, text) {
		return null;
	}

	setup();
}

// created a cursor class
fn.Cursor = function(editor) {

	var cursor, blinkTimer, focused = false, editor;

	editor = editor;

	function create() {
	    
	    cursor = {
			index : 0,
			element : null
		}

		buildCursor();
		update();

		function buildCursor() {
			if(cursor.element === null){
				cursor.element = document.createElement('span');
				cursor.element.id = 'cursor';
				cursor.element.className = 'cursor';
				cursor.element.style.visibility = "hidden";
				cursor.element.innerHTML = '\u00A0';
				editor.appendChild(cursor.element);
			}
		}
	}

	function blink() {
		var visible = true;
        if (blinkTimer) {
            window.clearInterval(blinkTimer);
        }
        blinkTimer = window.setInterval(function () {
        	if (!focused) {
        		window.clearInterval(blinkTimer);
        		cursor.element.style.visibility = "hidden";
        	}else{
	            cursor.element.style.visibility = visible ? '' : 'hidden';
	            visible = !visible;
	        }
        }, 423);
	}

	function move(index) {
		var x, y, el;

		el = editor.childNodes[index];

		console.log(el);
		if (el) {
            x = el.offsetLeft;
            y = el.offsetTop;
            cursor.element.style.left = x + 'px';
            cursor.element.style.top = y + 'px';
            cursor.element.style.opacity = 1;
        }
	}

	function hide() {
		focused = false;
		update();
	}

	function show() {
		focused = true;
		update();
	}

	function update() {
		blink();
	}

	return {
		create : create,
		hide : hide,
		show : show,
		move : move
	}
}

var editor = fn.Editor('Editor');

}); 