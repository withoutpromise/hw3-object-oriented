window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

//获取文档中所有table
function getAllTables() {
	return document.getElementsByTagName("table");
}

//为所有的th标签绑定click事件
function makeAllTablesFilterable(tables) {
	for (var i = 0 ; i < tables.length ; i++) {
		var e = document.createElement("input");
        e.type = "text";
        e.onchange = filter;
		tables[i].parentNode.insertBefore(e,tables[i]);
	}
}
function filter() {
	var filterText = this.value;
	var trs = this.nextSibling.getElementsByTagName('tr');
	for (var i = 0 ; i < trs.length ; i++) {
		var tds = trs[i].getElementsByTagName('td');
		var judge = false;
		for (var j = 0 ; j < tds.length ; j++) {
			if (tds[j].innerText.indexOf(filterText) != -1) {
				judge = true;
				tds[j].innerHTML=tds[j].innerHTML.replace("search", '');
				tds[j].innerHTML=tds[j].innerHTML.replace(filterText, '<span class="search">'+filterText+'</span>');
			}
		}
		if(judge)
			trs[i].style.display="";
		else
			trs[i].style.display="none";
	}
}
