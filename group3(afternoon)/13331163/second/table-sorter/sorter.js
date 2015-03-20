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

// 获取所有的表格
function getAllTables() {
	return document.getElementsByTagName('table');
}

// 使表格可排序
function makeTableFliterable(oTable) {
	var aTh = oTable.getElementsByTagName('th');
	for (var i = 0; i < aTh.length ; i++) {
		// 给每个th添加初始默认状态
		util.addClass(aTh[i], 'thDefault');
		// 设置th的点击事件
		aTh[i].onclick = (function(ith) {
			return function() {

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
					// 删除所有奇偶数行的标志
					util.removeClass(arr[i], 'alternate');
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
					// 设置偶数行的状态
					if (i % 2 == 1) util.addClass(arr[i], 'alternate');
					oTbody.appendChild(arr[i]);
				}

			};
		})(i);
	}
}

// 使所有表格可排序
function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		makeTableFilterable(tables[i]);
	}
}

window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}
