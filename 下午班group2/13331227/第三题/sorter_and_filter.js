window.onload = function() {
	var tables = getAllTables();
	for (var l = 0; l < tables.length; l++) { 
		var input = document.createElement("input");
		tables[l].appendChild(input);
		tables[l].lastChild.placeholder = "Fiterable Key";
		tables[l].lastChild.addEventListener("input", Filter);
	}
	makeAllTablesFilterable(makeAllTablesSortable(tables));
	makeAllTablesSortable(makeAllTablesFilterable(tables));
}

function getAllTables() {
	var t = document.getElementsByTagName("table");
	return t;
}

// Sorter
var check = 0;
function makeAllTablesSortable(tables) {
	for (var t = tables.length - 1; t >= 0; t--) {
	var rows = tables[t].rows;
	var thead = rows[0].cells;
	for (var i = 0; i <= thead.length - 1; i++) {
		thead[i].onmouseout = function() {
			this.style.backgroundColor = "#00008B";
			this.style.backgroundImage = "none";
		}         
			thead[i].onclick = (function(i, t) {
				return function() {
					var index = this.cellIndex;
					var myTable = this.parentNode.parentNode.parentNode;
					var myRows = new Array();
					for (var n = 0; n < myTable.tBodies[0].rows.length; n++) {
						myRows[n] = myTable.tBodies[0].rows[n];
					};
					this.style.backgroundColor = "#C2C2E3";
					if (check == 0) {
						this.style.backgroundImage = "url('ascend.png')";
						myRows.sort(
							function(a, b) {
								var value1 = a.cells[index].textContent;
	                    		var value2 = b.cells[index].textContent;
	                    		if (isNaN(value1)) return value1.localeCompare(value2);
	                   			else return value1 - value2;
							}
						);

						var nodes = this.parentNode.childNodes;
						for (var j = 0; j < nodes.length; j++)
							nodes[j].className = "";
						check = 1;

					} else {
	        			myRows.reverse();
	        			this.style.backgroundImage = "url('descend.png')";
	        		if (check == 0) check = 1;
	        		else check = 0
	        	}
				var fragment = document.createDocumentFragment();
	        	for (var k = 0; k < myRows.length; k++)
	            	fragment.appendChild(myRows[k]);
	        	myTable.tBodies[0].appendChild(fragment);
	        	Gray(myTable.tBodies[0].rows);
	        };
  			})(i, t);
}
}
	return tables;
}

function Gray(rows) {
	for (var r = 0; r < rows.length; r++) {
		rows[r].className = "";
		rows[r].style.backgroundColor = "white";
		if (r % 2 == 1)
			rows[r].style.backgroundColor = "#C8C8C8";
	};
}

// Filter
function makeAllTablesFilterable(tables) {
	for (var l = 0; l < tables.length; l++) { 
		tables[l].lastChild.addEventListener("input", Filter);
	}
	return tables;
}

function Filter() {
	var s = this.value;
	var table = this.parentNode;
	var swap = table;
	this.placeholder = "";
	remoteHightlight(table);
	if (s.length != 0) {
		for (var l = 1; l < table.rows.length; l++) {
			if (table.rows[l].innerHTML.match(s)) {
				table.rows[l].style.display = '';
				for(var c = 0; c <table.rows[l].cells.length; c++) {
					cellValue = table.rows[l].cells[c].innerHTML;
					position = cellValue.search(s);
					var former = string(0,  position, cellValue);
					var key = string(position,  position + s.length, cellValue);
					var latter = string(position + s.length,  cellValue.length, cellValue);
					table.rows[l].cells[c].innerHTML = former + "<font color=red>" + key + "</font>"+ latter;
				}
			} else {
				table.rows[l].style.display = "none";
			}
		};
	} else {
		for (var l = 1; l < table.rows.length; l++)
			table.rows[l].style.display= '';
	}
}
function remoteHightlight(table) {
	for (var l = 1; l < table.rows.length; l++) {
		table.rows[l].style.display= '';
		for (var c = 0; c < table.rows[l].cells.length; c++) {
			var temp = table.rows[l].cells[c].innerHTML.replace(/<.+?>/gim,'');
			table.rows[l].cells[c].innerHTML = temp;
		}
			
	};
}
function string(num1, num2, content) {
	var str = "";
	for(var num = num1; num < num2; num++) {
		str += content.charAt(num);
	}
	return str;
}