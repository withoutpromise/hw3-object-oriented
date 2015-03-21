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


// **************************** sort ******************************

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		sortCertainTable(tables[i]);
	}
}

function sortCertainTable(table) {
	var thRows = table.tHead.rows[0].cells;               //获取出当前被排序的表格的标题行
	for (var i = 0; i < thRows.length; i++) {
		thRows[i].index = i;                              //给标题行的每一列标记上索引
		thRows[i].onclick = function() {
			var checked = false;                          //布尔变量checked记录当前点击的单元格是否已升序
			if (this.className == "ascend") {
				checked = true;
			}
			for (var i = 0; i < thRows.length; i++) {
				thRows[i].className = "";                 //把所有单元格的className赋为空，实现从高亮变回原状态
			}
			if (checked) {
				this.className = "descend";               //若之前状态是升序，则点击的单元格降序高亮，否则升序高亮
			} else {
				this.className = "ascend";
			}
			SortTheTable(table, this.index);              //传入当前排序的表格以及被点击的列的索引
		}
	}
}

function SortTheTable(table, iCol) {
	var aTrs = new Array;
	var oTbody = table.tBodies[0];
	var colRows = oTbody.rows;

	for (var i = 0; i < colRows.length; i++) {
		aTrs[i] = colRows[i];
	}                                    //将表格的每一行放入备用数组

	if (table.sortCol == iCol) {         //判断上一次排序的列是否和现在需要排序的列是同一个
		aTrs.reverse();                  //如果是同一列，直接将表格转置
	} else {
		aTrs.sort(compareEle(iCol));     //如果不是同一列，使用sort方法，传进排序函数，对表格的每一行进行排序
	}

	var oFragment = document.createDocumentFragment();

	for (var i = 0; i < aTrs.length; i++) {
		if (i % 2 != 0) {                         //将新表格的奇数行的className赋为空，偶数行的className赋为背景为灰色的“alternate”
			aTrs[i].className = "alternate";
		} else {
			aTrs[i].className = "";
		}
		oFragment.appendChild(aTrs[i]);
	}
	oTbody.appendChild(oFragment);     //将aTrs排序完毕以后，重新生成表格

	table.sortCol = iCol;              //记录最后一次排序的索引
}

function compareEle(iCol) {
	return function(oTR1, oTR2) {                   //当前要比较的两行是oTR1和oTR2
		var v1 = oTR1.cells[iCol].textContent;      //取出这两行所点击的列的文本，进行比较
		var v2 = oTR2.cells[iCol].textContent;
		if (v1 < v2) {
			return -1;
		} else if (v1 > v2) {
			return 1;
		} else {
			return 0;
		}
	};
}
