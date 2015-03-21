window.onload = function() {
	var tables = getALLTables();
	makeAllTablesSorttable(tables);
    makeAllTablesFilterable(tables);
}