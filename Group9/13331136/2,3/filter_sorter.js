window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(makeAllTablesSortable(tables));
}

// 筛选表格
function makeAllTablesFilterable(tables) {
	var inputBar = document.getElementsByName("table");

	for (var i = 0; i < tables.length; i++) {

		// 输入完成后触发时间
		inputBar[i].onchange = function() {
			var table = this.nextElementSibling||this.nextSibling;               // 获取当前表格
			var td = table.getElementsByTagName("td");                           // 获取每个格子的对象
			var search = this.value;                                             // 获取要查询的字符串
			var hasRowIndex = [];                                                // 表示哪一行有要查询的内容，有存为“1”，没有为“0”

			// 初始化数组
			for (var k = 0; k < table.getElementsByTagName("tr").length-1; k++) {
				hasRowIndex.push(0);
			}

			for (var j = 0; j < td.length; j++) {
				var highlight = td[j].innerHTML.indexOf(search);                 // 要查询的字符串在这个cell的字符串里面的位置（下标）
				var text = td[j].innerHTML;                                      // 这个cell里面的文字

				if (highlight > -1) {
					// 查找到相应的字符串，则将数组里相应的位置为“1”
					hasRowIndex[(td[j].parentNode.rowIndex)-1] = 1;
					// 突出要查询的字符串
					td[j].innerHTML = text.substring(0, highlight);
					td[j].innerHTML += "<strong>"+ text.substring(highlight, highlight+search.length) + "</strong>";
					td[j].innerHTML += text.substring(highlight+search.length);
				}

			}

			// 删除没有相关内容的行
			for (var k = hasRowIndex.length-1; k >= 0; k--) {
				if (hasRowIndex[k] == 0) {
					table.deleteRow(k+1);
				}
			}
		}
	}
}


// 将表格内的信息储存为二维数组
function getAllTables() {
	var tablesWithTag = document.getElementsByTagName("td");
	var tablesWithoutTag = [];

	// 把tablesWithTag数组里的标签去掉，存在新数组tablesWithoutTag里面
	for (var i = 0; i < tablesWithTag.length; i++) {
		tablesWithoutTag.push(tablesWithTag[i].innerHTML);
	}

	// 将tablesWithoutTag转成二维数组
	var tablesSplitted = [];
	for (var i = 0; i < tablesWithoutTag.length; i = i+3) {
		tablesSplitted.push(tablesWithoutTag.slice(i, i+3));
	}

	return tablesSplitted;
}


// 判断哪个地方被点击了，然后将对应的内容排序，最后更改每行表格的内容
function makeAllTablesSortable(tables) {

	var sortedTables = [];                                  // 用来存排好序的数组
	var header = document.getElementsByTagName("th");       // 获取全部表头，存在数组里
	var cells = document.getElementsByTagName("td");        // 获取表格中的每一个数据，用来更给表格中的数据
	var headerIndex = -1;                                   // 表示第几个表头被点击了
	var tableIndex = 0;                                     // 表示哪一个表格被点击了，“0”表示上方表格，“3”表示下方表格
	var image = "";                                         // 储存表头的背景图片信息
	var bgColor = "";                                       // 储存表头的背景颜色信息


	for (var i = 0; i < 6; i++) {
		// 鼠标点击事件
		header[i].onclick = function() {

			// 获取被点击表头的下标
			for (var j = 0; j < 6; j++) {
				if (this == header[j]) {
					headerIndex = j;
				}
			}

			// 计算是哪一个表格被点击了，然后将这个表格中的数据存到sortedTables中
			tableIndex = Math.floor(headerIndex/3)*3;
			sortedTables = tables.slice(tableIndex, tableIndex+3);

			// 获取被点击区域的css信息
			image = window.getComputedStyle(this, null).backgroundImage;
			bgColor = window.getComputedStyle(this, null).backgroundColor;

			// 判断是否是第一次点击，排序，改变背景颜色，改变背景图片
			if (bgColor == "rgb(0, 0, 128)") {
				sortedTables.sort(ascendSort);
				// 重置所有表头的背景颜色
				resetBgColor();
				this.style.backgroundColor = "rgb(165, 177, 253)";
			}
			else if (bgColor == "rgb(165, 177, 253)") {
				// 通过背景图片信息来决定是升序还是降序排列
				if (image.indexOf("ascend") > 0) {
					sortedTables.sort(descendSort);
					this.style.backgroundImage = "url(\"descend.png\")";
				} else if (image.indexOf("descend") > 0) {
					sortedTables.sort(ascendSort);
					this.style.backgroundImage = "url(\"ascend.png\")";
				}
			}

			// 更改表格中的数据
			var count = tableIndex*3;
			for(var j = 0; j < 3; j++) {
				for(var k = 0; k < 3; k++) {
					cells[count].innerHTML = sortedTables[j][k];
					count++;
				}
			}

			// 升序排列
			function ascendSort(a, b) {
				if (a[headerIndex%3] < b[headerIndex%3]) return -1;
				else return 1;
			}

			// 降序排列
			function descendSort(a, b) {
				if (a[headerIndex%3] < b[headerIndex%3]) return 1;
				else return -1;
			}

			// 重置所有表头的背景颜色
			function resetBgColor() {
				for (var j = 0; j < 6; j++) {
					header[j].style.backgroundColor = "rgb(0, 0, 128)";
					header[j].style.backgroundImage = "url(\"ascend.png\")";
				}
			}

		};
	}
	return document.getElementsByTagName("table");
}