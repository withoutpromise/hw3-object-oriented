window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFliterable(tables);
}

function getAllTables() {
    var table_arr = document.getElementsByTagName("table");
    return table_arr;
}

function makeAllTablesFliterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var input = document.createElement('input');
        input.addEventListener('change', show(tables[i]), true);
        tables[i].appendChild(input);
    };
};

function show(table) {
    return function() {
        var str = this.value;
        var span_str = '<span>' + str + '</span>';
        var body_row = table.tBodies[0].rows;
        for (var i = 0; i < body_row.length; i++) {
            body_row[i].innerHTML = body_row[i].innerHTML.replace(new RegExp('<span>'), '');
            body_row[i].innerHTML = body_row[i].innerHTML.replace(new RegExp('</span>'), '');
            if (str == '') {
                body_row[i].style.display = '';
                continue;
            }
            if (body_row[i].cells[0].innerHTML.indexOf(str) >= 0 || body_row[i].cells[1].innerHTML.indexOf(str) >= 0 || body_row[i].cells[2].innerHTML.indexOf(str) >= 0) {
                body_row[i].style.display = '';
                for (var j = 0; j < body_row[i].cells.length; j++) {
                    if (body_row[i].cells[j].innerHTML.indexOf(str) >= 0) {
                        body_row[i].cells[j].innerHTML = body_row[i].cells[j].innerHTML.replace(new RegExp(str), span_str);
                    }
                };
            } else {
                body_row[i].style.display = 'none';
            }
        };
    }
}