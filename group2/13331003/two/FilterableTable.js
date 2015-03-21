window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
	for (var index = 0; index < tables.length; index++) {
		////在表格之前加上文本域
		var textArea = document.createElement("input");
		textArea.setAttribute("type", "text");
		tables[index].parentNode.insertBefore(textArea, tables[index]);
		makeEachTableFilterable(tables[index]);
	}
}

function makeEachTableFilterable(table) {
	////文本域的值发生改变时
	table.previousSibling.onchange = function() {
		var string = table.previousSibling.value;
		for (var index = 1; index < table.rows.length; index++) {
			var exist = 0;
			var all_td = table.rows[index].getElementsByTagName("td");
			for (var i = 0; i < all_td.length; i++) {
				if (all_td[i].innerHTML.indexOf(string) >= 0) {
					all_td[i].innerHTML = all_td[i].innerHTML.replace(string, "<span class=\"blink\">" + string + "</span>");
					exist = 1;
				}
			}
			if (exist == 0) {
				table.deleteRow(index);
				index--;
			}
		}
	}
}
