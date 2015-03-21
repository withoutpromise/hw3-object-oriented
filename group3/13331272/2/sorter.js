
	function onSearch( table) {
		return function () {
		var that = this;
		setTimeout(function() {
		var oTable = table;
		var obj = that;
		var oBody = oTable.tBodies[0];
		var oRows = oBody.rows;
		var oCols = oTable.tHead.rows[0].cells.length;
		var ke = obj.value;
		for (var i = 0; i < oRows.length; i++) {
			var flag = 0;
			for (var j = 0; j < oCols; j++) {
				var text = oRows[i].cells[j].innerText;
				if (text.match(ke)) {
					oRows[i].style.display = '';
					oRows[i].cells[j].innerHTML = oRows[i].cells[j].innerText.replace(ke, "<span>"+ke+"</span>");
					flag = 1;
				}
			}
			if (flag == 0) oRows[i].style.display = 'none';
		}
		}, 200)
	}
}

	function getAllTables() {
		return document.getElementsByTagName("table");
	}

	
	function makeFilterable(tables) {
		for (var i = 0; i < tables.length; i++) {
			var input = document.createElement("input");
			input.type = "text";
			input.placeholder = "Please input keyword.";
			tables[i].parentNode.insertBefore(input,tables[i]);
			input.onkeydown = onSearch( tables[i]);
		}
		return tables;
	}


window.onload = function() {
	var tables = getAllTables();
	makeFilterable(tables);
}
