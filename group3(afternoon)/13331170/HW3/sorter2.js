window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortableAndFilterable(tables);
}

function getAllTables() {
	var tables = document.getElementsByTagName("table");
	return tables;
};

function makeAllTablesSortableAndFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		// makeSortable(makeFilterable(tables[i]));
		makeFilterable(makeSortable(tables[i])); // 可以实现互相调用哦·~
	}
}

function makeFilterable(table) {
	var inputBox = document.createElement('input');
	document.body.insertBefore(inputBox, table);
	var sortTable = new Array;
	for (var i = 0; i < table.rows.length; i++) {
		sortTable[i] = table.rows[i]; // 存储表格
	}
	inputBox.oninput = function() {
		for (var i = table.rows.length-1; i > 0; i--) {
			table.deleteRow(i);
		};
		for (var i = 1; i < sortTable.length; i++) {
			table.appendChild(sortTable[i]);
		}
		var flag = false;
		for (var i = 1; i < table.rows.length; i++) {
			for (var j = 0; j < table.rows[0].cells.length; j++) {
				table.rows[i].cells[j].innerHTML = table.rows[i].cells[j].textContent;
				var find = table.rows[i].cells[j].textContent.search(inputBox.value);
				if (find != -1) {
					flag = true;
					var message = table.rows[i].cells[j].textContent;
					var message_array = message.split(inputBox.value);
					var newMessage = message_array[0];
					for (var k = 1; k < message_array.length; k++) {
						newMessage += '<span class="highLight">' + inputBox.value + '</span>' + message_array[k];
					}
					table.rows[i].cells[j].innerHTML = newMessage;
				}
			}
			if (flag == false) {
				table.deleteRow(i);
				i--;
			}
			flag = false;
		}
		return table;
	}
	return table;
}

function makeSortable(table) {
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		(function(i){
			table.rows[0].cells[i].onclick = function() {
				mySort(table, i);
			}
		})(i);
	};
	return table;
}

function compare(str1, str2, flag) {
	var isNum = !(isNaN(str1) || isNaN(str2));
	var val1, val2;
	if (isNum == true) {
		val1 = parseFloat(str1);
		val2 = parseFloat(str2);
	} // 对数字进行预处理
	if (flag == "UpSort") {
		if (isNum == true && val1 > val2) {
			return true;
		}
		if (isNum == false && str1 > str2) {
			return true;
		}
	}
	if (flag == "DownSort") {
		if (isNum == true && val1 < val2) {
			return true;
		}
		if (isNum == false && str1 < str2) {
			return true;
		}
	}
	return false; // 对其进行比较
};

function mySort(table, colums_counter) {
	var th = table.rows[0].cells[colums_counter];
	if (th.id != "UpSort") {
		th.id = "UpSort";
	} else {
		th.id = "DownSort";
	} // 设置排序方式
	var rowNum = table.rows.length;
	for (var i = 1; i < rowNum; i++) {
		for (var j = i+1; j < rowNum; j++) {
			if (compare(table.rows[i].cells[colums_counter].textContent, table.rows[j].cells[colums_counter].textContent, th.id)) {
				var temp = table.rows[i].innerHTML;
				table.rows[i].innerHTML = table.rows[j].innerHTML;
				table.rows[j].innerHTML = temp;
			};
		};
	};
	// 冒泡排序
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		table.rows[0].cells[i].className = "NoSort";
	};
	if (th.id == "UpSort") th.className = "UpSort";
	else th.className = "DownSort";
	// css格式修改
	return table;
};
