window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

//获取文档中所有table
function getAllTables() {
	return document.getElementsByTagName("table");
}

//为所有的th标签绑定click事件
function makeAllTablesSortable(tables) {
	for (var i = 0 ; i < tables.length ; i++) {
		var ths = tables[i].getElementsByTagName("th");
		for (var j = 0 ; j < ths.length ; j++) {
			ths[j].onclick = function() {
				sort(this);
			}
		}
	}
}

//sort函数：主要起判断调用升序还是降序函数的作用
function sort(curTh) {
	var preTh = getPreTh(curTh);
	if (preTh == null) {
		curTh.className = "des";
	} else {
		if (preTh.isSameNode(curTh)) {
			curTh.className = preTh.className == "asc" ? "des" : "asc";
		} else {
			preTh.className = "";
			curTh.className = "des";
		}
	}
	if (curTh.className == "asc") {
		ascSort(curTh);
	} else {
		desSort(curTh);
	}
	setRowsColor(curTh);
}

//升序函数
function ascSort(curTh) {
	curTable = curTh.parentNode.parentNode.parentNode;
	trows = curTable.getElementsByTagName("tr");
	var col = getCol(curTh, curTable);
	for (var i = 2 ; i < trows.length ; i++) {
		for (var j = 1 ; j < i ; j++) {
			var iCol = trows[i].getElementsByTagName("td")[col].innerHTML.toLowerCase();
			var jCol = trows[j].getElementsByTagName("td")[col].innerHTML.toLowerCase();
			if (compare(iCol, jCol) == -1) {
				var temp1 = trows[i].cloneNode(true);
				var temp2 = trows[j].cloneNode(true);
				var rowParent = trows[i].parentNode;
				rowParent.replaceChild(temp2, trows[i]);
				rowParent.replaceChild(temp1, trows[j]);
			}
		}
	}
}

//降序函数
function desSort(curTh) {
	curTable = curTh.parentNode.parentNode.parentNode;
	trows = curTable.getElementsByTagName("tr");
	var col = getCol(curTh, curTable);
	for (var i = 2 ; i < trows.length ; i++) {
		for (var j = 1 ; j < i ; j++) {
			var iCol = trows[i].getElementsByTagName("td")[col].innerHTML.toLowerCase();
			var jCol = trows[j].getElementsByTagName("td")[col].innerHTML.toLowerCase();
			if (compare(iCol, jCol) == 1) {
				var temp1 = trows[i].cloneNode(true);
				var temp2 = trows[j].cloneNode(true);
				var rowParent = trows[i].parentNode;
				rowParent.replaceChild(temp2, trows[i]);
				rowParent.replaceChild(temp1, trows[j]);
			}
		}
	}
}

//获取curTh所在列数
function getCol(curTh, curTable) {
	var ths = curTable.getElementsByTagName("th");
	for (var j = 0 ; j < ths.length ; j++) {
		if (curTh == ths[j])
		return j;
	}
}

//判断td1是否大于td2，是返回1，否返回-1，相等返回0
function compare(td1, td2) {
	var minlength = td1.length < td2.length ? td1.length : td2.length;
	for (var i = 0 ; i < minlength ; i++) {
		//英文数字正则
		var reg = /^[A-Za-z0-9]*$/;
		var regChinese = /^[\u4e00-\u9fa5]*$/;
		//如果两个都是中文字符
      	if(!reg.test(td1[i]) && !reg.test(td2[i]) && regChinese.test(td1[i]) && regChinese.test(td2[i])){
			if (td1[i].localeCompare(td2[i]) != 0)
       			return td1[i].localeCompare(td2[i]);
      	} else { //其他情况
			if (td1[i] < td2[i])
				return -1;
			else if (td1[i] > td2[i])
				return 1;
      	}
	}
	if (td1.length < td2.length)
		return -1;
	else if (td1.length > td2.length)
		return 1;
	else
		return 0;
}

//设置表格的行交替颜色
function setRowsColor(curTh) {
	curTable = curTh.parentNode.parentNode.parentNode;
	trows = curTable.getElementsByTagName("tr");
	trows[0].className="thead";
	for (var i = 1 ; i < trows.length ; i++) {
		trows[i].class = "";
		if (i % 2 == 0) {
			trows[i].className="evenRow";
		} else {
			trows[i].className="oddRow";
		}
	}
}

//返回同个table中上一次选中的th
function getPreTh(curTh) {
	ths = curTh.parentNode.getElementsByTagName("th");
	for (var i = 0 ; i < ths.length ; i++) {
		if (ths[i].className == "des" || ths[i].className == "asc")
			return ths[i];
	}
	return null;
}