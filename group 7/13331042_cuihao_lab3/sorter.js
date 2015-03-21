function getAllTables() {
	return document.getElementsByTagName("table");
}



// makeSortable

function makeSortable(tables) {
	for (var p0 = 0; p0 < tables.length; p0++) {
		var ths0 = tables[p0].getElementsByTagName("th");
		for (var q0 = 0; q0 < ths0.length; q0++) {
			// 闭包
			(function(p, q, ths) {
				ths[q].onclick = function() {
					var tbody = tables[p].getElementsByTagName("tbody")[0];
					
					if (hasClass(ths[q], "ascend")) {
						descendSorted(tables[p], q);
						addClass(ths[q], "descend");
					} else {
						ascendSorted(tables[p], q);
						addClass(ths[q], "ascend");
					}
				}
			})(p0, q0, ths0);
		}
	}
	return getAllTables();
} 

// 升降排序（冒泡）
function ascendSorted(table, count) {
	clearAll(table);

	for (var i = 1; i < table.rows.length; i++) {
		for (var j = 1; j < table.rows.length-i; j++) {
			if (!hasClass(table.rows[j], "hidden")) {
				if (table.rows[j].cells[count].innerHTML > table.rows[j+1].cells[count].innerHTML) {
					swap(table.rows[j], table.rows[j+1]);
				}
			}
		}
	}
}

function descendSorted(table, count) {
	clearAll(table);

	for (var i = 1; i < table.rows.length; i++) {
		for (var j = 1; j < table.rows.length-i; j++) {
			if (!hasClass(table.rows[j], "hidden")) {
				if (table.rows[j].cells[count].innerHTML < table.rows[j+1].cells[count].innerHTML) {
					swap(table.rows[j], table.rows[j+1]);
				}
			}
		}
	}
}

// 交换内容
function swap(ele1, ele2) {
	var tem = ele1.innerHTML;
	var tem2 = ele1.className;
	ele1.innerHTML = ele2.innerHTML;
	ele1.className = ele2.className;
	ele2.innerHTML = tem;
	ele2.className = tem2;
}

// 清除当前table所有class
function clearAll(table) {
	var ths = table.getElementsByTagName("th");
	for (var i = 0; i < ths.length; i++) {
		removeClass(ths[i], "descend");
		removeClass(ths[i], "ascend");
	}
}



// makeFilterable

function makeFilterable(tables) {
	for (var i = 0; i < tables.length; i++) makeTableFilterable(tables[i]);
	return getAllTables();
}

function makeTableFilterable(table) {
	// 添加input
	var toAdd = document.createElement('input');
	table.parentNode.insertBefore(toAdd, table);
	toAdd.onkeyup = function() {
		var tbody = table.getElementsByTagName("tbody")[0];
		var trs = tbody.getElementsByTagName("tr");
		clearAll2(trs);
		for (var i = 0; i < trs.length; i++) {
			filtLine(trs[i], this.value);
		}
	}
}

// 清除所有列的“hidden”及<strong>
function clearAll2(ele) {
	for (var i = 0; i < ele.length; i++) {
		removeClass(ele[i], "hidden");
		while (ele[i].innerHTML.indexOf('<strong>') != -1) {
			ele[i].innerHTML = ele[i].innerHTML.replace('<strong>', '').replace('</strong>', '');
			console.log(ele[i].innerHTML);
		}
	}
}

// 对每一行判断是否含有target
function filtLine(ele, val) {
	if (val == "") return;
	tds = ele.getElementsByTagName("td");
	var len = val.length;
	var flag = 0;
	for (var i = 0; i < tds.length; i++) {
		var tem = tds[i].innerHTML;
		var offset = 0;
		// 把所有检索到的target变为<strong>
		while (1) {
			offset = tem.indexOf(val, offset);
			if (offset == -1) break;
			flag = 1;
			var len1 = tem.length;
			tem = tem.substring(0, offset)+"<strong>"+val+"</strong>"+tem.substring(offset+len, len1+1);
			offset += len+17;
		}
		tds[i].innerHTML = tem;
	}
	// 若该行无target 隐藏该行
	if (flag == 0) addClass(ele, "hidden");
}





// 添加、删除、判断是否有class

function addClass(ele, val) {
	if (!hasClass(ele, val))
		ele.className = ele.className+" "+val;
}

function removeClass(ele, val) {
	if (hasClass(ele, val)) {
		var reg = new RegExp('(\\s|^)'+val+'(\\s|$)');
       	ele.className = ele.className.replace(reg, '');
	}
}

function hasClass(ele, val) {
	if (ele.className && ele.className.match(new RegExp('(\\s|^)'+val+'(\\s|$)')))
		return true;
	else
		return false;
}



// 主入口
window.onload = function() {
	var tables = getAllTables();
	makeFilterable(makeSortable(tables));
}

