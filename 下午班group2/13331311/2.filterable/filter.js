window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
	for (var i = tables.length - 1; i >= 0; i--) {
		makeFilterable(tables[i]);
		tables[i].cellPadding = 0;
		tables[i].cellSpacing = 0;
		myEvenRowStyle(tables[i]);
	};
}

function clearStyle(table) {
	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].style.display = 'table-row';
		table.rows[i].className = "";
	};

	var myStrong = table.getElementsByTagName("strong");
	for (var i = 0; i < myStrong.length; i++) {
		var parent = myStrong[i].parentNode;
		var textnode=document.createTextNode(myStrong[i].textContent);
		parent.replaceChild(textnode, myStrong[i]);
	};
}

// 随Filter动态改变行颜色
function myEvenRowStyle(table) {
	var j = 1;
	for (var i = 1; i < table.rows.length; i++) {
		if (table.rows[i].style.display != 'none') {
			if (j % 2 == 0)
				table.rows[i].className = "even";
			j++;
		}
	};
}

function myFontStyle($1) {
	return "<strong>"+$1+"</strong>"
}

function matchAndShowRows(table, myReg) {
	for (var i = 1; i < table.rows.length; i++) {
		var flag = 0;
		for (var j = 0; j < table.rows[i].cells.length; j++) {
			var myText = table.rows[i].cells[j].textContent;
			if (myText.match(myReg) != null) {
				table.rows[i].cells[j].innerHTML = myText.replace(myReg, myFontStyle);
  				flag = 1;
 			}
		}
		if (flag == 0)
			table.rows[i].style.display = 'none';
	}
}

function makeFilterable(table) {
	// 添加输入域
	var text = document.createElement("input");
	document.body.insertBefore(text, table);

	// 定义匹配函数
	text.oninput = function(table) {
		return function() {
			// 恢复默认样式
			clearStyle(table);

			if (text.value != '') {
				// 创建匹配模式,不区分大小写
				var reg = new RegExp(text.value, 'ig');
				matchAndShowRows(table, reg);
			}

			myEvenRowStyle(table);
		};
	}(table);
	
	return table;
}
