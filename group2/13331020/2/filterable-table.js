window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
	for (var index = 0; index < tables.length; index++) {

		//在table之前附加文本域
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		tables[index].parentNode.insertBefore(input, tables[index]);

		makeEachTableFilterable(tables[index]);
	}
}

function makeEachTableFilterable(table) {
	//文本域中的值发生改变时
	table.previousSibling.onchange = function() {

		//先把所有的格式清除
		cleanFormat(table);

		//获取文本域中的值，将table的每一行中的td的html内容做查找
		var str = table.previousSibling.value;

		//i从1开始是跳过了th行
		for (var i = 1; i < table.rows.length; i++) {
			var check = false;
			var td = table.rows[i].getElementsByTagName("td");
			for (var j = 0; j < td.length; j++) {
				var td_text = td[j].innerHTML;

				//找到所要的子字符串
				if (td_text.indexOf(str) >= 0) {

					//添加class来改变样式，凸显文字
					td[j].innerHTML = td[j].innerHTML.replace(str, "<span class=\"highlighted\">" + str + "</span>");
					check = true;
				}
			}

			//若没有找到则删除该行，并将行数减少1
			if (!check) {
				table.deleteRow(i);
				i--;
			}
		}

		//偶数行的背景样式
		evenRows(table);
	}
}

//清除格式
function cleanFormat(table) {
	var span = table.getElementsByTagName("span");
	for (var i = 0; i < span.length; i++) {
		span[i].className = "none";
	}

	var tr = table.getElementsByTagName("tr");
	for (var index = 1; index < tr.length; index++) {
		if (index%2 == 0) tr[index].className = "none"
	}
}

//偶数行改变背景色
function evenRows(table) {
	var tr = table.getElementsByTagName("tr");
	for (var index = 1; index < tr.length; index++) {
		if (index%2 == 0) tr[index].className = "alternate"
	}
}