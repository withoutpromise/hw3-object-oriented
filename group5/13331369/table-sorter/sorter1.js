window.onload = function() {
    var tables = getAllTables();
    // tables[0].deleteRow(1);
    
    // makeAllTablesSortable(makeAllTablesFilterable(tables));
    makeAllTablesFilterable(makeAllTablesSortable(tables));
}

function getAllTables() {
    var table = document.getElementsByTagName("table");
    return table;
}

//filter function
function makeAllTablesFilterable(tables) {
	document.getElementById('todo_button').onclick = filterForTodoTable;
	document.getElementById('staff_button').onclick = filterForStaff;
	return document.getElementsByTagName('table');
}


//filter for todo table
function filterForTodoTable() {
	var has_the_filter_word = [0, 0, 0, 0]; //0 is not in the filter and 1 is in

	//get the value of the input
	var valueOfInput = document.getElementById('todo_input').value.trim();
	var table = document.getElementById("todo");

	var tr_size = document.getElementById("todo").getElementsByTagName('tr').length, tr_element = document.getElementById("todo").getElementsByTagName('tr');
	for (var i = 1; i < tr_size; i++) {

		//get the size of td and td
		var td_size = tr_element[i].getElementsByTagName('td').length, td_element = tr_element[i].getElementsByTagName('td');
		
		//use the reg to filter the row
		for (var j = 0; j < td_size; j++) {
			var content = td_element[j].innerHTML.trim();
			var pattern = new RegExp(valueOfInput, "i");

			//replace the content to especial
			if (pattern.test(content)) {
				content = content.toLowerCase();
				content = content.replace(/<\/?[^>]*>/g,''); 
				var afterReplace = content.replace(valueOfInput.toLowerCase(), "<span class=" + "'highlight'" + ">" + valueOfInput.toLowerCase() + "</span>");
				//if the replacement is lowcase then change it to uppercase
				// if (afterReplace == content)
				// 	afterReplace = content.replace(valueOfInput.toUpperCase(), "<span class=" + "'highlight'" + ">" + valueOfInput + "</span>");

				td_element[j].innerHTML = afterReplace;
			}
			if (pattern.test(content) && !has_the_filter_word[i]) {
				has_the_filter_word[i] = 1; //the content to filter are in the row j\
			}
		}
	}
// for (var u = 0; u < 4; u++)
// 	console.log(has_the_filter_word[u]);
	var count = 0; //to correct the tr number after delete the between tr
	//filter the incorrect tr
	for (var j = 1; j < tr_size; j++) {
		if (!has_the_filter_word[j]) {
			var whichRowToDelete = j - count;
			table.deleteRow(whichRowToDelete);
			count++;
		}
	}

}




//filter for staff table
function  filterForStaff() {
	var has_the_filter_word = [0, 0, 0, 0]; //0 is not in the filter and 1 is in

	//get the value of the input
	var valueOfInput = document.getElementById('staff_input').value.trim();
	var table = document.getElementById("staff");

	var tr_size = document.getElementById("staff").getElementsByTagName('tr').length, tr_element = document.getElementById("staff").getElementsByTagName('tr');
	for (var i = 1; i < tr_size; i++) {

		//get the size of td and td
		var td_size = tr_element[i].getElementsByTagName('td').length, td_element = tr_element[i].getElementsByTagName('td');
		
		//use the reg to filter the row
		for (var j = 0; j < td_size; j++) {
			var content = td_element[j].innerHTML;
			var pattern = new RegExp(valueOfInput, "i");

			//replace the content to especial
			if (pattern.test(content)) {
				content = content.toLowerCase();
				content = content.replace(/<\/?[^>]*>/g,''); 
				var afterReplace = content.replace(valueOfInput.toLowerCase(), "<span class=" + "'highlight'" + ">" + valueOfInput.toLowerCase() + "</span>");
				//if the replacement is lowcase then change it to uppercase
				// if (afterReplace == content)
				// 	afterReplace = content.replace(valueOfInput.toUpperCase(), "<span class=" + "'highlight'" + ">" + valueOfInput + "</span>");

				td_element[j].innerHTML = afterReplace;
			}
			
			if (pattern.test(content) && !has_the_filter_word[i]) {
				has_the_filter_word[i] = 1; //the content to filter are in the row j\
				// console.log(has_the_filter_word[i]);
			}
		}
	}

	var count = 0; //to correct the tr number after delete the between tr
	//filter the incorrect tr
	for (var j = 1; j < tr_size; j++) {
		if (!has_the_filter_word[j]) {
			var whichRowToDelete = j - count;
			table.deleteRow(whichRowToDelete);
			count++;
		}
	}
}


//make the table sortable
function makeAllTablesSortable(table) {

    th = document.getElementsByTagName("th");

    th[0].onclick = function() {
        sortTable(0);
    }
    th[1].onclick = function() {
        sortTable(1);
    }
    th[2].onclick = function() {
        sortTable(2);
    }
    th[3].onclick = function() {
        sortTable(3);
    }
    th[4].onclick = function() {
        sortTable(4);
    }
    th[5].onclick = function() {
        sortTable(5);
    }

}

var whichDirectionToPointForTodo = 1,  whichDirectionToPointForStaff = 1; //1 represent the asend. 0 rrepresent the desend
function sortTable(col) {

	//for the todo table
	if (col < 3) {

		var All_title = document.getElementById("todo").getElementsByTagName("th");
		var title_size = All_title.length;
		for (var i = 0; i < title_size; i++) {
			All_title[i].style.background ="blue";
		}
		if (whichDirectionToPointForTodo) {
			event.target.style.background = "no-repeat right bottom url('ascend.png')";
			whichDirectionToPointForTodo = 0;
		} else {
			whichDirectionToPointForTodo = 1;
			event.target.style.background = "no-repeat right bottom url('descend.png')";
		}
		event.target.style.backgroundColor = "#6699FF";


			// document.getElementById("todo").rows[2].parentNode.insertBefore(table.rows[3], table.rows[2]);
		var tr_size = document.getElementById("todo").getElementsByTagName("tr").length, table = document.getElementById("todo");
		var str_to_sort = [],after_sort = [];
		for (var i = 1; i < tr_size; i++) {
			str_to_sort[i - 1] = table.rows[i].cells[col % 3].innerHTML; //remember the precious
			after_sort[i - 1] = table.rows[i].cells[col % 3].innerHTML;
		}

		//if whichDirecttopointfortoodo is 1 then asend
		if (whichDirectionToPointForTodo)
			after_sort.sort();
		else
			after_sort.reverse();

		
		for (var i = 1; i < tr_size; i++) {
			var j;
			for (j = 1; j < tr_size; j++) { //find which  to move to
				if (str_to_sort[j - 1] == after_sort[i -1]) //then it is j
					break;
			}
			//because the movement so the str in str_to_sort should make some adjust
			var temp = str_to_sort[j - 1];
			for (var u = j - 1; u > i - 1; u--)
				str_to_sort[u] = str_to_sort[u - 1];
			str_to_sort[i - 1] = temp; //move the str  in str_to_sort that has been mmoved to the location where it just been moved
			table.rows[i].parentNode.insertBefore(table.rows[j], table.rows[i]);
		}
	} else { //for the staff table

		var All_title = document.getElementById("staff").getElementsByTagName("th");
		var title_size = All_title.length;
		for (var i = 0; i < title_size; i++) {
			All_title[i].style.background ="blue";
		}
		if (whichDirectionToPointForStaff) {
			event.target.style.background = "no-repeat right bottom url('ascend.png')";
			whichDirectionToPointForStaff = 0;
		} else {
			whichDirectionToPointForStaff = 1;
			event.target.style.background = "no-repeat right bottom url('descend.png')";
		}
		event.target.style.backgroundColor = "#6699FF";


			// document.getElementById("todo").rows[2].parentNode.insertBefore(table.rows[3], table.rows[2]);
		var tr_size = document.getElementById("staff").getElementsByTagName("tr").length, table = document.getElementById("staff");
		var str_to_sort = [],after_sort = [];
		for (var i = 1; i < tr_size; i++) {
			str_to_sort[i - 1] = table.rows[i].cells[col % 3].innerHTML; //remember the precious
			after_sort[i - 1] = table.rows[i].cells[col % 3].innerHTML;
		}

		if (whichDirectionToPointForStaff)
			after_sort.sort();
		else
			after_sort.reverse();
		
		for (var i = 1; i < tr_size; i++) {
			var j;
			for (j = 1; j < tr_size; j++) {
				if (str_to_sort[j - 1] == after_sort[i -1])
					break;
			}


			var temp = str_to_sort[j - 1];
			for (var u = j - 1; u > i - 1; u--)
				str_to_sort[u] = str_to_sort[u - 1];
			str_to_sort[i - 1] = temp;

			table.rows[i].parentNode.insertBefore(table.rows[j], table.rows[i]);
		}
	}
}

