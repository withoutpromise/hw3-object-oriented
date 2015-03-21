function makeFilterable(table) {
    function filter(table, str) {
        var trs = table.getElementsByTagName("tr");
        var tds = new Array(trs.length);
        var flag;
        var result;
        for (i = trs.length - 1; i >= 0; --i) {
            flag = false;
            trs[i].className = trs[i].className.replace(RegExp('(\\s|^)(filter-nodisplay)(\\s|$)', ''))
            tds[i] = trs[i].getElementsByTagName("td");
            for (j = tds[i].length - 1; j >= 0; --j) {
                tds[i][j].innerHTML = tds[i][j].innerHTML.replace(RegExp('\<(\/)?mark\>'), '')
                result = tds[i][j].innerHTML.match(RegExp(str));
                if (result) {
                    flag = true;
                    for (k = result.length - 1; k >= 0; --k)
                        tds[i][j].innerHTML = tds[i][j].innerHTML.replace(RegExp(result[k]), "<mark>" + result[k] + "</mark>");
                }
            }
            if (!flag) {
                trs[i].className += ' filter-nodisplay';
            }
        }
    }
    var inputbox = document.createElement("input");
    inputbox.type = 'text';
    inputbox.className = 'filter-box';
    table.parentNode.insertBefore(inputbox, table);
    inputbox.oninput = function (table) {
        return function () {
            filter(table, inputbox.value);
        }
    }(table);
    return table;
}

function makeAllTablesFilterable(tables) {
    for (var index = tables.length - 1; index >= 0; --index)
        makeFilterable(tables[index]);
}