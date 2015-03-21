window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterableAndSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesFilterableAndSortable(tables) {
	for (var i = tables.length - 1; i >= 0; i--) {
		makeSortable(makeFilterable(tables[i]));
		// makeFilterable(makeSortable(tables[i]));
		tables[i].cellPadding = 0;
		tables[i].cellSpacing = 0;
		myEvenRowStyle(tables[i]);
	};
}

function clearFontStyle(table) {
	var myStrong = table.getElementsByTagName("strong");
	for (var i = 0; i < myStrong.length; i++) {
		var parent = myStrong[i].parentNode;
		var textnode=document.createTextNode(myStrong[i].textContent);
		parent.replaceChild(textnode, myStrong[i]);
	};
	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].style.display = 'table-row';
	};
}

function clearEvenRowStyle(table) {
	for (var i = 1; i < table.rows.length; i++) {
		table.rows[i].className = "";
	};

}

// 随Filter和sorter动态改变行颜色
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
			clearFontStyle(table);
			clearEvenRowStyle(table);

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

// 时间不多没有完成模块化修改
function makeSortable(table) {
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		table.rows[0].cells[i].onclick = function(table, index, myNode) {
			return function() {
				clearEvenRowStyle(table);

				var myRows = new Array();
				for (var i = 0; i < table.tBodies[0].rows.length; i++) {
					myRows[i] = table.tBodies[0].rows[i];
				};

				if (myNode.className == "") {
					myRows.sort(
						function(a, b) {
							var value1 = a.cells[index].textContent;
	        	            var value2 = b.cells[index].textContent;
	        	            if (isNaN(value1))
	        	           		return value1.localeCompare(value2);
	        	           	else {
	        	           		return value1 - value2;
	        	           	}
						}
					);
	
					var nodes = myNode.parentNode.childNodes;
					for (var i = 0; i < nodes.length; i++)
						nodes[i].className = "";
					myNode.className = "AscendTh";
	
				} else {
	        		myRows.reverse();
	
	        		if (myNode.className == "AscendTh")
	        			myNode.className = "DescendTh";
	        		else
	        			myNode.className = "AscendTh";
	        	}
	
				// 创建文件流并插入到当前表格
				var fragment = document.createDocumentFragment();
	        	for (var i = 0; i < myRows.length; i++)
	        	    fragment.appendChild(myRows[i]);
	        	table.tBodies[0].appendChild(fragment);
	        	
	        	myEvenRowStyle(table);
	        };
		}(table, i, table.rows[0].cells[i]);
	}

	return table;
}