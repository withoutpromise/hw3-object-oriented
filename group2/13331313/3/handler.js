window.onload = function() {
	var tables = getALLTables();
	makeAllTablesSorttable(tables);
    makeAllTablesFilterable(tables);
}

/*
这个文件并没有被html所引用
*/
