window.onload = function() {
	var tables = getAllTables();
	makeAllTableSortable(tables);
	makeAllTableFiltable(tables);
}

//获取所有table
var getAllTables = function() {
	var tables = document.getElementsByTagName("table");
	return tables;
}

//使所有table变成sortable
var makeAllTableSortable = function(tables) {
	for (var i = 0; i < tables.length; i++) {
		makeSortable(tables[i]);
	}
}

//使table变成sortable
var makeSortable = function(table) {
	if (table.getElementsByTagName("th").length != 0) {
		var tableHeads = table.getElementsByTagName("th");
		for (var i = 0; i < tableHeads.length; i++) {
			tableHeads[i].classList.add("tHead");
			tableHeads[i].addEventListener('click', changeStatus);
		}
	} else {
		for (var i = 0; i < table.rows[0].cells.length; i++) {
			table.rows[0].cells[i].classList.add("tHead")
			table.rows[0].cells[i].addEventListener('click', changeStatus);
		}
	}
	return table;
}

//改变表格升降序的状态
var changeStatus = function(event) {
	var headOnclick = event.target;
	getTable(headOnclick).rows[2].classList.remove('alternate');
	if (headOnclick.classList.contains("ascend")) {
		headOnclick.classList.add("descend");
		headOnclick.classList.remove("ascend");
		descend(headOnclick);
	} else if (headOnclick.contains("descend")) {
		headOnclick.classList.add("ascend");
		headOnclick.classList.remove("descend");
		ascend(headOnclick);
	} else {
//			var others = getTable(headOnclick).getElementsByTagName("th");
		var others = getTable(headOnclick).getElementsByClassName("tHead");
		for (var i = 0; i < others.length; i++) {
			others[i].classList.remove("ascend", "descend");
		}
		headOnclick.classList.add("ascend");
		ascend(headOnclick);
	}
	getTable(headOnclick).rows[2].classList.add('alternate');
}

//使表格升序
var ascend = function(head) {
	currntTable = getTable(head);
	var idx = head.cellIndex;
	for (var i = 1; i < currntTable.rows.length-1; i++) {
		for (var j = currntTable.rows.length-1; j >= i; j--) {
			if (currntTable.rows[i].cells[idx].innerHTML > currntTable.rows[j].cells[idx].innerHTML) {
				swap(currntTable.rows[i], currntTable.rows[j]);
			}
		}
	}
}

//使表格降序
var descend = function(head) {
	var currntTable = getTable(head);
	var idx = head.cellIndex;
	for (var i = 1; i < currntTable.rows.length-1; i++) {
		for (var j = currntTable.rows.length-1; j >= i; j--) {
			if (currntTable.rows[i].cells[idx].innerHTML < currntTable.rows[j].cells[idx].innerHTML) {
				swap(currntTable.rows[i], currntTable.rows[j]);
			}
		}
	}
}

//交换row_a和row_b
var swap = function(row_a, row_b) {
	var b = row_a.cloneNode(true);
	var a = row_b.cloneNode(true);
	var table = row_a.parentNode;
	table.replaceChild(a, row_a);
	table.replaceChild(b, row_b);
/*
	for (var i = 0; i < row_a.cells.length; i++) {
		temp = row_a.cells[i].innerHTML;
		row_a.cells[i].innerHTML = row_b.cells[i].innerHTML;
		row_b.cells[i].innerHTML = temp;
	}
*/
}

//使所有table变成filtable
var makeAllTableFiltable = function(tables) {
	for (var i = 0; i < tables.length; i++) {
		makeFiltable(tables[i]);
	}
}

//使table变成filtable
var makeFiltable = function(table) {
	var form = document.createElement('FORM');
	var input = document.createElement('INPUT');
	input.placeholder = "input here";
    input.addEventListener("keyup", Filter);
	table.appendChild(form);
	table.getElementsByTagName('form')[0].appendChild(input);
	return table;
}

//使table回到初始状态
var resetTable = function(table) {
	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].classList.remove('hidden');
		for (var j = 0; j < table.rows[i].cells.length; j++) {
			if (table.rows[i].cells[j].innerHTML.indexOf('<span class="keyword">') !== -1) {
				var otherStrings = table.rows[i].cells[j].innerHTML.split('<span class="keyword">');
				table.rows[i].cells[j].innerHTML = otherStrings.join('');
			}
			if (table.rows[i].cells[j].innerHTML.indexOf('</span>') !== -1) {
				var otherStrings = table.rows[i].cells[j].innerHTML.split('</span>');
				table.rows[i].cells[j].innerHTML = otherStrings.join('');
			}
		}
	}
}

//这个是filter的具体实现
var Filter = function() {
	var keyword = this.value.toString();
	var hasKeyword = false;
	var table = this.parentNode.parentNode;
	resetTable(table);
	if (keyword === '') {
		return;
	}
	for (var i = 1; i < table.rows.length; i++) {
		hasKeyword = false;
		for (var j = 0; j < table.rows[i].cells.length; j++) {
			var content = table.rows[i].cells[j].innerHTML;
			if (content.indexOf(keyword) !== -1) {
				var otherStrings = content.split(keyword);
                table.rows[i].cells[j].innerHTML = otherStrings.join('<span class="keyword">' + keyword + '</span>');
                hasKeyword = true;
			}
		}
		if (hasKeyword == false) {
			table.rows[i].classList.add('hidden');
		} else {
			table.rows[i].classList.remove('hidden');
		}
	}
}

//这个函数用来获取某个th所在的table
var getTable = function(head) {
	var table = head.parentNode.parentNode.parentNode;
	return table;
}