window.onload = function() {
	var tables = GetTables();
	//编辑tables
	makeSortable(makeFilterable(tables));
}

function GetTables() {
	return document.getElementsByTagName("table");
}

function makeSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		//设置sorter
		SetSorter(tables[i]);
		//设置颜色
		SetColor(tables[i]);
	}
	return tables;
}

function SetColor(oTable) {
	var visual_num = 0;
	var Tbody = oTable.getElementsByTagName("tbody")[0];
	var row = Tbody.getElementsByTagName("tr");
	//偶数行设置灰色, 保证筛选后也是偶数行灰色
	for (var i = 0; i < row.length; i++) {
		if (row[i].style.display != 'none')
			visual_num++;
		if (visual_num % 2 == 0) {
			row[i].style.backgroundColor = "#DDDDDD";
		} else {
			row[i].style.backgroundColor = "white";
		}
	}
}

function ChangeSorter(oTable, col) {
	var head = oTable.getElementsByTagName("th");
	//判断所点击的head的点击次数
	//共3种状态
	if (head[col].ClickTime == 0) {
		head[col].ClickTime = 1;
		//将未被选中的head恢复初始状态（即原始颜色和点击次数置零）
		for (var i = 0; i < head.length; i++) {
			if (i != col) {
				head[i].style.background = "#0000AA";
				head[i].ClickTime = 0;
			}
		}
		//升序
		head[col].style.background = "#77FFCC url(ascend.png) no-repeat right";
	} else if (head[col].ClickTime == 1) {
		head[col].ClickTime = 2;
		//降序
		head[col].style.background = "#77FFCC url(descend.png) no-repeat right";
	} else if (head[col].ClickTime == 2) {
		head[col].ClickTime = 1;
		//升序
		head[col].style.background = "#77FFCC url(ascend.png) no-repeat right";
	}
}

//cmp方法
function up(a, b) {
	return a > b;
}
function down(a, b) {
	return a < b;
}
//冒泡算法排序
function Sorting(row, col, cmp) {
	//装比较项目的数组
	var items = new Array();
	var AllRow;
	for (var i = 0; i < row.length; i++) {
		//获得整行内容
		AllRow = row[i].getElementsByTagName("td");
		items.push(AllRow[col].innerHTML);
	}
	for (var i = items.length - 1; i > 0; i--) {
		for (var j = 0; j < i; j++) {
			//边冒泡边改变内容
			var a = items[j].replace(/<span class=\"emphasize\">|<\/span>/g, "");
			var b = items[j+1].replace(/<span class=\"emphasize\">|<\/span>/g, "");
			if (cmp(a, b)) {
				var temp = items[j];
				items[j] = items[j+1];
				items[j+1] = temp;
				var display = row[j].style.display;
				row[j].style.display = row[j+1].style.display;
				row[j+1].style.display = display;
				temp = row[j].innerHTML;
				row[j].innerHTML = row[j+1].innerHTML;
				row[j+1].innerHTML = temp;
			}
		}
	}
}

function Sort(oTable, itself) {
	var col = itself.index;
	var Tbody = oTable.getElementsByTagName("tbody")[0];
	var row = Tbody.getElementsByTagName("tr");
	//判断进行哪种排序
	if (itself.ClickTime == 1) {
		Sorting(row, itself.number, up);
	} else if (itself.ClickTime == 2) {
		Sorting(row, itself.number, down);
	}
	// 排序后再次设置偶数行灰色
	SetColor(oTable);
}

function SetSorter(oTable) {
	var head = oTable.getElementsByTagName("th");
	for (var i = 0; i < head.length; i++) {
		//初始化所有排序标题
		head[i].ClickTime = 0;
		head[i].number = i;
		//设置onclick事件
		head[i].onclick = function() {
			ChangeSorter(oTable, this.number);
			Sort(oTable, this);
		}
	}
}