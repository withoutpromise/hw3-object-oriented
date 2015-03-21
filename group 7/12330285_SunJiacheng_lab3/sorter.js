Base.staticVariable = 'Base';

Base.staticMethod = function() {
	console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
};

function Extend(base, derived) {
	var obj = Object.create(base.prototype);
	obj.constructor = derived;
	obj.superClass = base.prototype;
	obj.instanceMethod = function() {
		obj.superClass.instanceMethod.call(this);
		console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
	}
	derived.prototype = obj;
}

function Base(instanceVariable) {
	this.instanceVariable = instanceVariable;
}

Base.prototype.instanceMethod = function() {
	console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
};

function Derived(instanceVariable) {
	Base.call(this, instanceVariable);
	this.instanceVariable = instanceVariable;
}

Derived.staticVariable = 'Derived';
Derived.staticMethod = function() {
	this.prototype.superClass.constructor.staticMethod.call(this);
	console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
};

Extend(Base, Derived);

example = new Derived('example');
otherExample = new Derived('other-example');
Derived.staticMethod();
example.instanceMethod();
otherExample.instanceMethod();

function getAllTables() {
	return document.getElementsByTagName('table');
}

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
	makeAllTablesFiltable(tables);
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var th = tables[i].getElementsByTagName("th");
		for (var j = 0; j < th.length; j++) {
			(function(i, j, th) {
				th[j].onclick = function() {
					if (th[j].className == "ascend") {
						Sort(tables[i], j, 0);
						th[j].className = "descend";
					} else {
						Sort(tables[i], j, 1);
						th[j].className = "ascend";
					}
				}
			})(i, j, th);
		}
	}
} 


function Sort(table, count, order) {
	var th = table.getElementsByTagName("th");
	for(var i = 0; i < th.length; i++) {
		th[i].className = "";
	}
	for (var i = 1; i < table.rows.length; i++) {
		for (var j = 1; j < table.rows.length - i; j++) {
			if(order == 1) {
				if (table.rows[j].cells[count].innerHTML > table.rows[j+1].cells[count].innerHTML) {
					swap(table.rows[j], table.rows[j+1]);
				}
			} else {
				if (table.rows[j].cells[count].innerHTML < table.rows[j+1].cells[count].innerHTML) {
					swap(table.rows[j], table.rows[j+1]);
				}
			}
		}
	}
}

function swap(a, b) {
	var temp = a.innerHTML;
	a.innerHTML = b.innerHTML;
	b.innerHTML = temp;
}

function makeAllTablesFiltable(tables) {
	for (var i = 0; i < tables.length; i++) {
		makeFiltable(tables[i]);
	}
}

function makeFiltable(table) {
	var input = document.createElement('input');
    input.addEventListener("keyup", filt);
	table.appendChild(input);
}

function filt() {
	var keyword = this.value.toString();
	var table = this.parentNode;
	if (keyword === '') {
		for (i = 1; i < table.rows.length; i++) {
			table.rows[i].classList.remove('hide');
		}
		return;
	}
	for (i = 1; i < table.rows.length; i++) {
		var hasKeyword = false;
		for (j = 0; j < table.rows[i].cells.length; j++) {
			var content = table.rows[i].cells[j].innerHTML;
			if (content.indexOf(keyword) !== -1) {
                hasKeyword = true;
				break;
			}
		}
		if (hasKeyword == false) {
			table.rows[i].classList.add('hide');
		} else {
			table.rows[i].classList.remove('hide');
		}
	}
}

