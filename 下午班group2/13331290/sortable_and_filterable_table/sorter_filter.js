window.onload = function() {
	var tables = getAllTables();
	for (var i = 0; i < tables.length; i++) {
		var inputRow = document.createElement("INPUT");
		tables[i].appendChild(inputRow);
		tables[i].lastChild.placeholder = "filter keywords";
	}
	makeSortable(makeFilterable(tables));
	makeFilterable(makeSortable(tables));
}

function getAllTables() {
	return document.getElementsByTagName("table");
}


function makeSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		for (var j = 0; j < tables[i].rows[0].cells.length; j++) {
			tables[i].rows[0].cells[j].addEventListener("click", mySort);
		}
	}
	return tables;
}

function mySort() {
	var i, j, index, sort_way, new_table = new Array(), col = this.cellIndex,
		tbody = this.parentNode.parentNode.nextSibling.nextSibling;

	for (i = 0; i < this.parentNode.cells.length; i++) {
		if (this.parentNode.cells[i] != this) {
			this.parentNode.cells[i].className += "initial";
		}
	}

	if (this.className == "ascend") {
		this.className = "descend";
		sort_way = -1;
	} else {
		this.className = "ascend"
		sort_way = 1;
	}

	for (i = 0; i < tbody.rows.length; i++) {
		if (tbody.rows[i].className != "hidden") {
			new_table[i] = new Array();
			for (j = 0, index = 0; j < tbody.rows[i].cells.length; j++) {
				tbody.rows[i].cells[j].innerHTML = clearHighlight(tbody.rows[i].cells[j].innerHTML);
				new_table[i][index++] = tbody.rows[i].cells[j].innerHTML;
			}
		}
	}

	new_table.sort(function (a, b) {
		return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? sort_way : -1 * sort_way);
	});

	for (i = 0, index = 0; i < tbody.rows.length; i++) {
		if (tbody.rows[i].className != "hidden") {
			tbody.rows[i].innerHTML = "<td>" + new_table[index++].join("</td><td>") + "</td>";
		}
	}
}


function makeFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		tables[i].lastChild.addEventListener("input", myFilter);
	}
	return tables;
}

function myFilter() {
	var tbody = this.parentNode;
	for (var i = 1; i < tbody.rows.length; i++) {
		var isFound = false;
		for (var j = 0; j < tbody.rows[i].cells.length; j++) {
			var searched = this.value,
				cellContent = clearHighlight(tbody.rows[i].cells[j].innerHTML);
				pos = cellContent.toLowerCase().search(searched.toLowerCase());

			if (pos != -1) {
				isFound = true;

				var beforeHightlight = "";
				for (var k = 0; k < pos; k++) {
					beforeHightlight += cellContent.charAt(k);
				}


				var highlight = "";
				for (var k = pos; k < pos + searched.length; k++) {
					highlight += cellContent.charAt(k);
				}

				var afterHightlight = "";
				for (var k = pos + searched.length; k < cellContent.length; k++) {
					afterHightlight += cellContent.charAt(k);
				}

				tbody.rows[i].cells[j].innerHTML = 
				"<span class='noHighlight'>" + beforeHightlight
				+ "</span><span class='highlight'>" + highlight
				+ "</span><span class='noHighlight'>" + afterHightlight
				+ "</span>";
			}
		}
		if (isFound == false) {
			tbody.rows[i].className = "hidden";
		} else {
			tbody.rows[i].className = "visible";
		}
	}
}

function clearHighlight(cellContent) {	
	var newCellContent = "";
	for (var i = 0; i < cellContent.length; i++) {
		if (cellContent.charAt(i) == '<') {
			while (cellContent.charAt(i) != '>') {
				i++;
			}
		} else {
			newCellContent += cellContent.charAt(i);
		}
	}
	return newCellContent;
}