//---------------------sorter部分-----------------------------
// 改变表头
function changeHead(thBefore, thNow, table) {
	if (thNow.clickFlag == 0) { // 判断用升序还是降序表头
		if (table.col != -1) { //判断是不是在同一个table中点击
			thBefore.className = thBefore.className.replace(" changed1", "");
			thBefore.className = thBefore.className.replace(" changed2", "");
			thBefore.clickFlag = 0; // 去除table中已有表头并将该table中之前被点击列的clickFlag置零
		}
		thNow.className += " changed1";
	} else {
		thNow.className = thNow.className.replace(" changed1", " changed2");
	}
}

// 排序
function sort(trs, column, flag) {
	for (var x = 1; x < trs.length - 1; x++) {
		var temp;

		for (var y = x + 1; y < trs.length; y++) {
			if ((flag != 0 && trs[x].cells[column].innerHTML > trs[y].cells[column].innerHTML)
				|| (flag == 0 && trs[x].cells[column].innerHTML < trs[y].cells[column].innerHTML)) {
				temp = trs[x].innerHTML;
				trs[x].innerHTML = trs[y].innerHTML;
				trs[y].innerHTML = temp;
			}
		}
	}
}

function makeSortable(table) {
	var ths = table.rows[0].cells;
	table.col = -1; // 用于在table中记录被点击的th，没有则为-1

	for (var j = 0; j < ths.length; j++) {
		ths[j].clickFlag = 0; // 用于判断点击后是升序还是降序排序

		ths[j].onclick = function(table, j) {
			return function() {
				changeHead(table.rows[0].cells[table.col], this, table);

				this.clickFlag = 1 - this.clickFlag;
				table.col = j;

				sort(table.rows, j, this.clickFlag);
			};
		}(table, j);
	}

	return table;
}

//---------------------filter部分-----------------------------

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

function makeFilterable(table) {
		// 添加输入框
	var input = document.createElement("input");
	table.parentNode.insertBefore(input, table);

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
	}(table);
	return table;
}

//---------------------公用部分-----------------------------

function getAllTables() {
	return document.getElementsByTagName("table");
}

window.onload = function() {
	var tables = getAllTables();
	for (var i = 0; i < tables.length; i++) {
		makeSortable(makeFilterable(tables[i]));
	}
}