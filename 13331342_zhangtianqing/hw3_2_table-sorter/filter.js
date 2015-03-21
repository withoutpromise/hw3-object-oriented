function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTablesFilterable(tables) {
	var len1 = tables.length;
	for (var i  = 0; i < len1; i++) {
		var cin = document.createElement('input');
		tables[i].parentNode.insertBefore(cin, tables[i]);
		cin.oninput = (function(i, cin) {
			return function() {
			         var cinValue = cin.value;
			         deal(tables[i], cinValue);
		   	};
		})(i, cin);
	}
}

function deal(table, cinValue) {
	var trs = table.getElementsByTagName('tr');
	var len2 = trs.length;
	for (var i = 1; i < len2; i++) {
		var tds = trs[i].getElementsByTagName('td');
		var same = false;
		var len3 = tds.length;
		for (var j = 0; j < len3; j++) {
			var clear = tds[j].innerHTML.replace(/<[^>]+>/g, "");
			tds[j].innerHTML = clear;
			if (tds[j].innerHTML.indexOf(cinValue) >= 0) {
				same = true;
				var innerHTML = tds[j].innerHTML;
				var index = innerHTML.indexOf(cinValue);
				tds[j].innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index, index + cinValue.length) + "</span>" + innerHTML.substring(index + cinValue.length, innerHTML.length);
				console.log(innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index, index + cinValue.length) + "</span>" + innerHTML.substring(index + cinValue.length, innerHTML.length));
			}
		}
		if (same === true) {
			trs[i].style.display = 'table-row';
		} else {
			trs[i].style.display  = 'none';
		}
	}
}

var tables = getAllTables();
makeAllTablesFilterable(tables);