window.onload = function() {
    var tables = getAllTables();
        //makeSortable(makeFilterable(tables[i]));
        makeAllTablesSortable(makeAllTablesFilterable());
        // makeFilterable(makeSortable(tables[i]));

}
