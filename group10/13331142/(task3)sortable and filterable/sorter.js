window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(makeAllTablesFilterable(tables));
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var ths = tables[i].getElementsByTagName("th");
        for (var j = 0; j < ths.length; j++) {
            ths[j].onclick = function(i, j) {
                return function() {
                    sortTable(tables[i], j);
                    if (tables[0].id == "todo") {  //因为要兼容其他网页的表格，如果不是作业网页则不改变样式
                        titleBackground(tables[i], j);
                    }
                };
            }(i, j);  // 这里因为闭包的一些影响，用一个自执行函数，避免i,j的值始终为length;
        }
    }
    return tables;
}

function sortTable(Itable, Icol) {
    var tbody = Itable.tBodies[0];
    var tr = Itable.getElementsByTagName('tr');

    var trValue = new Array();
    for (var i=1; i<tr.length; i++ ) {  //这里第一个tr是表头，不改变
        trValue[i-1] = tr[i];
    }

    if (tbody.sortCol == Icol) {
        trValue.reverse();
    } else {
        trValue.sort(function(tr1, tr2) {
            var value1 = tr1.cells[Icol].innerHTML;
            var value2 = tr2.cells[Icol].innerHTML;
            return value1.localeCompare(value2);
        });
    }  
    var fragment = document.createDocumentFragment();
    for (var i=0; i<trValue.length; i++ ) {
        fragment.appendChild(trValue[i]);
    }
    tbody.appendChild(fragment);
    tbody.sortCol = Icol;
}

//进行样式的修改
function titleBackground(Itable, Icol) {
    contentBackground(Itable);
    var ths = Itable.getElementsByTagName("th");
    for (var i = 0; i < ths.length; i++) {
        if (i == Icol) {
            if (ths[i].className == ""||ths[i].className == "downSort") {
                ths[i].className = "upSort";
            } else if (ths[i].className == "upSort") {
                ths[i].className = "downSort";
            }
        } else {
            ths[i].className = "";
        }
    }
}

// 修改内容背景色
function contentBackground(Itable) {
    var tr = Itable.getElementsByTagName('tr');
    var trN = 1;
    for (var i = 1; i < tr.length; i++) {
        if (tr[i].style.display == "") {  //要把被隐藏的行排除在背景色设置之外
            if (trN%2 == 0) {
                tr[i].className = "alternate";
            } else {
                tr[i].className = "";
            }
            trN++;
        }
    }
}

function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        makeFilterable(tables[i]);
    }
    return tables;
}

function makeFilterable(Itable) {
    var input = document.createElement("input");
    input.placeholder = "Search";
    input.addEventListener("input", myFilter);
    Itable.appendChild(input); // 每个table后添加已添加一个filter事件的输入框
}

function myFilter() {
    var table = this.parentNode;
    tableReset(table);
    var tr = table.getElementsByTagName("tr");
    var Input = this.value;
    for (var i = 1; i < tr.length; i++) {
        for (var j = 0; j < tr[i].cells.length; j++) {
            Istring = tr[i].cells[j].innerHTML;
            if (Istring.indexOf(Input) > -1) {
                contentStress(tr[i], Input);
                tr[i].style.display = "";
                break;
            }
            if (j == tr[i].cells.length-1)
                tr[i].style.display = "none";
        }
    }
    contentBackground(table)
}

// 将添加的span全部去除
function tableReset(table) {
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) {
        for (var j = 0; j < tr[i].cells.length; j++) {
            var string = tr[i].cells[j].innerHTML;
            var parts = string.split('<span class="stress">');
            string = parts.join('');
            parts = string.split('<span>');
            tr[i].cells[j].innerHTML = parts.join('');
        }
    }
}

// 找到的字符进行强调
function contentStress(tr, Input) {
    for (var i = 0; i < tr.cells.length; i++) {
        var string = tr.cells[i].innerHTML;
        var parts = string.split(Input);
        tr.cells[i].innerHTML = parts.join('<span class="stress">'+Input+'</span>');
    }
}
