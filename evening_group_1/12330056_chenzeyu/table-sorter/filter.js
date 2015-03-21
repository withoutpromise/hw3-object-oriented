var getAllTables = function() {
    return document.getElementsByTagName('table');
};

var makeAllTablesFilterable = function(tables) {
	for (var index  = 0; index < tables.length; index++) {
		var inputBar = document.createElement('input');
		document.body.insertBefore(inputBar, tables[index]);
		addEventHandler(tables[index], inputBar);
	}
};

var addEventHandler = function(table, inputBar) {
	inputBar.oninput = function(table) {
		console.log(this);
		console.log("Input: " + this.value);
		var content = this.value;
		console.log(content);
		var inputContent = new RegExp(content, "g");
		var thead = table.getElementsByTagName("th");
		var tbody = table.getElementsByTagName("tbody")[0];
		var trow = tbody.getElementsByTagName("tr");
		var tdata = [];
		for (var i = 0; i < trow.length; i++) {
			tdata[i] = trow[i].getElementsByTagName("td");
			var visible = false;
			for (var j = 0; j < tdata[i].length; j++) {
				tdata[i][j] = tdata[i][j].innerHTML.replace(/<span class=\"highlight\">|<\/span>/g, "");
				if (inputContent.test(tdata[i][j].innerHTML)) {
					visible = true;
					tdata[i][j].innerHTML = tdata[i][j].innerHTML.replace(inputContent, "<span class = 'highlight'>" + textInputted + "</span>");
				}
			}
			if (visible) {
				trow[i].style.display = "table-row";
			} else {
				trow[i].style.display = "none";
			}
		}
	};
};

makeAllTablesFilterable(getAllTables());