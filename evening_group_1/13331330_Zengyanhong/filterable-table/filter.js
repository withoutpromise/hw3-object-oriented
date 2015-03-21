window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
};

function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var s=document.createElement("input");
		var g=document.createElement("button");
		g.innerHTML = "Search";
		tables[i].appendChild(s);
		tables[i].appendChild(g);
		g.onclick = function() {
			makeFilterable(this.offsetParent);
		}
	}
}

function makeFilterable(table) {
	tarr = table;
	var index = tarr.childNodes.length - 2;
	var filter = tarr.childNodes[index].value;

	if (filter != "") {
		for (var i = 0; i < tarr.rows.length; i++) {
			var flag = 0;
			var tmp = tarr.rows[i].cells;
			for (var j = 0; j < tmp.length; j++) {
				if (tmp[j].innerHTML.match(new RegExp("(^|\\s)" + filter + "(\\s|$)"))) {
					flag = 1;
					var text = tmp[j].innerHTML;
        			var index = text.indexOf(filter);
        			tmp[j].innerHTML = text.substring(0, index) + "<span style='color: red'>" + text.substring(index, index + filter.length) + "</span>" + text.substring(index + filter.length, text.length);
				} else {
					tmp[j].innerHTML = tmp[j].innerHTML.replace(/<[^>]+>/g, "");
				}
			}
			if (flag) {
				tarr.rows[i].style.display = "table-row";
			} else {
				tarr.rows[i].style.display = "none";
			}
		}
	}

	return table;
}

