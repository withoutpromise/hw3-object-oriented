function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeSortable(table) {
    function sort(table, thid) {
        var ths, x;
        var thead = table.getElementsByTagName("thead");
        if (thead[0]) {
            ths = thead[0].getElementsByTagName("th");
            x = 0;
        } else {
            var trs = table.getElementsByTagName("tr");
            ths = trs[0].getElementsByTagName("td");
            x = 1;
        }
        var dir = !!ths[thid].className.match(RegExp('(\\s|^)ascend(\\s|$)'));
        var tbody = table.getElementsByTagName("tbody");
        var trs = tbody[0].getElementsByTagName("tr");
        var tds = new Array(trs.length);
        var temp;
        for (i = trs.length - 1; i >= 0; --i)
            tds[i] = trs[i].getElementsByTagName("td");
        var flag = true;
        for (i = trs.length - 1; i > x && flag; --i) {
            flag = false;
            for (j = x; j < i; ++j)
                if (tds[j][thid].innerHTML > tds[j + 1][thid].innerHTML ^ dir) {
                    flag = true;
                    for (k in tds[j]) {
                        temp = tds[j][k].innerHTML;
                        tds[j][k].innerHTML = tds[j + 1][k].innerHTML;
                        tds[j + 1][k].innerHTML = temp;
                    }
                }
        }
        for (i = ths.length - 1; i >= 0; --i)
            ths[i].className = ths[i].className.replace(RegExp('(\\s|^)((ascend)|(descend))(\\s|$)'), '');
        if (dir)
            ths[thid].className += " descend";
        else
            ths[thid].className += " ascend";
    }
    var thead = table.getElementsByTagName("thead");
    var ths, i;
    if (thead[0]) {
        ths = thead[0].getElementsByTagName("th");
    } else {
        var trs = table.getElementsByTagName("tr");
        ths = trs[0].getElementsByTagName("td");
    }
    for (i = ths.length - 1; i >= 0; --i)
        ths[i].onclick = function (i) {
            return function () {
                sort(table, i);
            }
        }(i);

    return table;
}

function makeAllTablesSortable(tables) {
    for (var index = tables.length - 1; index >= 0; --index) {
        makeSortable(tables[index]);
    }
}

window.onload = function () {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
    makeAllTablesFilterable(tables);
}
