function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		makeTableFilterable(tables[i]);
	}
}

function makeTableFilterable(table) {
	var datas = getData(table);
	function initTable(table) {
		var input = document.createElement("input");
		var label = document.createElement("label");
		var div = document.createElement("div");
		var textNode = document.createTextNode("Search by");
		input.id = "search";
		label.htmlFor = input.id;
		label.appendChild(textNode);
		div.appendChild(label);
		div.appendChild(input);
		table.parentNode.insertBefore(div, table);
		input.addEventListener('input', filterRows);
	}

	//提取关键字，过滤行
	function filterRows() {
		var keywords = event.target.value.toLowerCase();
		var newRows = [];
		//当关键字不为空
		if (keywords != "") {
			newRows = getSearchRows(keywords);
			ShowNewTable(table, newRows);
		} else {
			//当关键字为空时
    		for (var i = 0; i < datas.length; i++) {
        		newRows.push(datas[i]);
    		}
			ShowNewTable(table, newRows);
		}
	}

	//获得被搜索的行
	function getSearchRows(keywords) {
		var newRows = [];
		for (var i = 0 ; i < datas.length; i++) {
			var data = datas[i];
			var clone, textNode;
			for (var j = 0; j < data.cells.length; j++) {
				var text = data.cells[j].innerHTML.toLowerCase();
				if (text.indexOf(keywords) != -1) {
					clone = data.cloneNode(true);
					newRows.push(clone);
					traverseTextNode(clone, highlightText.bind(null, keywords));
					break;
				}
			}
		}
		return newRows;
	}

	//高亮搜索到的文本
	function highlightText(keywords, textNode) {
		var re = new RegExp('(' + keywords + ')', 'ig');
		var wrap = '<mark stlye="color:yellow">$1</mark>';
		var outerNode = textNode.parentNode;
		outerNode.innerHTML = outerNode.innerHTML.replace(re, wrap);
	}

	//获得原本表格的行数据
	function getData(table) {
		var rows = table.tBodies[0].rows;
		var datas = [];
		for (var i = 0; i < table.tBodies[0].rows.length; i++) {
			datas.push(table.tBodies[0].rows[i]);
		}
		return datas;
	}

	function traverseTextNode(node, callback) {
		var next = node;
		var ELEMENT_NODE = 1, TEXT_NODE = 3;
		if (node && node.nodeType === ELEMENT_NODE) {
		    do {
		        traverseTextNode(next.firstChild, callback);
		        next = next.nextSibling;
		    } while(next);
		} else if (node && node.nodeType === TEXT_NODE) {
		    if (!/^\s+$/.test(node.nodeValue))
		        callback(node);
		    if (node.nextSibling)
		        traverseTextNode(node.nextSibling, callback);
		}
	}

	initTable(table);
}