window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (var i=0; i < tables.length; i++) {
		//对第i个表格排序。
		makeSortable(tables[i]);
	}
}
function makeAllTablesFilterable(tables) {
	//添加输入框
	for (var i = 0; i < tables.length; i++) {
		var enter = document.createElement("p");
		tables[i].parentNode.insertBefore(enter, tables[i]);
		enter.innerHTML = '<input type="text" class="text" /><button class="b1">Click Me!</button>';
	}
	//为每个button添加click事件
	var input = document.getElementsByClassName("b1");
	for (var i = 0; i < input.length; i++) {
		input[i].onclick = function(index1) {
			return function() {
				key = document.getElementsByClassName("text")[index1].value;
				makeFilterable(tables[index1]);
			}
		}(i);
	}
}

//Filter接口
function makeFilterable(Itable) {
	var tRow = Itable.tBodies[0].rows;
	var flag = true;
	var l = tRow.length;
	for (var i = 0; i < l; i++) {
		flag = false;
		for (var j = 0; j < tRow[i].cells.length; j++) {
			//如果该行有就将flag设为true
			if (tRow[i].cells[j].innerHTML.search(key) !== -1) {
				flag = true;
				//将与key匹配的字符串全部变为红色
				tRow[i].cells[j].innerHTML = tRow[i].cells[j].innerHTML.replace(new RegExp(key,"g"), "<span>" + key + "</span>");
			}
		}
		if (flag === false) {
			//隐藏无key行
			tRow[i].style.display= "none";
		}
	}
	return Itable;
}

//sort接口
function makeSortable(Itable) {
	var ItableHead = Itable.getElementsByTagName("th");
	var ItableCol = ItableHead.length;
	var ItableBody = Itable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	var ItableRow = ItableBody.length;
	for (var j = 0; j < ItableCol; j++) {
		ItableHead[j].onclick = function(index) {
			return function() {
				//清除该表格其它列的排序属性，因为一个表格只会按一种方式排序。
				for (var j1 = 0; j1 < ItableCol; j1++) {
					if (j1 === index) {
						continue;
					}
					if (ItableHead[j1].className.search(/ascend/) !== -1) {
						ItableHead[j1].className = ItableHead[j1].className.substring(0, ItableHead[j1].className.length-7);
					} else if (ItableHead[j1].className.search(/descend/) !== -1) {
						ItableHead[j1].className = ItableHead[j1].className.substring(0, ItableHead[j1].className.length-8);
					}
				}
				//ascended为true表示已经升序排列，通过添加类选择器来修改排序界面。
				var ascended = false;
				if (ItableHead[index].className.search(/ascend/) !== -1) {
					ascended = true;
				}
				if (ascended) {
					ItableHead[index].className = ItableHead[index].className.substring(0, ItableHead[index].className.length-7);
					ItableHead[index].className += " descend";
				} else {
					if (ItableHead[index].className.search(/descend/) !== -1) {
						ItableHead[index].className = ItableHead[index].className.substring(0, ItableHead[index].className.length-8);
					}
					ItableHead[index].className += " ascend";
				}
				//对表格体排序。
				SortTable(ItableBody, index, ascended);
			}
		}(j);
	}
	return Itable;
}

function SortTable(Table, Index, ascended) {
	for (var i1 = 0; i1 < Table.length-1; i1++) {
		var min = i1;
		for (var i2 = i1+1; i2 < Table.length; i2++) {
			//ascended为true,降序排列，否则升序排列。
			if (ascended) {
				if (Table[min].getElementsByTagName("td")[Index].innerHTML < Table[i2].getElementsByTagName("td")[Index].innerHTML) {
					min = i2;
				}
			} else {
				if (Table[min].getElementsByTagName("td")[Index].innerHTML > Table[i2].getElementsByTagName("td")[Index].innerHTML) {
					min = i2;
				}
			}
		}
		if (min !== i1) {
			var temp = Table[i1].innerHTML;
			Table[i1].innerHTML = Table[min].innerHTML;
			Table[min].innerHTML = temp;
		}
	}
}
