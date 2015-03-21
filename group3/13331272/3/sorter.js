
	function onSearch( table) {
		return function () {
		var that = this;
		setTimeout(function() {
		var oTable = table;
		var obj = that;
		var oBody = oTable.tBodies[0];
		var oRows = oBody.rows;
		var oCols = oTable.tHead.rows[0].cells.length;
		var ke = obj.value;
		for (var i = 0; i < oRows.length; i++) {
			var flag = 0;
			for (var j = 0; j < oCols; j++) {
				var text = oRows[i].cells[j].innerText;
				if (text.match(ke)) {
					oRows[i].style.display = '';
					oRows[i].cells[j].innerHTML = oRows[i].cells[j].innerText.replace(ke, "<span>"+ke+"</span>");
					flag = 1;
				}
			}
			if (flag == 0) oRows[i].style.display = 'none';
		}
		}, 200)
	}
}

	function getAllTables() {
		return document.getElementsByTagName("table");
	}

	function sortTable(sid, sCol ,dataType) {
		return function () {
		    var oTable = document.getElementById(sid);
			var oBody = oTable.tBodies[0];
			var oRows = oBody.rows;
			var arr = new Array();
			for (var j = 0; j < oRows.length; j++)
				arr[j] = oRows[j];
			
			if (oTable.sortCol == sCol)
				arr.reverse();
			else 
				arr.sort(gCompare(sCol, dataType));
			var oFragment = document.createDocumentFragment();
			for (var j = 0; j < arr.length; j++)
				oFragment.appendChild(arr[j]);
			oBody.appendChild(oFragment);
			oTable.sortCol = sCol;
			for (var i = 0; i < oRows[0].cells.length; i++) {
			oTable.tBodies[0].rows[1].cells[i].style.backgroundColor = "rgb(221,221,221)";
			oTable.tBodies[0].rows[0].cells[i].style.backgroundColor = "rgb(255,255,255)";
			oTable.tBodies[0].rows[2].cells[i].style.backgroundColor = "rgb(255,255,255)";
	}
			for (var i = 0; i < oRows[0].cells.length; i++) {
				if (i<oRows[0].cells.length-1 && oTable.tBodies[0].rows[i].cells[sCol].firstChild.nodeValue < oTable.tBodies[0].rows[i+1].cells[sCol].firstChild.nodeValue) {
					oTable.tHead.rows[0].cells[sCol].style.backgroundImage = "url(ascend.png)";
					break;
				} else if (i == oRows[0].cells.length-1) 
				oTable.tHead.rows[0].cells[sCol].style.backgroundImage = "url(descend.png)";
			}

		}
	}
	

	function convert(svalue, dataType) {
		switch(dataType) {
			case "int":
			return parseInt(svalue);
			default:
			return svalue.toString();
		}
	}

	function gCompare(sCol, dataType) {
		return function Compare(tone, ttwo) {
			var a  = convert(tone.cells[sCol].firstChild.nodeValue, dataType);
			var b  = convert(ttwo.cells[sCol].firstChild.nodeValue, dataType);
			return (a > b);
		}
	}

	function makeSortable(tables) {
		for (var i = 0; i < tables.length; i++) {
			for (var j = 0; j < tables[i].tHead.rows[0].cells.length; j++)
		tables[i].tHead.rows[0].cells[j].onclick = sortTable(tables[i].getAttribute("id"), j);
	}
	return tables;
}
	function makeFilterable(tables) {
		for (var i = 0; i < tables.length; i++) {
			var input = document.createElement("input");
			input.type = "text";
			input.placeholder = "Please input keyword.";
			tables[i].parentNode.insertBefore(input,tables[i]);
			input.onkeydown = onSearch( tables[i]);
		}
		return tables;
	}


window.onload = function() {
	var tables = getAllTables();
	 makeSortable(makeFilterable(tables));
}
