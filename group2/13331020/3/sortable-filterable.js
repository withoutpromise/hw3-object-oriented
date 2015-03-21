//排序函数，接受的参数和返回值都是table-DOM
function  makeSortable(table) {

	//记录点击次数来判定是升序还是降序
	var count = 0;
	var ths = table.getElementsByTagName("th");
	table.onclick = function() {
		var events = window.event.target;
		var row;

		//当th标签被点击时，找出所被点击的那一列
		if (events.tagName == "TH") {
			for (var i = 0; i < ths.length; i++) {
				if (ths[i] == events) {
					ths[i].style.backgroundColor = "rgb(164, 176, 252)";
					row = i;
				} else {
					ths[i].style.backgroundColor = "rgb(3, 27, 125)";
				}
			}

			//将table中的所有td标签中的内容转化为二维数组
			var tds = [];
			for (var i = 1; i < table.rows.length; i ++) {
				var TD = table.rows[i].getElementsByTagName("td");
				var td = [];
				for (var j = 0; j < TD.length; j++) {
					td.push(TD[j].innerHTML);
				}
				tds.push(td);
			}

			//对二维数组进行排序
			if (count%2 == 0) {
				tds.sort(function(x, y) {return x[row].localeCompare(y[row]);});
				ths[row].style.backgroundImage = "url('ascend.png')";
			} else {
				tds.sort(function(x, y) {return y[row].localeCompare(x[row]);});
				ths[row].style.backgroundImage = "url('descend.png')";
			}
			count++;

			//修改原table中的数据
			var new_tds = table.getElementsByTagName("td");
			var k = 0;
			for (var i = 0; i < tds.length; i ++) {
				for (var j = 0; j < tds[i].length; j++) {
					new_tds[k].innerHTML = tds[i][j];
					k++;
				}
			}
		}		
	}
	//返回sortable的table
	return table;
}


//过滤函数，参数和返回值也都是table-DOM
function makeFilterable(table) {

	//清除样式
	cleanFormat(table);

	//添加输入框
	var input = document.createElement("input");
	input.setAttribute("type", "text");
	table.parentNode.insertBefore(input, table);

	//文本框中的值改变时触发过滤
	table.previousSibling.onchange = function() {
		var str = table.previousSibling.value;

		//找到table的行中有相应值的行，高亮该值
		for (var i = 1; i < table.rows.length; i++) {
			var check = false;
			var td = table.rows[i].getElementsByTagName("td");
			for (var j = 0; j < td.length; j++) {
				var td_text = td[j].innerHTML;
				if (td_text.indexOf(str) >= 0) {
					td[j].innerHTML = td[j].innerHTML.replace(str, "<span class=\"highlighted\">" + str + "</span>");
					check = true;
				}
			}

			//删除没有所判定值的行
			if (!check) {
				table.deleteRow(i);
				i--;
			}
		}
	}
	//返回filterable的table
	return table;
}

//清除样式
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


window.onload = function() {
	//一次性获取所有表格元素
	var table = document.getElementsByTagName("table");

	//对每一个table进行改造
	for (var tab = 0; tab < table.length; tab++) {
		makeFilterable(makeSortable(table[tab]));
	}
}
