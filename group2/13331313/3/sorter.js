/*
叶炽凯
13331313
last-version:2014.03.17
*/


function getALLTables () {
	return document.getElementsByTagName("table");
}

//comparism rules
function comp(col) {
	return function compp(a, b) {
		return a.cells[col].innerHTML > b.cells[col].innerHTML;
	};
}

//sort the table base on the col onclicked
function sortTable (col, table) {
	var arr = [];
	var heads = table.getElementsByTagName('th');
	for (var i = 1; i < table.rows.length; i++) arr[i-1] = table.rows[i];
	if (table.lsCol == col) {			//reverse the table if same col was click double times(no time limits but should be continuously)
		arr.reverse();
		table.arrow = !table.arrow;			//reverse the arrow
	} else {
		arr.sort(comp(col));
		table.arrow = true;
		if (table.lsCol != -1) {
			heads[table.lsCol].setAttribute('class', '');		//remove the attributes for last sorted col
		}
	}

	//change the style of the col onclicked
	if (table.arrow == true) {
		heads[col].setAttribute('class', 'sortedCol ascend');
	} else {
		heads[col].setAttribute('class', 'sortedCol descend');
	}

	for (var i = 1; i < table.rows.length; i++) {
		if ((i-1)%2 == 1) arr[i-1].setAttribute('class', 'alternate');
		else arr[i-1].setAttribute('class', 'non-alternate');
		table.appendChild(arr[i-1]);
	}
	table.lsCol = col;
}

function makeTableSorttable(table) {
	var tableHeads = table.getElementsByTagName("th");
	for (var i = 0; i < tableHeads.length; i++) {
		(function(i) {tableHeads[i].onclick = function(){sortTable(i, table);}})(i);
	}
}

function makeAllTablesSorttable (tables) {
	for (var i = 0; i < tables.length; i++) {
		tables[i].lsCol = -1;				//last colum sorted
		tables[i].arrow = true;				//true ~ ascend, false ~ descend
		makeTableSorttable(tables[i]);
	}
    return tables;
}
