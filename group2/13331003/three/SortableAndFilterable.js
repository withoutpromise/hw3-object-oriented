window.onload = function() {
	var table = getAllTable();
	for (var index = 0; index < table.length; index++) {
		makeFilterable(makeSortable(table[index]));
	}
}

function getAllTable() {
	return document.getElementsByTagName("table");
}


function  makeSortable(table) {
	var th = table.tHead.rows[0].cells;
	for (var i = 0; i < th.length; i++) {
		th[i].index = i;
		th[i].onclick = function() {
			var checked = false;
			//判断表格是否已经升序排序
			if (this.className == "ascend") {
				checked = true;
			} 
			for (var j = 0; j < th.length; j++) {
				th[j].className = "";       
			}
			if (checked) {
				this.className = "descend";
			} else {
				this.className = "ascend";
			}
			SortIt(table, this.index);
		}
	}
	return table;
}

function SortIt(table, th) {
	var tableBody = table.tBodies[0];
	var table_rows = tableBody.rows;
	var rows = [];

	//复制表格的每一行
	for(var i = 0; i < table_rows.length; i++) {
		rows[i] = table_rows[i];
	}

	if (th == table.sortCol) {
		//如果已经排序好，则倒序排序
		rows.reverse();
	} else {
		rows.sort(SortFunction(th));
	}

	var thFragment = document.createDocumentFragment();

	for (var i = 0; i < rows.length; i++) {
		if (i % 2 != 0) {
			//偶数行灰色
			rows[i].className = "alternate";        
		} else {
			rows[i].className = "";
		}
		thFragment.appendChild(rows[i]);
	}
	tableBody.appendChild(thFragment);  

	table.sortCol = th;
}

//每一项的比较
function SortFunction(th) {
	return function(row1, row2) {
		var r1 = row1.cells[th].textContent;
		var r2 = row2.cells[th].textContent;
		if (r1 < r2) {
			return -1;
		} else if (r1 > r2) {
			return 1;
		} else {
			return 0;
		}
	}
}


function makeFilterable(table) {
	//在表格之前加上文本域
	var textArea = document.createElement("input");
	textArea.setAttribute("type", "text");
	table.parentNode.insertBefore(textArea, table);

	//文本域的值发生改变时
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
	return table;
}
