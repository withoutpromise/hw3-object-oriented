window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
	for (var l = 0; l < tables.length; l++) { 
		var input = document.createElement("input");
		tables[l].appendChild(input);
		tables[l].lastChild.placeholder = "Fiterable Key";
		tables[l].lastChild.addEventListener("input", Filter);
	}
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