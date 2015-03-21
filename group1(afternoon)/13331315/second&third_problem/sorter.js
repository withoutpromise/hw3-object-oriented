window.onload = function() {
	var tables = getAllTables();
	makeAllTablesfilterable(makeAllTablesSortable(tables));
}
function getAllTables() {
	return document.getElementsByTagName("table");
}
function makeAllTablesSortable(tables) {
	for(var i = 0;i < tables.length;i++) {
		makeSortable(tables[i]);
	}
}
function makeSortable(table_) {
	ths = table_.getElementsByTagName("th");
	trs = table_.getElementsByTagName("tr");
	for (var i = 0;i < trs.length;i++) {
		if(i%2 != 1) {
			trs[i].style.backgroundColor = "#DCDCDC";
		}
	}
	trs[0].style.backgroundColor = "DarkBlue";
	for (var i = 0;i < ths.length;i++) {
		ths[i].onclick=function() {
			if(this.className == ""||this.className == "thdown") {
				tablesort(table_,this.cellIndex,"up");
				this.className = "thup";
			} else {
				tablesort(table_,this.cellIndex,"down");
				this.className = "thdown";
			}
		}
	}
}
function tablesort(table_,col,way) {
	ths = table_.getElementsByTagName("th");
	for (var i = 0; i<ths.length;i++) {
		ths[i].style.backgroundColor = "DarkBlue";
		ths[i].className = "";
	}
	ths[col].style.backgroundColor = "#A6AEFC";
	trs = table_.getElementsByTagName("tr");
	var tds = new Array(trs.length);
	for(var i = 0;i < trs.length;i++) {
		tds[i] = trs[i].getElementsByTagName("td");
	}
	if(way == "down") {
		for(var i = 1;i < trs.length; i++) {
			for(var j = i+1;j < trs.length;j++) {
				if (tds[i][col].innerText < tds[j][col].innerText) {
					for(var each = 0;each < tds[i].length; each++) {
						var turn = tds[i][each].innerText;
						tds[i][each].innerText = tds[j][each].innerText;
						tds[j][each].innerText = turn;
					}
				}
			}
		}
	} else if (way == "up") {
		for(var i = 1;i < trs.length; i++) {
			for(var j = i+1;j < trs.length;j++) {
				if (tds[i][col].innerText > tds[j][col].innerText) {
					for(var each = 0;each < tds[i].length; each++) {
						var turn = tds[i][each].innerText;
						tds[i][each].innerText = tds[j][each].innerText;
						tds[j][each].innerText = turn;
					}
				}
			}
		}
	}
}

	