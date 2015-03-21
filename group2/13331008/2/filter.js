// 高亮指定文本并隐藏无关行
function filter(tr, value) {
	var td = tr.cells;
	var flag = false;

	for (var k = 0; k < td.length; k++) {
		if (td[k].innerHTML.search(value) != -1) {
			td[k].innerHTML = td[k].innerHTML.replace(new RegExp(value,"g"), "<span class=\"highlight\">" + value + "</span>");
			flag = true;
		}
	}

	if (!flag) tr.className += " hide"
}

function makeAllTableFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		// 添加输入框
		var input = document.createElement("input");
		tables[i].parentNode.insertBefore(input, tables[i]);

		input.oninput = function(table) {
			return function() {	
				var trs = table.rows;

				for (var j = 0; j < trs.length; j++) {
					if (trs[j].innerHTML.search("th") != -1) continue; // 不对表头进行过滤

					// 清除之前设置的高亮和隐藏属性
					trs[j].innerHTML = trs[j].innerHTML.replace(/<span class=\"highlight\">|<\/span>/g, "");
					trs[j].className = trs[j].className.replace(/ hide/g, "");
					
					if (this.value == "") continue; // 输入框为空时不进行过滤

					filter(trs[j], this.value);
				}
			};
		}(tables[i]);
	}
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

window.onload = function() {
	var tables = getAllTables();
	makeAllTableFilterable(tables);
}