// init
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}

function getAllTables() {
    var tables = document.getElementsByTagName('table');
    return tables;
}

function addEvent(element, event, handler) {
    if (element.addEventListener) {
        element.addEventListener(event, handler, false);
    } else {
        // for IE 8-
        element.attachEvent('on' + event, handler);
    }
}

function makeAllTablesFilterable(tables) {

    for (var i = 0; i < tables.length; ++i) {
        var input = document.createElement('input');
        tables[i].parentNode.insertBefore(input, tables[i]);
        input.oninput = addEvent(input, 'input', filterRows(tables[i]));
    }
}

function filterRows(table) {
    return function() {
        var target = this.value;
        var trs = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (var tr = 0; tr < trs.length; ++tr) {
            var cells = trs[tr].getElementsByTagName('td');
            var flag = false;
            for (var td = 0; td < cells.length; ++td) {
                var text = cells[td].innerHTML.replace('<span class="filter">', "");
                text = text.replace('</span>', "");
                if (text.indexOf(target) != -1) {
                    var span = "<span class='filter'>" + target + "</span>";
                    cells[td].innerHTML = text.replace(target, span);
                    flag = true;
                } else {
                    cells[td].innerHTML = text;
                }
            }
            if (!flag) {
                table.getElementsByTagName('tbody')[0].deleteRow(tr);
            }
        }
    };
}
