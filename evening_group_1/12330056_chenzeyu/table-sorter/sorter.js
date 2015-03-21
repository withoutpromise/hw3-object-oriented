
function getAllTables() {
	var tables = document.getElementsByTagName('table');
	return tables;
}

function makeAllTablesSortable(tables) {
	var index;
	for (index = 0; index < tables.length; index++) {
		makeTableSortable(tables[index]);
	}
}

function makeTableSortable(table) {
	var head = table.rows[0], index;
	var numCol = table.rows[0].cells.length;
	var numRow = table.rows.length;
	var data = getDataFromTable(table, numRow);
	for (index = 0; index < numCol; index++) {
		addEventToTable(table, index, data, head.cells[index]);
		head.cells[index].style.cursor = "pointer";
	}
}

function addEventToTable(table, index, data, th) {
	th.addEventListener("click", function() {
		console.log(index);
		var flag = getFlag(this);
		changeStyle(this, flag);
		sortTable(table, index, data, flag);
		});
}

function getDataFromTable(table, numRow) {
	var item, result = [], index;
	for (index = 1; index < numRow; index++) {
		item = [];
		item = getItemFromRow(table.rows[index]);
		result.push(item);
	}
	return result;
}

function getItemFromRow(infoRow) {
	var result = [], index;
	for (index = 0; index < infoRow.cells.length; index++) {
		result.push(infoRow.cells[index].innerHTML);
	}
	return result;
}

function getFlag(object) {
	// Use regular expression to judge whether to sort ascendingly or descendingly.
	// It is apparently not that rigorous.
	return !(/ascend.png/.test(object.style.backgroundImage));
}

function changeStyle(object, flag) {
	items = object.parentElement.children;
	var index;
	for (index = 0; index < items.length; index++) {
		items[index].style.background = "blue";
		items[index].style.backgroundImage = "none";
	}
	object.style.backgroundColor = "lightskyblue";
	if (flag) {
		object.style.backgroundImage = "url('ascend.png')";
	} else {
		object.style.backgroundImage = "url('descend.png')";
	}
	object.style.backgroundPosition = "center right";
	object.style.backgroundRepeat = "no-repeat";
}

function sortTable(table, index, data, flag) {
	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < data[i].length; j++) {
			console.log(data[i][j]);
		}
	}
	if (flag) {
		data.sort(function(a, b) {return a[index] > b[index];});
	} else {
		data.sort(function(a, b) {return a[index] < b[index];});
	}
	var numCol = table.rows[0].cells.length;
	var numRow = table.rows.length;
	for (var i = 1; i < numRow; i++) {
		for (var j = 0; j < numCol; j++) {
			table.rows[i].cells[j].innerHTML = data[i - 1][j];
		}
	}
}

makeAllTablesSortable(getAllTables());
