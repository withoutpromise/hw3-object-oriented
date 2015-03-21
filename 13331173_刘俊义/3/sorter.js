window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(makeAllTablesFliterable(tables));
}

function getAllTables() {
    var table_arr = document.getElementsByTagName("table");
    return table_arr;
}


function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var body = tables[i];
        k = 0;
        sortCol = -1;


        if (body.tHead != null) {
            for (var j = 1; j < body.tBodies[0].rows.length; j = j + 2) {
                body.tBodies[0].rows[j].style.backgroundColor = 'lightgray';
            };
        } else {
            for (var j = 2; j < body.tBodies[0].rows.length; j = j + 2) {
                body.tBodies[0].rows[j].style.backgroundColor = 'lightgray';
            };
        }

        for (var m = 0; m < body.getElementsByTagName('th').length; m++) {
            body.getElementsByTagName('th')[m].onclick = sort(body, m)
        };
    };
}


function sort(table_, iCol) {
    return function() {
        var sortTable = table_;
        for (var j = 0; j < sortTable.tBodies[0].rows.length; j++) {
            sortTable.tBodies[0].rows[j].style.backgroundColor = 'white';
        };

        for (var i = 0; i < this.parentNode.cells.length; i++) {
            this.parentNode.cells[i].style.backgroundImage = "";
        };


        var sortBody = sortTable.tBodies[0];
        var rows = sortBody.rows; // 引用
        var arr = new Array();

        if (sortTable.tHead != null) {
            for (var i = 0; i < rows.length; i++) {
                arr.push(rows[i]);
            };
        } else {
            for (var i = 1; i < rows.length; i++) {
                arr.push(rows[i]);
            };
        }


        if (sortCol == iCol) {
            arr.reverse();
        } else {
            if (k % 2 == 0) { // 升序
                arr.sort(Compare(iCol));
            } else {
                arr.sort(Compare1(iCol));
            }
        }

        k++;
        if (k % 2 == 1) {
            this.style.backgroundImage = "url(ascend.png)";
        } else {
            this.style.backgroundImage = "url(descend.png)";
        }

        var oFragment = document.createDocumentFragment(); // 创建文档碎片
        for (var i = 0; i < arr.length; i++) {
            oFragment.appendChild(arr[i]);
        };
        sortBody.appendChild(oFragment); // ************
        sortCol = iCol;

        if (sortTable.tHead != null) {
            for (var j = 1; j < sortTable.tBodies[0].rows.length; j = j + 2) {
                sortTable.tBodies[0].rows[j].style.backgroundColor = 'lightgray';
            };
        } else {
            for (var n = 2; n < sortTable.tBodies[0].rows.length; n = n + 2) {
                sortTable.tBodies[0].rows[n].style.backgroundColor = 'lightgray';
            };
        }
    }
}

function Compare(iCol) {
    return function CompareTRs(oTR1, oTR2) {
        var value1 = convert(oTR1.cells[iCol].firstChild.nodeValue);
        var value2 = convert(oTR2.cells[iCol].firstChild.nodeValue);
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }
}

function Compare1(iCol) {
    return function CompareTRs(oTR1, oTR2) {
        var value1 = convert(oTR1.cells[iCol].firstChild.nodeValue);
        var value2 = convert(oTR2.cells[iCol].firstChild.nodeValue);
        if (value1 > value2) {
            return -1;
        } else if (value1 < value2) {
            return 1;
        } else {
            return 0;
        }
    }
}

function convert(value) {
    return value.toString();
}



//makeAllTablesFliterable
function makeAllTablesFliterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var input = document.createElement('input');
        input.addEventListener('change', show(tables[i]), true);
        tables[i].appendChild(input);
    };
    return tables;
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