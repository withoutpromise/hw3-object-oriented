$ = function(id) {
	return document.getElementById(id);
}

$$ = function(selector) {
	return document.querySelectorAll(selector);
}

window.onload = function() {
	var tables = getAllTables();
	
	makeAllTablesSortable(tables);
	makeAllTablesFilterable(tables);
}

var Sorted;

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		makeSortable(tables[i]);
	}
}

function makeSortable(table) {
	var obj = document.getElementsByTagName("th");

	// Initial the array which records the order of each table
	if (Sorted == null) {
		Sorted = new Array(obj.length);
		for (var i = 0; i < obj.length; i++) {
			Sorted[i] = 0;
		}
	}

	// Trigger the sort function
	for (var i = 0; i < obj.length; i++) {
		obj[i].onclick = sortCol;
	}
}

function sortCol() {
	var i, j, tmp, iCol, iNum;
	var target = this.parentNode.parentNode.parentNode;

	// Find the number of the column which is needed to be sorted
	var obj = document.getElementsByTagName("th");
	for (i = 0; i < obj.length; i++) {
		if (obj[i] == this) {
			iNum = i;
			iCol = i%(target.rows[0].cells.length);
			break;
		}
	}

	var row = target.rows.length,
	    col = target.rows[0].cells.length;

	// Use a new array instead of the table's innerHTML to sort
	var A = new Array(row);
	for (i = 0; i < row; i++) {
		A[i] = new Array(col);
	}
	for (i = 0; i < row; i++) {
		for (j = 0; j < col; j++) {
			A[i][j] = target.rows[i].cells[j].innerHTML;
		}
	}

	// Bubble sorting
	if (Sorted[iNum] % 2 == 0) {  // Ascending order
		for (i = 0; i < row; i++) {
			for (j = 1; j < row-1; j++) {
				tmp = A[j];
				if (A[j][iCol].toString() > A[j+1][iCol].toString()) {
					A[j] = A[j+1];
					A[j+1] = tmp;
				}
			}
		}

		reset(iNum, 1);
	} else {                      // Descending order
		for (i = 0; i < row; i++) {
			for (j = 1; j < row-1; j++) {
				tmp = A[j];
				if (A[j][iCol].toString() < A[j+1][iCol].toString()) {
					A[j] = A[j+1];
					A[j+1] = tmp;
				}
			}
		}
		
		reset(iNum, 2);
	}

	// Put the sorted messages back to the table
	for (i = 1; i < row; i++) {
		for (j = 0; j < col; j++) {
			target.rows[i].cells[j].innerHTML = A[i][j];
		}
	}
}

function reset(iNum, k) {
	var obj = document.getElementsByTagName("th");
	var tablesNum = document.getElementsByTagName("table").length;
	var st, ed;
	if (iNum >= obj.length/tablesNum) {
		st = obj.length/tablesNum;
		ed = obj.length;
	} else {
		st = 0;
		ed = obj.length/tablesNum;
	}

	for (i = st; i < ed; i++) {
		// Remove the picture
		if (obj[i].childNodes.length > 1) obj[i].removeChild(obj[i].lastChild);

		// Find the aim column and put the correct picture on it
		// Meanwhile, change the color of this column's title
		if (i == iNum) {
			var img = document.createElement("img");
			if      (k == 1) img.src = "ascend.png";
			else if (k == 2) img.src = "descend.png";
			obj[i].appendChild(img);

			Sorted[iNum] = k;
			obj[iNum].style.backgroundColor = "rgb(128, 128, 255)";
		} else {
			Sorted[i] = 0;
			obj[i].style.backgroundColor = "rgb(0, 0, 160)";
		}

		// Make the odd rows to own the class "alternate" to change their background-color
		if (i % 2 == 0) {
			obj[i].className = "alternate";
		} else {
			obj[i].className = "";
		}
	}
}

var TABLE; // For recording the whole table for resuming

function makeAllTablesFilterable(tables) {
	makeFilterable(tables);
}

function makeFilterable(table) {
	addTextBlocks();

	recordTables();

	$("input1").onchange = filterChange;
	$("input2").onchange = filterChange;
}

// Record the whole table for resuming
function recordTables() {
	if (TABLE == null) {
		TABLE = {
			"todo"  : null,
			"staff" : null,
		};
	}
	var str = ["todo", "staff"];
	for (var k = 0; k < 2; k++) {
		if (TABLE[str[k]] == null) {
			var table = $(str[k]);
			var row = table.rows.length,
			    col = table.rows[0].cells.length;
			TABLE[str[k]] = new Array(row-1);
			for (var i = 0; i < row; i++) {
				TABLE[str[k]][i] = new Array(col);

				for (var j = 0; j < col; j++) {
					TABLE[str[k]][i][j] = table.rows[i].cells[j].innerHTML;
				}
			}
		}
	}
}

// Add one text block for each table
function addTextBlocks() {
	var body = document.getElementsByTagName("body");

	var input1 = document.createElement("input");
	input1.type = "text";
	input1.id = "input1";

	var p1 = document.createElement("p");
	p1.innerHTML = "Filter:";
	p1.style.fontWeight = "bold";
	p1.appendChild(input1);

	var div1 = document.createElement("div");
	div1.appendChild(p1);

	body[0].insertBefore(div1, $("todo"));

	var input2 = document.createElement("input");
	input2.type = "text";
	input2.id = "input2";

	var p2 = document.createElement("p");
	p2.innerHTML = "Filter:";
	p2.style.fontWeight = "bold";
	p2.appendChild(input2);

	var div2 = document.createElement("div");
	div2.appendChild(p2);

	body[0].insertBefore(div2, $("staff"));
}

function filterChange() {
	var target = this.id == "input1" ? "todo" : "staff";
	var filter = (target == "todo" ?
		          $("input1").value :
		          $("input2").value);

	refreshAllTrs(this);

	// Sure the number of tr of the table
	var Trs = $$("#" + target + " tbody tr");
	for (var i = 0; i < Trs.length; i++) {
		var Tds = Trs[i].childNodes;
		var had = false;
		for (var j = 0; j < Tds.length; j++) {
			if (Tds[j].tagName != "TD") continue;

			var m;
			if ((m = Tds[j].innerHTML.indexOf(filter)) != -1) {
				had = true;
			}
		}
		if (had == false) Trs[i].remove();
	}

	// Maintain the table's order
	makeSortableAgain.call(this);

	// Highlight the filter
	for (var i = 0; i < Trs.length; i++) {
		var Tds = Trs[i].childNodes;
		var had = false;
		for (var j = 0; j < Tds.length; j++) {
			if (Tds[j].tagName != "TD") continue;

			var m;
			if ((m = Tds[j].innerHTML.indexOf(filter)) != -1) {
				Tds[j].innerHTML = Tds[j].innerHTML.toString().replace(filter, "<b class = \"highlight\">"+filter+"</b>");
				had = true;
			}
		}
		if (had == false) Trs[i].remove();
	}
}

function makeSortableAgain() {
	var i, j, tmp, iCol, iNum;
	var target, st, ed;
	var obj = document.getElementsByTagName("th");

	if (this.id == "input1") {
		target = $("todo");
		st = 0;
		ed = obj.length;
	} else {
		target = $("staff");
		st = obj.length/2;
		ed = obj.length;
	}


	// Find the number of the column which is needed to be sorted
	for (i = st; i < ed; i++) {
		if (--Sorted[i] >= 0) {
			iNum = i;
			iCol = i%(target.rows[0].cells.length);
			break;
		}
	}

	var row = target.rows.length,
	    col = target.rows[0].cells.length;

	// Use a new array instead of the table's innerHTML to sort
	var A = new Array(row);
	for (i = 0; i < row; i++) {
		A[i] = new Array(col);
	}
	for (i = 0; i < row; i++) {
		for (j = 0; j < col; j++) {
			A[i][j] = target.rows[i].cells[j].innerHTML;
		}
	}

	// Bubble sorting
	if (Sorted[iNum] % 2 == 0) {  // Ascending order
		for (i = 0; i < row; i++) {
			for (j = 1; j < row-1; j++) {
				tmp = A[j];
				if (A[j][iCol].toString() > A[j+1][iCol].toString()) {
					A[j] = A[j+1];
					A[j+1] = tmp;
				}
			}
		}

		reset(iNum, 1);
	} else {                      // Descending order
		for (i = 0; i < row; i++) {
			for (j = 1; j < row-1; j++) {
				tmp = A[j];
				if (A[j][iCol].toString() < A[j+1][iCol].toString()) {
					A[j] = A[j+1];
					A[j+1] = tmp;
				}
			}
		}
		
		reset(iNum, 2);
	}

	// Put the sorted messages back to the table
	for (i = 1; i < row; i++) {
		for (j = 0; j < col; j++) {
			target.rows[i].cells[j].innerHTML = A[i][j];
		}
	}
}

function refreshAllTrs(This) {
	var target = This.id == "input1" ? "todo" : "staff";

	clearAllTrsOfTable(target);

	for (var i = 1; i < TABLE[target].length; i++) {
		var tr = document.createElement("tr");
		for (var j = 0; j < TABLE[target][i].length; j++) {
			var td = document.createElement("td");
			tr.appendChild(td);
		}
		$(target).childNodes[3].appendChild(tr);

		for (var j = 0; j < TABLE[target][i].length; j++) {
			$(target).rows[i].cells[j].innerHTML = TABLE[target][i][j];
		}
	}
}

// Remove all "tr"
function clearAllTrsOfTable(target) {
	var Trs = $$("#" + target + " tbody tr");
	for (var i = 0; i < Trs.length; i++) {
		Trs[i].remove();
	}
}
