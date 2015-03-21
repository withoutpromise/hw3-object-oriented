//get All tables in the page
function getAllTables() {
	return tables = document.getElementsByTagName("table");
}

window.onload = function() {
	var tables = getAllTables();
	for (var i = 0; i < tables.length; i++) {
		makeSortable(makeFilterable(tables[i]));
	}
}