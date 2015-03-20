(function() {
	'use strict';
})()

// 工具箱
var util = (function() {
	function hasClass(element, className) {
		var regExp = new RegExp('(\\s|^)'+className+'(\\s|$)');
		return !!element.className.match(regExp);
	}

	function addClass(element, className) {
		if (!hasClass(element, className)) {
			element.className += " " + className;
		}
	}

	function removeClass(element, className) {
		if (hasClass(element, className)) {
			var regExp = new RegExp('(\\s|^)'+className+'(\\s|$)');
			element.className = element.className.replace(regExp, ' ');
		}
	}

	return {
		hasClass : hasClass,
		addClass : addClass,
		removeClass : removeClass
	}
})();

/**
 * 改变奇偶数行的状态
 * @param {HTMLTableElement} oTable
 */
function changeRowsStatus(oTable) {
	// 获取所有tbody的row
	var rows = oTable.getElementsByTagName('tbody')[0].rows;
	// 遍历所有row，去除所有的alternate状态并且对可视的偶数行进行标记
	for (var i = 0, current = 0; i < rows.length; i++) {
		util.removeClass(rows[i], 'alternate');
		if (!util.hasClass(rows[i], 'hidden')) {
			if (current % 2 == 1) {
				util.addClass(rows[i], 'alternate');
			}
			current = (current + 1) % 2;
		}
	}
}


/**
 * 使表格可排序
 * @param {HTMLTableElement} oTable
 */
function makeSortable(oTable) {
	var aTh = oTable.getElementsByTagName('th');
	for (var i = 0; i < aTh.length ; i++) {
		// 给每个th添加初始默认状态
		util.addClass(aTh[i], 'thDefault');
		// 设置th的点击事件
		aTh[i].onclick = (function(ith) {
			return function() {
				// 还原过滤状态
				fliterRecover(oTable);

				// 还原所有th（除被点击的th）的状态
				var aTh = this.parentNode.getElementsByTagName('th');
				for (var i = 0; i < aTh.length; i++) {
					if (aTh[i] == this) continue;
					aTh[i].className = 'thDefault';
				}

				// 转换被点击的th的状态
				if (util.hasClass(this, 'ascending')) {
					util.removeClass(this, 'ascending');
					util.addClass(this, 'descending');
				} else if (util.hasClass(this, 'descending')) {
					util.removeClass(this, 'descending');
					util.addClass(this, 'ascending');
				} else {
					util.addClass(this, 'ascending');
				}
				
				// 提取tbody中的row，即带排序元素
				var oTbody = oTable.getElementsByTagName('tbody')[0];
				var arr = [];
				for (var i = 0; i < oTbody.rows.length; i++) {
					arr[i] = oTbody.rows[i];
				}

				// 根据被点击的th的当前状态决定排序的规则
				if (util.hasClass(this, 'ascending')) {
					arr.sort(function(tr1, tr2) {
						return tr1.cells[ith].innerHTML > tr2.cells[ith].innerHTML;
					});
				} else if (util.hasClass(this, 'descending')) {
					arr.sort(function(tr1, tr2) {
						return tr1.cells[ith].innerHTML < tr2.cells[ith].innerHTML;
					});
				}

				// 将所得排序结果返回到tbody中
				for (var i = 0; i < arr.length; i++) {
					oTbody.appendChild(arr[i]);
				}

				// 显式调用过滤器
				oTable.previousSibling.oninput();
			};
		})(i);
	}

	return oTable;
}

/**
 * 测试行匹配是否成功
 * @param {HTMLTableRowElement} row
 * @param {string} value
 */
function rowMatch(row, value) {
	// 制作正则表达式和替换字符串
	var regExp = new RegExp('('+value+')','gi');

	// 假设匹配不成功
	var isRowMatch = false;

	// 对row的每一列进行匹配
	for (var j = 0; j < row.cells.length; j++) {
		// 匹配并且替换匹配得到的字符串
		var replaceString = row.cells[j].innerHTML.replace(regExp, "<span class=\'highlight\'>$1</span>");
		// 判断所匹配的cell是否有改变
		if (replaceString != row.cells[j].innerHTML) {
			// 若成功改变，修改cell的值
			row.cells[j].innerHTML = replaceString;
			// 设置匹配成功
			isRowMatch = true;
		}
	}
	// 返回匹配结果
	return isRowMatch;
}

/**
 * 还原过滤状态
 * @param {HTMLTableElement} oTable
 */
function fliterRecover(oTable) {
	// 设置还原的正则表达式
	var regExp = new RegExp('<span class=\"highlight\">|<\/span>', 'g');
	// 获取需要还原的行
	var aRows = oTable.getElementsByTagName('tbody')[0].rows;
	// 遍历行的每个cell还原
	for (var i = 0; i < aRows.length; i++) {
		for (var j = 0; j < aRows[i].cells.length; j++) {
			aRows[i].cells[j].innerHTML = aRows[i].cells[j].innerHTML.replace(regExp, '');
			console.log(aRows[i].cells[j].innerHTML);
		}
	}
}


/**
 * 使表格可过滤化
 * @param {HTMLTableElement} oTable
 */
function makeFilterable(oTable) {
	// 创建fliter输入框
	var oInput = document.createElement('input');
	// 给fliter输入框添加样式
	util.addClass(oInput, 'filterInput');
	// 向页面添加fliter输入框
	oTable.parentNode.insertBefore(oInput, oTable);

	oInput.oninput = function() {
		// 还原表格
		fliterRecover(oTable);

		// 获取tbody的行信息
		var aRows = oTable.getElementsByTagName('tbody')[0].rows;

		for (var i = 0; i < aRows.length; i++) {
			// 先移除隐藏属性
			util.removeClass(aRows[i], 'hidden');
			
			// 如果匹配不成功，则隐藏该行
			if (!rowMatch(aRows[i], this.value)) {
				util.addClass(aRows[i], 'hidden');
			}
		}
		// 改变行的状态
		changeRowsStatus(oTable);
	};

	return oTable;
}

window.onload = function() {
	var todo = document.getElementById('todo');
	makeSortable(makeFilterable(todo));
	var staff = document.getElementById('staff');
	makeFilterable(makeSortable(staff));
}
