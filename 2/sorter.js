/*
  ekuri wrote this sorter.js on 2015-3-11
  this js try to sort the data of a table to ascend or descend order
  laterly written on 2015-3-13
*/

window.onload = function () {
	var tables = getAllTables();
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
		var newRow = tableObj.insertRow(tableObj.rows.length);
		for (var count = 0; count < dataArray[0].length; count++)
			newRow.insertCell(count);
	}
	for (var count = 1; count < tableObj.rows.length; count++) {
		for (var temp = 0; temp < tableObj.rows[0].cells.length; temp++) {
			tableObj.rows[count].cells[temp].innerHTML = dataArray[count - 1][temp];
		}
	}
}
