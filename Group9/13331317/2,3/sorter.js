
function changeColor(tempTable) {
	var tempTbody = tempTable.getElementsByTagName("tbody")[0];
	var tempTr = tempTbody.getElementsByTagName("tr");
	for(var i = 0; i < tempTr.length; i++) {
		if (i % 2 == 1) {
			var tempTd = tempTr[i].getElementsByTagName("td");
			for (var j = 0; j < tempTd.length; j++) {
				tempTd[j].style.backgroundColor = "#DDDDDD";
			}
		}
	}
}


function tableSortable(tempTable) {
	var tempThead = tempTable.getElementsByTagName("th");
	var tempTbody = tempTable.getElementsByTagName("tbody")[0];
	var tempTr = tempTbody.getElementsByTagName("tr");
	var tempTd = [];
	for (var i = 0; i < tempTr.length; i++) {
		tempTd[i] = tempTr[i].getElementsByTagName("td");
	}
	var isClick = [];
	for (var i = 0; i < tempThead.length; i++) {
		isClick[i] = 0;
	}
	for (var i = 0; i < tempThead.length; i++) {
		tempThead[i].onclick = function() {
			var boxNum = this.cellIndex;
			for (var j = 0; j < tempThead.length ;j++) {
				if (j != boxNum) {
					tempThead[j].className = "";
				}
			}	
			if (isClick[boxNum] == 0) {
				this.className = "upper";
				isClick[boxNum] = 1;
				for(var p = 0; p < tempTr.length; p++) {
					for(var q = p+1; q < tempTr.length; q++) {
						if(tempTd[p][boxNum].innerText > tempTd[q][boxNum].innerText) {
							for (var y=0; y<tempTd[p].length;y++) {
								var temp = tempTd[p][y].innerText;
								tempTd[p][y].innerText = tempTd[q][y].innerText;
								tempTd[q][y].innerText = temp;
							}
						}
					}
				}
			}
			else if (isClick[boxNum] == 1) {
				tempThead[boxNum].className = "down";
				isClick[boxNum] = 0;
				for(var p = 0; p < tempTr.length; p++) {
					for(var q = p+1; q < tempTr.length; q++) {
						if(tempTd[p][boxNum].innerText < tempTd[q][boxNum].innerText) {
							for (var y=0; y<tempTd[p].length;y++) {
								var temp = tempTd[p][y].innerText;
								tempTd[p][y].innerText = tempTd[q][y].innerText;
								tempTd[q][y].innerText = temp;
							}
						}
					}
				}
			}
		}
	}
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		changeColor(tables[i]);
		tableSortable(tables[i]);
	}
}
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
	makeAllTablesFilterable(tables);
}
