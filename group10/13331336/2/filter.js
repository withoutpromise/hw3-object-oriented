window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
}

function filterable(tr, value) {
	var td = tr.cells;
	var exist = false;//能否找到相应的value

	for (var k = 0; k < td.length; k++) {
		if (td[k].innerHTML.search(value) != -1) {
			td[k].innerHTML = td[k].innerHTML.replace(new RegExp(value,"g"), "<span class=\"highlight\">" + value + "</span>");
			exist = true;
		}
	}

	//如果找不到，将该行隐藏
	if (!exist) tr.className += " hide"
}

//过滤表格
function makeAllTablesFilterable(tables) {
 		for (var i = 0; i < tables.length; i++) {
		var input = document.createElement("input"); //加入输入框
		tables[i].parentNode.insertBefore(input, tables[i]);

		//使用闭包，避免最后有效的只是最后一个输入框
		input.oninput = function(table) {
			return function() {	
				var trs = table.rows;
				for (var j = 0; j < trs.length; j++) {
					if (trs[j].innerHTML.search("th") == -1) {
						// 如果存在，清除高亮和隐藏属性
						trs[j].innerHTML = trs[j].innerHTML.replace(/<span class=\"highlight\">|<\/span>/g, "");
						trs[j].className = trs[j].className.replace(/ hide/g, "");
						
						if (this.value != "") filterable(trs[j], this.value);//如果输入框中不为空，执行过滤
					}
				}
			};
		}(tables[i]);
	}
 }