
function addSearch(tempTable) {
	var textInput = document.createElement("input");
	textInput.type = "text";
	document.body.insertBefore(textInput,tempTable);
	textInput.style.marginBottom = "10px";
	return textInput;
}

function tableFilterable(tempTable) {
	var textInput = addSearch(tempTable);
	textInput.oninput = function() {
		var textInputted = this.value;
		var tempThead = tempTable.getElementsByTagName("th");
		var tempTbody = tempTable.getElementsByTagName("tbody")[0];
		var tempTr = tempTbody.getElementsByTagName("tr");
		var tempTd = [];
		var patt = new RegExp(textInputted, "g");
		
		for (var i = 0; i < tempTr.length; i++) {
			tempTd[i] = tempTr[i].getElementsByTagName("td");
		}
		for (var i = 0; i < tempTr.length; i++) {
			var visible = 0;
			for (var j = 0; j < tempTd.length; j++) {
				tempTd[i][j].innerHTML = tempTd[i][j].innerHTML.replace(/<span class=\"highlight\">|<\/span>/g, "");
				if (patt.test(tempTd[i][j].innerHTML)) {
					visible = 1;
					tempTd[i][j].innerHTML = tempTd[i][j].innerHTML.replace(patt, "<span class = 'highlight'>"
						+ textInputted + "</span>");
				}
				if (visible) {
					tempTr[i].style.display = "table-row";
				} else {
					tempTr[i].style.display = "none";
				}
			}
		}
	}
}

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		tableFilterable(tables[i]);
	}
}
