//get All tables in the page
function getAllTables() {
	return tables = document.getElementsByTagName("table");
}

//sort the table by iCol
function SortTable(table, iCol, rows) {
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
function compEle(iCol) {
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

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {

		cols = tables[i].rows[0].cells.length;
		for (var j = 0; j < cols; j++) {
			th = tables[i].rows[0].cells[j];
			createIco(th)
			//listen:sort table when click th
			th.onclick = function() {
				var table = this.parentNode.parentNode.parentNode;
				var iCol = this.cellIndex;
				var datas;
				var rows = table.tBodies[0].rows;

				ChangeThStyle(this);
				datas = SortTable(table, iCol, rows);
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
}
