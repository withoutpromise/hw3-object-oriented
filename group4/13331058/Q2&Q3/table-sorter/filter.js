function makeFilterable(Tables) {
	for (var i = 0; i < Tables.length; i++) {
		SetFilter(Tables[i]);
	}
	return Tables;
}

function SetFilter(Table) {
	//	增加输入域
	var textarea = document.createElement("input");
	textarea.type = "text";
	document.body.insertBefore(textarea, Table);
	textarea.style.marginBottom = "10px";
	textarea.style.backgroundColor = "#F5FFFA";
	//	实时监控textarea内的筛选字符
	textarea.oninput = function () {
		var string = this.value;
		var regExp = new RegExp(string, "gi");
		// 获取table数据
		var data = [];
		var row_len = Table.rows.length;
		for (var i = 1; i < row_len; i++) {
			data[i-1] = [];
			var row = Table.rows[i].getElementsByTagName("td");
			for (var j = 0; j < row.length; j++) {
				data[i-1].push(row[j]);
			}
		}
		var col_len = data[0].length;
		var can_match;
		// 匹配并凸显匹配成功的字串
		var visual_num = 0;
		for (var i = 0; i < row_len; i++) {
			can_match = false;
			for (var j = 0; j < col_len; j++) {
				// 清除旧标签
				data[i][j].innerHTML = data[i][j].innerHTML.replace(/<span class=\"emphasize\">|<\/span>/g, "");
				// 增添强调标签
				if (regExp.test(data[i][j].innerHTML)) {
					data[i][j].innerHTML = data[i][j].innerHTML.replace(regExp, "<span class='emphasize'>" + data[i][j].innerHTML.match(regExp)[0] + "</span>");
					can_match = true;
				}
			}
			// 隐藏掉不能匹配的一整行
			if (can_match) {
				Table.rows[i+1].style.display = "table-row";
				visual_num++;
			} else {
				Table.rows[i+1].style.display = "none";
			}
			// 实时监控偶数行设置灰色
			if (visual_num % 2 == 0) {
			Table.rows[i+1].style.backgroundColor = "#DDDDDD";
			} else {
			Table.rows[i+1].style.backgroundColor = "white";
			}
		}
	}
}