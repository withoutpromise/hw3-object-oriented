window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var inputRow = document.createElement("INPUT");
		tables[i].appendChild(inputRow);
		tables[i].lastChild.placeholder = "filter keywords";
		tables[i].lastChild.addEventListener("input", myFilter);
	}
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

				tbody.rows[i].cells[j].innerHTML = "<span class='noHighlight'>" + beforeHightlight
				+ "</span><span class='highlight'>" + highlight
				+ "</span><span class='noHighlight'>" + afterHightlight + "</span>";
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