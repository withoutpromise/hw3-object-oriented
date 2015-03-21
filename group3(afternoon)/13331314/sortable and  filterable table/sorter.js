/*
	Author: ye jiaqi
	Time: 13 March 2015
*/

// making all tables sortable
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
	makeAllTablesFilterable(tables);
}

// to get all tables in the web page
function getAllTables() {
	return document.getElementsByTagName("table");
}

// make the tables sortable by clicking on the table head
function makeAllTablesSortable(tables) {
	for(var i = 0; i < tables.length; i ++) {
		// get all table heads for each table
		var table_heads = tables[i].getElementsByTagName("th");
		// ther is someone who do not use the "th" tag
		if (table_heads.len == 0) {
			table_heads = tables[i].rows[0];
		}

		// give each thead an id to clarify each colum
		for(var j = 0; j < table_heads.length; j++) {
			table_heads[j].setAttribute("id", j);
		}

		// for each click on the the head, make a response
		for(var j = 0; j < table_heads.length; j++) {
			// give another function
			table_heads[j].onclick = function() {
				// this.parentNode.parentNode.parentNode means the table
				sort(this.parentNode.parentNode.parentNode, this);
			}
		}
	}
}

function sort(table, head) {
	var to_sort = [];
	head_id = head.id;
	row_len = 0;
	//row_len = table.rows.length;
	for(var i = 0; i < table.rows.length; i++) {
		if(table.rows[i].style.display != "none") {
			row_len++;
		}
	}
	// get the Sequence if whether the table colum is already sorted or not
	Sequence = head.getAttribute("class");

	var k = 0;
	// get each row for sorting
	for(var i = 1; i < table.rows.length; i++) {
		if(table.rows[i].style.display != "none") {
			to_sort[k] = table.rows[i];
			k++;
		}
	}
	// sort it
	to_sort.sort(compare(Sequence));
	// prevent reference error
	for(var i = 0; i < row_len-1; i++) {
		to_sort[i] = to_sort[i].innerHTML;
	}

	// change the rows
	for(var i = 0; i < row_len-1; i++) {
		table.rows[i+1].innerHTML = to_sort[i];
	}

	// set other soeted colum to be none
	for (var i = 0; i < table.rows[0].cells.length; i++) {
		table.rows[0].cells[i].setAttribute("class", "")
	}

	// set the Sequnce
	if(Sequence != "Ascending")
		head.setAttribute("class", "Ascending")
	else
		head.setAttribute("class", "Descending")

}

function compare(Sequence) {
	return function(row1,row2) {
		var value1 = row1.cells[head_id].innerHTML;
		var value2 = row2.cells[head_id].innerHTML;

		// use  diffrenet sorting method for different status

		if (value1 < value2) {
			return  (Sequence == "Ascending" ? 1 : -1);
		} else if (value1 > value2) {
			return  (Sequence == "Ascending" ? -1 : 1);
		} else  {
			return 0;
		}
	}
}

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		// add a filter to the document
		var filter = document.createElement('p');
		filter.innerHTML = '<input type="input" placeholder="Filter">';
		filter = filter.childNodes[0];
		filter.setAttribute('id', 'filter'+i);
		document.body.insertBefore(filter, tables[i]);
		// make all filters available
		// using a closure
		filter.oninput = function (table, i) {
			return function() {
				filt(table, i);
			}
		}(tables[i], i);
	}
}

// filt function
function filt(table, id) {
	var filter = document.getElementById('filter' + id);
	var content = filter.value;
	var Found = new Array();

	reset(table);
	// make an array to verify each row to display
	for(var i = 1; i < table.rows.length; i++) {
		Found[i] = false;
	}

	// for each row, filt the content in the filter
	for(var i = 1; i < table.rows.length; i++) {
		for(var j = 0; j < table.rows[i].cells.length; j++) {
			if(table.rows[i].cells[j].innerText.indexOf(content) != -1) {
				Found[i] = true;
			}
		}
	}

	// hide the "not-found" rows
	for(var i = 1; i < table.rows.length; i++) {
		if (Found[i] != true){
			hide(table.rows[i]);
		}
	}
}

// make all rows visiable
function reset(table) {
	for(var i = 0; i < table.rows.length; i++) {
		display(table.rows[i]);
	}
}

// to hide a row
function hide(row) {
	row.style.display = "none";
}

// to display a row
function display(row) {
	row.style.display = "";
}