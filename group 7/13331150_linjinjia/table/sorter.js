
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++)
		makeTableSortable(tables[i]);
}

function makeTableSortable(table) {
	var head = table.tHead.rows[0].cells;
	//注册点击事件
	for (var i = 0; i < head.length; i++)
		head[i].onclick = function(event) {
			var target = event.target || event.srcElement;
			tableSort(table, target.cellIndex);
		}
}

function tableSort(table, index) {

	//新建一个数组存储待排序table的各行
	var tableItem = new Array();
	for (var i = 0; i < table.tBodies[0].rows.length; i++)
		tableItem[i] = table.tBodies[0].rows[i];

	//新建一个数组存储待排序table的各标题
	var tableHead = table.tHead.rows[0].cells;
	for (var i = 0; i < tableHead.length; i++)
		tableHead[i].className = "";

	//判断是否多次按同一个标题进行排序
	if (table.sortedIndex == index) {
		tableItem.reverse();		//直接把排序好的table翻转
		//对升序降序的三角进行处理
		if (table.Ascend) {
			table.Ascend = false;
			tableHead[index].className = "descend";
		} else {
			table.Ascend = true;
			tableHead[index].className = "ascend";
		}
	} else {
		//排序并记录当前排的哪一列
		tableItem.sort(cmp(index));
		table.sortedIndex = index;
		//改为升序
		tableHead[index].className = "ascend";
		table.Ascend = true;
	}


	for (var i = 0; i < tableItem.length; i++) {
		//设置偶数行的底色为灰色
		if (i % 2)
			tableItem[i].className = "alternate";
		else
			tableItem[i].className = "";
		table.tBodies[0].appendChild(tableItem[i]);
	}
}

function cmp(index) {
	return function(row1, row2) {
		var a = row1.cells[index].textContent;
		var b = row2.cells[index].textContent;
		return a > b;
	}
}

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var table = document.getElementById(tables[i].id);
		var form = document.createElement("form");
		form.name = "input";

		var input = document.createElement("input");
		input.type = "text";
		input.name = "search";
		form.appendChild(input);

		var button = document.createElement("button");
		button.type = "button";
		button.innerHTML = "submit";
		button.onclick = function() {
			var str = this.parentNode.search.value;
			var table = document.getElementById(this.parentNode.parentNode.id);
			var tableItem = new Array();
			for (var i = 0; i < table.tBodies[0].rows.length; i++)
				for (var j = 0; j < table.tBodies[0].rows[i].cells.length; j++)
					if (table.tBodies[0].rows[i].cells[j].textContent.indexOf(str) >= 0) {
						tableItem.push(table.tBodies[0].rows[i]);
						break;
					}
			
			var rowNum = table.tBodies[0].rows.length;
			for (i = 0; i < rowNum; i++) {
				table.deleteRow(i + 1);
				rowNum--;
				i--;
			}

			for (var i = 0; i < tableItem.length; i++) {
				if (i % 2)
					tableItem[i].className = "alternate";
				else
					tableItem[i].className = "";
				table.tBodies[0].appendChild(tableItem[i]);	
			}
		}
		form.appendChild(button);

		table.appendChild(form);

	}
}