var getAllTables = function() {
    return document.getElementsByTagName('table');
};

var makeAllTablesSortable = function(tables) {
    var len = tables.length;
    for (var i = 0; i < len; i++) {
        var ths = tables[i].getElementsByTagName('th');
        var len2 = ths.length;
        for (var j = 0; j < len2; j++) {
            ths[j].onclick = (function(i, j) {
                return function() {
                    sort(tables[i],j);
                    changeStyle(tables[i], j);
                }
            })(i, j);
        }
    }
};

var sort = function(table,thi) {
    var trs = table.getElementsByTagName('tr');
    var tds = [];
    var len3 = trs.length;
    for (var tri = 1; tri < len3; tri++) {
        tds.push(trs[tri].getElementsByTagName('td')[thi]);
    }

    var seq = [], visited = [], needChange = true;
    for (var i = 0; i < tds.length; ++i) {
        var max = "", index;
        for (var j = 0; j < tds.length; ++j) {
            if (tds[j].innerHTML > max && visited[j] !== true) {
                max = tds[j].innerHTML;
                index = j;
            }
        }
        if (index !== i) {
            needChange = false;
        }
        seq.push(index + 1);
        visited[index] = true;
        if (needChange === true ) {
            seq = seq.reverse();
        }
    }

　　// 更改html

    var tbody = document.createElement('tbody');

    for (var index in seq) {
        tbody.appendChild(trs[seq[index]].cloneNode(true));
    }
    table.replaceChild(tbody, table.getElementsByTagName('tbody')[0]);
};

var changeStyle = function(table, thi) {
    var ths = table.getElementsByTagName('th');
    var trs = table.getElementsByTagName('tr');

    if ( ths[thi].className === 'ascending') {
        ths[thi].className = 'descending';
    } else {
        ths[thi].className = 'ascending';
    }
    for (var i = 0; i < ths.length; i++) {
        if (i !== thi) {
            ths[i].className = "";
        }
    }

    var even = false;
    for (var i in trs) {
        for (var i = 1; i < trs.length; i++) {
            if (even == true) {
               trs[i].className = "even";
               even = false;
            } else {
                trs[i].className = "odd";
                even = true;
            }
        }
    }


};

var tables = getAllTables();
makeAllTablesSortable(tables);
