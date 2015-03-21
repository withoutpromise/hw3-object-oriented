window.onload = function() {
	var tables = getAllTables();
	makeAllTableFilterable(tables);
};

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTableFilterable(tables) {
	for (var i = 0, len = tables.length; i < len; i++) {
		addInput(tables[i]);
		tables[i].getElementsByTagName('input')[0].oninput = function(i) {
			return function() {
				var m = tables[i].getElementsByTagName('input')[0].value;
				var pattern = new RegExp(m, 'g');
				var reg_strongF = new RegExp('<strong>', 'g'), 
					reg_strongB = new RegExp('</strong>', 'g');
				var reg_tdF = new RegExp('<td>', 'g'), 
					reg_tdB = new RegExp('</td>', 'g');
				var trs = tables[i].getElementsByTagName('tbody')[0].getElementsByTagName('tr');

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
		} (i);
	}
}

function addInput(table) {
	var input_ = document.createElement('input');
	input_.type = 'text';
	var tr_ = document.createElement('tr');
	var td_ = document.createElement('td');
	tr_.appendChild(td_);
	td_.appendChild(input_);
	table.getElementsByTagName('tbody')[0].appendChild(input_);
}