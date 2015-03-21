function getAllTables() {
	return document.getElementsByTagName("table");
}
function getTableNum(table) {
	var tables = getAllTables();
	for (var i = 0; i < tables.length; i++) {
		if (tables[i] == table) return i;
	}
}


//先把table中的所有行复制
function getDataOfTable(table) {
	var dataArray = new Array();
	for (var i = 1; i < table.rows.length; i++) {
		dataArray.push(table.rows[i]);
	}
	return dataArray;
}


function makeFilterable(table) {
	var tabledata = getDataOfTable(table);

	//创建filter所需要输入框
	function addFilterInput(table) {
		var input = document.createElement('input');
		var parentNode = table.parentNode;
		var num = getTableNum(table);
		input.id = "table-filter-"+num;
		parentNode.insertBefore(input, table);
		return document.getElementById(input.id);
	}

	//删除table的所有行
	function empty_table() {
		var tablebody = table.getElementsByTagName('tbody')[0];
		var trs = table.getElementsByTagName('tr');
		var tempTr = [].slice.call(trs);
		var len = tempTr.length;
		for (var i = 1; i < len; i++) {
			tablebody.removeChild(tempTr[i]);
		}
	}

	//联合show_color使特定的字体可以突出
	function word_change(keyword, td) {
		var text = td.innerHTML;
		var newText = text.replace(keyword, ('<span>' + keyword + '</span>'));
		td.innerHTML = newText;
	}

	function show_color(table) {
		var all_keywords = table.getElementsByTagName('span');
		for (var i = 0; i < all_keywords.length; i++) {
			all_keywords[i].style.backgroundColor = "yellow";
		}
	}

	function filter_event() {
		var num = parseInt(this.id.replace("table-filter-", ""));
		var table = getAllTables()[num];
		var keyword = this.value;
		var matchRows = {};
		var matchTrs = [];
		for (var i = 0; i < tabledata.length; i++) {
			//在table原来的数据里进行判断操作
			var tempTr = tabledata[i].cloneNode(true);
			var allTd = tempTr.getElementsByTagName('td');
			for (var j = 0; j < allTd.length; j++) {
				if (allTd[j].innerHTML.indexOf(keyword) > -1) {
					word_change(keyword, allTd[j]);
					if (matchRows[i] == undefined) {
						matchRows[i] = tempTr;
					}
				}
			}
		}
		empty_table();
		var tablebody = table.getElementsByTagName('tbody')[0];
		for (var col in matchRows) {
			tablebody.appendChild(matchRows[col]);
		}
		show_color(table);
	}
	function init() {
		var input = addFilterInput(table);
		input.addEventListener('keyup', filter_event, false);
	}
	init();
	return table;
}

function makeAllTablesFilterable(tables) {
	var len = tables.length;
	for (var i = 0; i < len; i++) {
		makeFilterable(tables[i]);
	}
}
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}
/*test
var tables = getAllTables();
makeAllTablesFilterable(tables);
*/