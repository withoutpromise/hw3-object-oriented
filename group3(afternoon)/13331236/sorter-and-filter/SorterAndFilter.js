/*13331236 谭笑*/
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(makeAllTablesFilterable(tables));
}

var getAllTables = function() {
    return document.getElementsByTagName("table");
}

var makeAllTablesSortable = function(tables) {
    for (var i = 0; i < tables.length; i++) {
        makeSortable(tables[i]);
    }
    return tables;
}

var makeAllTablesFilterable = function(tables) {
    for (var i = 0; i < tables.length; i++) {
        makeFilterable(tables[i]);
    }
    return tables;
}

var makeSortable = function(table) {
    var columnList = table.getElementsByTagName("th");
    var columnNumbers = columnList.length;
    var ascendImg = document.createElement("img"), descendImg = document.createElement("img");
    ascendImg.setAttribute("src", "ascend.png");
    descendImg.setAttribute("src", "descend.png");
    ascendImg.setAttribute("id", "ascend");
    descendImg.setAttribute("id", "descend");

    for (var c = 0; c < columnNumbers; c++) {
        (function(_c) {
            columnList[_c].onclick = function() {
                var rows = table.tBodies[0].rows;
                var rowList = new Array();
                var rowListSize = 0;
                var tHead;
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].getElementsByTagName("th").length != 0) {
                        tHead = rows[i];
                    } else {
                        rowList[rowListSize] = rows[i];
                        rowListSize++;
                    }
                }
                rowList.sort(ascendSort(_c));  // 先进行排序
                if (columnList[_c].className == "ascend") {  // 已经从小到大排序时
                    for (var j = 0; j < columnNumbers; j++) {
                        columnList[j].className = "";
                        var image = document.getElementById("ascend");
                        if (image != undefined) {
                            image.parentNode.removeChild(image);
                        }
                    }
                    this.className = "descend";
                    this.appendChild(descendImg);
                    rowList.reverse();
                } else {  // 从大到小排序时或未排序时
                    for (var j = 0; j < columnNumbers; j++) {
                        columnList[j].className = "";
                        var image = document.getElementById("descend");
                        if (image != undefined) {
                            image.parentNode.removeChild(image);
                        }
                    }
                    columnList[_c].className = "ascend";
                    columnList[_c].appendChild(ascendImg);
                }
                //清空原有table的各行
                var rowNumbers = rows.length;
                for (var i = 0; i < rowNumbers; i++) {
                    table.tBodies[0].removeChild(rows[0]);
                }
                //更新table的各行
                var newHead = document.createElement("tr");
                if (tHead != undefined) {
                    newHead = tHead;
                    table.tBodies[0].appendChild(newHead);
                }
                for (var i = 0; i < rowListSize; i++) {
                    var newRow = document.createElement("tr");
                    newRow = rowList[i];
                    table.tBodies[0].appendChild(newRow);
                }
                //偶数行高亮表示
                highlight(table.tBodies[0]);
            }
        })(c);
    }
    return table;
}

var makeFilterable = function(table) {
    if (table.getElementsByTagName("input")[0] == undefined) {
        var originalTable = new Array(table.tBodies[0].rows.length);
        for (var i = 0; i < table.tBodies[0].rows.length; i++) {
            originalTable[i] = table.tBodies[0].rows[i];
        }
        // 输入框
        var inputArea = document.createElement("input");
        inputArea.setAttribute("name", "filter");
        inputArea.setAttribute("type", "text");
        inputArea.setAttribute("size", "20");

        // 重置按钮
        var restore = document.createElement("input");
        restore.setAttribute("name", "restore");
        restore.setAttribute("type", "submit");
        restore.setAttribute("value", "Restore");

        // 添加节点
        var inputTr = document.createElement("tr");
        var inputTd = document.createElement("td");
        var inputTfoot = document.createElement("tfoot");
        inputTd.setAttribute("colspan", "3");
        table.appendChild(inputTfoot);
        inputTfoot.appendChild(inputTr);
        inputTr.appendChild(inputTd);
        inputTd.appendChild(document.createTextNode("Enter Keywords: "));
        inputTd.appendChild(inputArea);
        inputTd.appendChild(restore);

        // 输入框内值改变时触发事件
        inputArea.oninput = function() {
            restoreTable();
            var keywords = inputArea.value;
            var rows = table.tBodies[0].rows;
            var rowNumbers = rows.length;
            if (rowNumbers == 0) {
                return;
            }
            var columnNumbers = rows[0].cells.length;
            var matchedRows = new Array();
            var matchedNumber = 0;
            for (var row = 0; row < rows.length; row++) {
                var matched = false;
                var newRow;
                var newCells = new Array(columnNumbers);
                for (var col = 0; col < columnNumbers; col++) {
                    var text = rows[row].cells[col].innerHTML;
                    if (typeof text == "string") {
                        var sp = text.split(keywords);
                        if (sp.length != 1) {
                            matched = true;
                        }
                        var newCell = document.createElement("td");
                        for (var i = 0; i < sp.length - 1; i++) {
                            var t = document.createTextNode(sp[i]);
                            newCell.appendChild(t);
                            var em = document.createElement("em");
                            em.className = "match";
                            var kw = document.createTextNode(keywords);
                            em.appendChild(kw);
                            newCell.appendChild(em);
                        }
                        newCell.appendChild(document.createTextNode(sp[sp.length - 1]));
                        newCells[col] = newCell;
                    }
                }
                if (matched) {
                    var newRow = document.createElement("tr");
                    for (var i = 0; i < newCells.length; i++) {
                        newRow.appendChild(newCells[i]);
                    }
                    matchedRows[matchedNumber] = newRow;
                    matchedNumber++;
                }
            }
            for (var row = 0; row < rowNumbers; row++) {
                table.tBodies[0].removeChild(rows[0]);
            }
            for (var row = 0; row < matchedRows.length; row++) {
                table.tBodies[0].appendChild(matchedRows[row]);
            }
            highlight(table.tBodies[0]);
        }

        // 重置表格
        var restoreTable = function() {
            var r = table.tBodies[0].rows.length;
            for (var i = 0; i < r; i++) {
                table.tBodies[0].deleteRow(0);
            }
            for (var i = 0; i < originalTable.length; i++) {
                table.tBodies[0].appendChild(originalTable[i]);
            }
        }

        // 按下restore按钮之后清空输入并重置表格
        restore.onclick = function() {
            restoreTable();
            inputArea.value = "";
        };
    }
    return table;
}

var ascendSort = function(col) {
    return function (val1, val2) {
        var x1 = val1.getElementsByTagName("td")[col].innerHTML;
        var x2 = val2.getElementsByTagName("td")[col].innerHTML;
        //当表格中含有元素节点时先把标签清除再进行比较
        x1 = x1.replace(/<[^><]+>/g , "");
        x2 = x2.replace(/<[^><]+>/g , "");
        //当表格中有数字时
        if (x1.match("%") && x2.match("%")) { //百分数
            x1 = parseFloat(x1);
            x2 = parseFloat(x2);
        }
        if (!isNaN(x1) && !isNaN(x2)) {
            x1 = Number(x1);
            x2 = Number(x2);
        }
        if (x1 < x2) {
            return -1;
        } else if (x1 > x2) {
            return 1;
        } else {
            return 0;
        }
    };
}

var highlight = function(tBody) {
    var rowLength = tBody.rows.length;
    for (var i = 0; i < rowLength; i++) {
        tBody.rows[i].className = "";
    }
    for (var i = 1; i < rowLength; i += 2) {
        if (tBody.rows[i].getElementsByTagName("th").length != 0) {
            i++;
        }
        tBody.rows[i].className = "alternate";
    }
}
