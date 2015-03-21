// make the tables sortable
function makeAllTablesSortable(tables) {
	var length = tables.length;
	for (var i = 0; i < length; i++) {
		makeTableSortable(tables[i]);
	}
	return tables;

	// make a table sortable
	function makeTableSortable(table) {
		var theads = table.rows[0].cells;
		for (var i = 0; i < theads.length; i++) {
			theads[i].onclick = function (a, b, c) {
				return function () {
					changeClassName(a, b);
					sortTable(a, b, c);
				}
			}(table, theads[i], i);
		}

		// sort table by given the table, thead, and column
		function sortTable(table, obj, index) {
			var rows = table.rows;
			for (var i = 1; i < rows.length - 1; i++) {
				for (var j = i+1; j < rows.length; j++) {
					if (rows[i].cells[index].innerHTML < rows[j].cells[index].innerHTML) {
						var t = rows[i].innerHTML;
						rows[i].innerHTML = rows[j].innerHTML;
						rows[j].innerHTML = t;
					}
				}
			}

			// reverse case
			if (obj.className == "descend") {
				var l = parseInt(rows.length / 2 + 1);
				for (var i = 1; i < l; i++) {
					var t = rows[i].innerHTML;
					rows[i].innerHTML = rows[rows.length - i].innerHTML;
					rows[rows.length - i].innerHTML = t;
				}
			}
		}

		// change className
		function changeClassName(table, obj) {
			var ths = table.getElementsByTagName("th");
			for (var i = 0; i < ths.length; i++) {
				if (ths[i] != obj)
					ths[i].className = "no_active";
			}
			if (obj.className == "ascend") {
				obj.className = "descend";
			} else {
				obj.className = "ascend";
			}
		}
	}
}
