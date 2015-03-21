;var makeSortable = (function(d) {
	"use strict";

	//sort the table by iCol

	var iCol;
	
	function SortTable(table, rows) {
		var datas = new Array;
		for (var i = 0; i < rows.length; i++) {
			datas[i] = rows[i];
		}
		if (table.sortCol == iCol) {
			datas.reverse();
		} else {
		 	datas.sort(compEle(iCol));
		}
		return datas;
	}

	//compare two element
	function compEle() {
		 return function(a, b) {
		 	return a.cells[iCol].innerHTML > b.cells[iCol].innerHTML;
		 }
	}

	//show the sorted table
	function ShowNewTable(table, newRows) {
		var oldRows = table.tBodies[0].rows;
		var len = oldRows.length;
		for (var i = 0; i < len; i++) {
			table.tBodies[0].removeChild(oldRows[0]);
		}
		for (var i = 0; i < newRows.length; i++) {
			table.tBodies[0].appendChild(newRows[i]);
		}
	}

	//change the th stley.
	function ChangeThStyle(th) {
		if (th.lastChild.className == "ascend-icon")
			th.lastChild.className = "descend-icon";
		else
			th.lastChild.className = "ascend-icon"; 
	}

	function createIco(th) {
		var para = document.createElement("span");
		th.appendChild(para);
	}

	function makeTableSortable(table) {
		var cols = table.rows[0].cells.length;
		for (var j = 0; j < cols; j++) {
			var th = table.rows[0].cells[j];
			createIco(th)
			//listen:sort table when click th
			th.onclick = function() {
				var table = this.parentNode.parentNode.parentNode;
				var datas;
				var rows = table.tBodies[0].rows;
				iCol = this.cellIndex;

				ChangeThStyle(this);
				datas = SortTable(table, rows);
				ShowNewTable(table, datas);
				table.sortCol = iCol;
			};	
			//init table style
			th.className = "th_style"
			th.onmouseover = function() {
				this.childNodes[1].className = "ascend-icon";
			};
		}
	}
	return function(table) {
		makeTableSortable(table);
		return table;
	}
}(document));