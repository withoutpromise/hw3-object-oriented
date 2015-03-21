// Return all tables from current webpage.
var getAllTables = function() {
    return document.getElementsByTagName('table');
};

// Make all tables filterable.
var makeAllTablesFilterable = function(tables) {
	for (var index  = 0; index < tables.length; index++) {
		makeTableFilterabler(tables[index]);
	}
	return tables;
};

// Make a single table filterable.
var makeTableFilterabler = function(table) {
	var inputBar = document.createElement('input');
	document.body.insertBefore(inputBar, table);
	// Append input block for each table.
	
	inputBar.oninput = function() {
		var inputContent = this.value;
		var Exp = new RegExp(inputContent, "g");
		var thead = table.getElementsByTagName("th");
		var tbody = table.getElementsByTagName("tbody")[0];
		var trow = tbody.getElementsByTagName("tr");
		for (var i = 0; i < trow.length; i++) {
			var tdata = trow[i].getElementsByTagName("td");
			var visible = false;
			for (var j = 0; j < tdata.length; j++) {
				tdata[j].innerHTML = tdata[j].innerHTML.replace(/<span class="highlight">|<\/span>/g, "");
				if (Exp.test(tdata[j].innerHTML)) {
					visible = true;
					tdata[j].innerHTML = tdata[j].innerHTML.replace(inputContent, "<span class=\"highlight\">" + inputContent + "</span>");
				}
			}
			if (visible) {
				trow[i].style.display = "table-row";
			} else {
				trow[i].style.display = "none";
			}
		}
		console.log(table.innerHTML);
	}
	return table;
}

makeAllTablesFilterable(getAllTables());