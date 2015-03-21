window.onload = function() {
	var tables = getAllTables();
	makeAllTableSortableAndFilterable(tables);
};

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTableSortableAndFilterable(tables) {
	for (var i = 0, len = tables.length; i < len; i++) {
		makeFilterable(makeSortable(tables[i]));
		//makeSortable(makeFilterable(tables[i]));也可以
	}
}

function makeFilterable(table) {
	var input_ = document.createElement('input');
	input_.type = 'text';
	var tr_ = document.createElement('tr');
	var td_ = document.createElement('td');
	tr_.appendChild(td_);
	td_.appendChild(input_);
	table.getElementsByTagName('tbody')[0].appendChild(input_);

	table.getElementsByTagName('input')[0].oninput = function() {
		return function() {
			var m = table.getElementsByTagName('input')[0].value;
			var pattern = new RegExp(m, 'g');
			var reg_strongF = new RegExp('<strong>', 'g'), 
				reg_strongB = new RegExp('</strong>', 'g')
			var reg_tdF = new RegExp('<td>', 'g'), 
				reg_tdB = new RegExp('</td>', 'g');
			var trs = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

			for (var j = 0; j < trs.length; j++) {
				trs[j].innerHTML = trs[j].innerHTML.replace(reg_strongB, '').replace(reg_strongF, '');
				if (m == '') {
					trs[j].style.visibility = 'visible';
				} else if (trs[j].innerHTML.replace(reg_tdB, '').replace(reg_tdF, '').match(pattern)) {
					var tds = trs[j].getElementsByTagName('td');
					for (var k = 0; k < tds.length; k++) {
						tds[k].innerHTML = tds[k].innerHTML.replace(pattern, '<strong>' + m + '</strong>');
					}
					trs[j].style.display = 'table-row';
				} else {
					trs[j].style.display = 'none';
				}
			}
		};
	} ();

	return table;
}

function  makeSortable(table) {
	var ths = table.getElementsByTagName('th');
	for (var i = 0; i < ths.length; i++) {
		ths[i].onclick = function() {
			return function() {
				for (var j = 0; j < ths.length; j++) {
					if (j != this.cellIndex) ths[j].className = 'normal';
				}

				if (this.className == 'ascend') {
					this.className = 'descend';
					sortTable(table, this.cellIndex, 'down');
				} else {
					this.className = 'ascend';
					sortTable(table, this.cellIndex, 'up');
				}

				function ascendSort(a, b) { //去除html标签
					return a.innerHTML.replace(/<[^>].*?>/g, "") > b.innerHTML.replace(/<[^>].*?>/g, "");
				}

				function descendSort(a, b) { 
					return a.innerHTML.replace(/<[^>].*?>/g, "") < b.innerHTML.replace(/<[^>].*?>/g, "");
				}

				function sortTable(table, index, UorD) {
					var tds = table.getElementsByTagName('td');
					var num_of_column = table.getElementsByTagName('th').length, num_of_row = parseInt(tds.length / num_of_column);
					var arr = [];
					for (var i = 0; i < num_of_row; i++) {
						arr[i] = tds[index + i * num_of_column];
					}

					var parent = table.getElementsByTagName('tbody')[0];
					var nodeP = [], nodeC = [];
					for (var i = index, k = 0; i < tds.length; i += num_of_column, k++) {
						nodeP[k] = parent.getElementsByTagName('tr')[k].cloneNode(true);
						nodeC[k] = parent.getElementsByTagName('td')[i].cloneNode(true);
					}

					if (UorD == 'up')  arr.sort(ascendSort);
					else arr.sort(descendSort);
	
					for (var i = 0; i < num_of_row; i++) {
						for (var j = 0; j < num_of_row; j++) {
							if (nodeC[j].innerHTML == arr[i].innerHTML) {
								parent.replaceChild(nodeP[j], parent.getElementsByTagName('tr')[i]);
								break;
							}
						}
					}
				}
			};
		} (i);
	}

	return table;
}