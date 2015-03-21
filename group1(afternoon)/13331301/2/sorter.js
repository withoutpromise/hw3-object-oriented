window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
	makeAllTablesFilterable(tables)
}

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) {
	initialize(tables);
}

function makeAllTablesFilterable(tables) {
	var inPut = createElement("input");
	inPut.type = "text";
	for (var i = 0; i < tables.length; i++) {
		tables[i].rows[0].appendChild(inPut);
	}
}

function initialize(tables) {
	for (var i = 0; i < tables.length; i++) {
		tables[i].className = "the " + i + "th";
		var head = tables[i].rows[0].cells;
		for (var k = 0; k < head.length; k++) {
			head[k].className = "the " + i + "th";
			head[k].onmouseover = function() {
				this.style.backgroundColor = "rgb(166,175,252)";
			}
			head[k].onmouseout = function() {
				this.style.backgroundColor = "rgb(2,27,127)";
			}
			head[k].onclick = function() {
				var text = this.innerHTML;
				change(this.className, tables, text);
			}
		}
	}
}

function change(classname, tables, text) {
	var head;
	var table;
	for (var i = 0; i < tables.length; i++) {
		if (tables[i].className == classname) {
			head = tables[i].rows[0].cells;
			table = tables[i];
			break;
		}
	}
	s = window.getComputedStyle(head[0],null).backgroundImage;
	if (s.slice(s.length-12,s.length-2) == "ascend.png") {
		sortTable(table, 1, text);
		for (var i = 0; i < head.length; i++) {
			head[i].style.backgroundImage = "url(descend.png)";
		}
	} else {
		sortTable(table, 0, text);
		for (var i = 0; i < head.length; i++) {
			head[i].style.backgroundImage = "url(ascend.png)";
		}
	}
}

function sortTable(table, way, text) {
	var colNum;
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		if (table.rows[0].cells[i].innerHTML == text) {
			colNum = i;
			break;
		}
	}
	
	var raw = Array();
	for (var i = 1; i < table.rows.length; i++) {
		raw[i - 1] = new Array();
		for (var k = 0; k < table.rows[i].cells.length; k++) {
			raw[i - 1][k] = table.rows[i].cells[k].innerHTML;
		}
	}

	var col = Array();
	var r;
	for (var i = 1; i < table.rows.length; i++) {
		col[i - 1] = table.rows[i].cells[colNum].innerHTML;
	}
	col.sort();

	if (way == 1) {
		var x;
		for (var i = 0; i < col.length; i++) {
			for (var k = 0; k < raw.length; k++) {
				if (raw[k][colNum] == col[i]) {
					rowChange(table, raw, i + 1, k);
				}
			}
		}
	} else {
		var x;
		var h = table.rows.length;
		for (var i = 0; i < col.length; i++) {
			for (var k = 0; k < raw.length; k++) {
				if (raw[k][colNum] == col[i]) {
					rowChange(table, raw, h - i - 1, k);
				}
			}
		}
	}
}

function rowChange(table, raw, numt, numr) {
	for (var x = 0; x < table.rows[numt].cells.length; x++) {
		table.rows[numt].cells[x].innerHTML = raw[numr][x];
	}
}

