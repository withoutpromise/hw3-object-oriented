window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
	makeAllTablesSortable(tables);
}

function getAllTables() {
	var tables = document.getElementsByTagName('table');
	return tables;
}

// **************************** filter ******************************

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var oTxt = document.createElement('input');
		document.body.insertBefore(oTxt, tables[i]);
		filterTheTable(tables[i], oTxt);
	}
}

function filterTheTable(table, oTxt) {
	var oTbody = table.tBodies[0];
	var colRows = oTbody.rows;

	var temp_table = new Array;
	for (var i = 0; i < colRows.length; i++) {
		temp_table[i] = colRows[i];                       //将原始表格放入备用表格
	}

	oTxt.oninput = function() {
		for (var i = oTbody.childNodes.length - 1; i >= 0 ; i--) {
			oTbody.removeChild(oTbody.childNodes[i]);
		}
		for (var i = 0; i < temp_table.length; i++) {
			oTbody.appendChild(temp_table[i]);             //通过备用表格，将表格还原为原始表格
		}

		var aTrs = new Array;
		for(var i = 0; i < colRows.length; i++) {
			var checked = false;
			for(var j = 0; j < colRows[i].cells.length; j++) {
				var index = colRows[i].cells[j].textContent.search(oTxt.value);
				if (index != -1) {                        //search方法返回搜索字段的下标，若不等于-1表示能搜索到
					if (!checked) {                       //布尔变量checked记录此行是否已被加入新表格
						aTrs.push(colRows[i]);
						checked = true;
					}
					var str = colRows[i].cells[j].textContent;
					var substr1 = str.substring(0,index);
					var substr2 = oTxt.value;
					var substr3 = str.substring(index + substr2.length);
					colRows[i].cells[j].innerHTML = substr1 + '<span class="active">' + substr2 + "</span>" + substr3;
					//在搜索字段的两端加入span标签，实现高亮
				}
			}
		}

		var new_table = document.createDocumentFragment();

		for (var i = 0; i < aTrs.length; i++) {
			new_table.appendChild(aTrs[i]);
		}

		for (var i = oTbody.childNodes.length - 1; i >= 0 ; i--) {
			oTbody.removeChild(oTbody.childNodes[i]);      //将旧表格置换成新表格
		}
		oTbody.appendChild(new_table);
	}
}
