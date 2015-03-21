"use strict";

window.onload = function () {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
};

//嵌入的话用下面两行..
// var tables = getAllTables();
// makeAllTablesFilterable(tables);
function getAllTables() {
    return document.getElementsByTagName("table");
}

//高亮显示
function heightlight(node, keyword) {
    node.innerHTML = node.innerHTML.replace(new RegExp(keyword,"g"),"<span class='heightlight'>"+keyword+"</span>");
}

//清除高亮
function clearHeightlight(node) {
    node.innerHTML = node.innerHTML.replace(/<span class=\"heightlight\">/g, "").replace(/<\/span>/g, "");
}

//恢复显示
function showAllTr(table) {
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) {
        tr[i].hidden = false;
    }
}

//让列表变得可能够过滤
function makeFilterable(table) {
    var input = document.createElement("input");

    input.oninput  = function() {
        clearHeightlight(table);
        showAllTr(table);

        //过滤词为空则直接返回
        if (!this.value)
            return;
        for (var i = 1; i < table.getElementsByTagName("tr").length; i++) {
            var tr = table.getElementsByTagName("tr")[i];
            //查找是否含有关键字,不含有则隐藏
            if ( tr.innerHTML.indexOf(this.value) == -1) {
                 tr.hidden = true;
                continue;
            }
            for (var j = 0; j <  tr.cells.length; j++)
                heightlight(tr.cells[j], this.value);
        }
    };
    table.parentNode.insertBefore(input,table);
    return table;
}

function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++)
        makeFilterable(tables[i]);
}
