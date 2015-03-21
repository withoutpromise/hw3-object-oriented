// make the tables sortable
function makeAllTablesSortable(tables) {
	var length = tables.length;
	for (var i = 0; i < length; i++) {
		makeTableSortable(tables[i]);
	}
	return tables;

	// make a table sortable
	function makeTableSortable(table) {
		var thds = table.rows[0].cells;
		for (var i = 0; i < thds.length; i++) {
			thds[i].onclick = function (a, b, c) {
				return function () {
					changeClassName(a, b);
					sortTable(a, b, c);
				}
			}(table, thds[i], i);
		}

		// sort table by given the table, thead, and column
		function sortTable(table, thd, index) {
			var tbody = table.getElementsByTagName("tbody")[0];
			var trs = tbody.getElementsByTagName("tr");
			var match = document.getElementsByClassName("match");
			//alert(match.length);

			for (var i = 0; i < trs.length; i++) {
				if (match.length <= 0 || trs[i].className.search("match") >= 0) {
					for (var j = i+1; j < trs.length; j++) {
						if (match.length <= 0 || trs[j].className.search("match") >= 0) {
							if (trs[i].cells[index].innerHTML < trs[j].cells[index].innerHTML) {
								if (match.length > 0) {
									var classname = trs[i].className;
									trs[i].className = trs[j].className;
									trs[j].className = classname;
									//alert(classname);
								}

								var t = trs[i].innerHTML;
								trs[i].innerHTML = trs[j].innerHTML;
								trs[j].innerHTML = t;
							}
						}
					}
				}
			}

			// reverse case
			if (thd.className == "descend") {
				if (match.length <= 0) {
					var l = parseInt(trs.length / 2 + 1);
					for (var i = 0; i < l; i++) {
						var t = trs[i].innerHTML;
						trs[i].innerHTML = trs[trs.length-i-1].innerHTML;
						trs[trs.length-i-1].innerHTML = t;
					}
				} else {
					var i = 0,
						j = trs.length - 1;
					while (i < j) {
						while (i < j && (trs[i].className.search("match") == -1)) i++;
						while (i < j && (trs[j].className.search("match") == -1)) j--;
						if (i < j) {
							var classname = trs[i].className;
							trs[i].className = trs[j].className;
							trs[j].className = classname;

							var t = trs[i].innerHTML;
							trs[i++].innerHTML = trs[j].innerHTML;
							trs[j--].innerHTML = t;
						}
					}
				}
			}
		}

		// change className
		function changeClassName(table, thd) {
			var thds = table.getElementsByTagName("th");
			for (var i = 0; i < thds.length; i++) {
				if (thds[i] != thd)
					thds[i].className = "no_active";
			}
			if (thd.className == "ascend") {
				thd.className = "descend";
			} else {
				thd.className = "ascend";
			}
		}
	}
}
