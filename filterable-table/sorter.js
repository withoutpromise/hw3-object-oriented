/*
  ekuri wrote this sorter.js on 2015-3-11
  this js try to sort the data of a table to ascend or descend order
  laterly written on 2015-3-13
*/

window.onload = function () {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
	makeAllTablesFilterable(tables);
};

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeFilterable(targetTable) {
	var textInput = document.createElement("input");
		textInput.type = "text";
		targetTable.appendChild(textInput);
		textInput.onkeydown = function(textInput) {
			return function() {
				filterTable(textInput);
			}
		}(textInput);
	return targetTable;
}

var tablesData = new Array();
function makeAllTablesFilterable(tables) {
	for (var count = 0; count < tables.length; count++) {
		tablesData[count] = getArray(tables[count]);
		makeFilterable(tables[count]);
	}
}

function initTable(targetTable) {
	var tables = getAllTables();
	for (var count = 0; count < tables.length; count++) {
		if (targetTable == tables[count])
			updateTableData(targetTable, tablesData[count]);
	}
}

function filterTable(targetInput) {
	if (event.keyCode == 13) {
		initTable(targetInput.parentNode);
		var dataArray = getArray(targetInput.parentNode);
		for (var count = dataArray.length - 1; count >= 0; count--) {
			var temp = 0;
			for (; temp < dataArray[count].length; temp++) {
				if (dataArray[count][temp].match(targetInput.value))
					break;
			}
			if (temp == dataArray[count].length)
				targetInput.parentNode.deleteRow(count + 1);
		}
	}
}

function makeAllTablesSortable(tables) {
	for (var count = 0; count < tables.length; count++) {
		makeSortable(tables[count]);
	}
}

function makeSortable(targetTable) {
	for (var count = 0; count < targetTable.rows[0].cells.length; count++) {
		targetTable.rows[0].cells[count].onclick = function(targetTablePara, countPara) {
			return function() {
				sortTable(targetTablePara, countPara)
			}
		}(targetTable, count);
	}
	return targetTable;
}

  // the main function that sort the table, colume is the colume of the table that being selected
function sortTable(target, colume)
{
  
  // set initial backgroundColor of all heads of the table
  // because the color should be changed only when it was selected
  for (var count = 0; count < target.rows[0].cells.length; count++) {
	  target.rows[0].cells[count].style.backgroundColor = "#000077";
  }
  
  // get the th child which is selected
  var targetChild = target.rows[0].cells[colume];
  // change the backgroundColor of selected th to shallow blue
  targetChild.style.backgroundColor = "#AAAAFF";
  
  // record and find the state of order, descend or ascend
  var descend;
  if (targetChild.style.backgroundImage.match("ascend")) {
	  targetChild.style.backgroundImage = "url('descend.png')";
	  descend = true;
  } else {
	  targetChild.style.backgroundImage = "url('ascend.png')";
	  descend = false;
  }
  
  // set backgroundImage to right top of th and no repeat
  // note that image will auto repeat if the it is not big enough
  targetChild.style.backgroundPosition = "right top";
  targetChild.style.backgroundRepeat = "no-repeat";
  
  // get the data in the table and store it into an array
  var arr = getArray(target);
  
  // sort the data in the array
  sortData(arr, colume, descend);
  
  // write data back to the table
  updateTableData(target, arr);
}

  // the function below try to get the data in the table
  // the data will store in an array which will be returned
function getArray(target) {
	var arr = new Array();
	for (var count = 1; count < target.rows.length; count++) {
		var row = new Array();
		for (var temp = 0; temp < target.rows[count].cells.length; temp++) {
			row[temp] = target.rows[count].cells[temp].innerHTML;
		}
		arr[count - 1] = row;
	}
	return arr;
}

  // the function below will write the data in the given array to the given table
  // the data in the table will be overwritten
function updateTableData(tableObj, dataArray) {
	while (tableObj.rows.length <= dataArray.length) {
		var newRow = tableObj.insertRow(1);
		for (var count = 0; count < dataArray[0].length; count++)
			newRow.insertCell(count);
	}
	for (var count = 1; count < tableObj.rows.length; count++) {
		for (var temp = 0; temp < tableObj.rows[0].cells.length; temp++) {
			tableObj.rows[count].cells[temp].innerHTML = dataArray[count - 1][temp];
		}
	}
}

  // the function below will sort the data in the given array to given order
  // the order should be ascend (method == false) or descend (method == true)
  // colume is the colume of the table that need to be compared
function sortData(arr, colume, method) {
	var flag;
	
	// selection sort
	for (var count = 0; count < arr.length; count++) {
		flag = count;
		var tempRow;
		for (var temp = count; temp < arr.length; temp++) {
			if (method) {
				if (arr[flag][colume] < arr[temp][colume])
				flag = temp;
			} else {
				if (arr[flag][colume] > arr[temp][colume])
				flag = temp;
			}
		}
		
		// swap data
		tempRow = arr[flag];
		arr[flag] = arr[count];
		arr[count] = tempRow;
	}
}