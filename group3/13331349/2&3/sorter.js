function strCompare(arr, index, direction) {
	var objs = [];
	for (var i = 0; i < arr.length; i++) {
		objs.push({
			str: arr[i]
		});
	}

	for (var i = 0; i < objs.length - 1; i++) {
		for (var j = i + 1; j < objs.length; j++) {
			if (direction == DIRECTION[1]) {
				if (objs[i].str[index] > objs[j].str[index]) {
					var temp = objs[i];
					objs[i] = objs[j];
					objs[j] = temp;
				}
			}
			else {
				if (objs[i].str[index] < objs[j].str[index]) {
					var temp = objs[i];
					objs[i] = objs[j];
					objs[j] = temp;
				}
			}
		}
	}

	return objs;
}

function sortTableByCol(table, index, direction) {
	index = (index == undefined) ? 0 : index;
	direction = (direction == undefined) ? DIRECTION[0] : direction;
	var trs_copy = getTableArr(table, 1);
	var cells;
	var trs = table.getElementsByTagName('tbody')[0].rows;
	var sortObjs = strCompare(trs_copy, index, direction);

	for (var i = 0; i < trs.length; i++) {
		cells = trs[i].cells;
		for (var j = 0; j < cells.length; j++) {
			cells[j].innerHTML = sortObjs[i].str[j];
		}
	}

}

function addThEvent(table) {
	var ths = table.rows[0].cells;
	for (var i = 0; i < ths.length; i++) {
		ths[i].onclick = function(e) {
			var dom = e.target;
			if (hasClassName(dom, DIRECTION[0])) {
				removeClassName(dom, DIRECTION[0]);
				addClassName(dom, DIRECTION[1]);
				sortTableByCol(table, dom.cellIndex, DIRECTION[0]);
			} else {
				removeClassName(dom, DIRECTION[1]);
				addClassName(dom, DIRECTION[0]);
				sortTableByCol(table, dom.cellIndex, DIRECTION[1]);
			}
		}
		ths[i].onmouseleave = function(e) {
			var dom = e.target;
			if (hasClassName(dom, DIRECTION[0])) {
				removeClassName(dom, DIRECTION[0]);
			}
			if (hasClassName(dom, DIRECTION[1])) {
				removeClassName(dom, DIRECTION[1]);
			}
		}

	}
}

function makeAllTablesSortable(table_doms) {
	for (var i = 0; i < table_doms.length; i++) {
		addThEvent(table_doms[i]);
	}
}
