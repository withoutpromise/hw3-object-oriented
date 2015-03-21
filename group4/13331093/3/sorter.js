"use strict";

window.onload = function () {
    var tables = getAllTables();
    makeAllTablesFilterableAndSortable(tables);
};

//嵌入的话用下面两行..
// var tables = getAllTables();
// makeAllTablesFilterableAndSortable(tables);
function getAllTables() {
    return document.getElementsByTagName("table");
}

//让列表变得可排序
function makeSortable(table) {
    var th = table.getElementsByTagName("th");
    for (var i = 0; i < th.length; i++) {
        //绑定按钮事件
        th[i].onclick = function () {
            var index = 0;
            changeStyle(th, this);
            //找出索引值
            for (var j = 0; j < th.length; j++) {
                if (this == th[j])
                    index = j;
            }
            //根据表头进行排序
            sortByTh(table, index, this.className);
        };
    }
    return table;
}

//改变样式
function changeStyle(th, t) {
    for (var i = 0; i < th.length; i++) {

        if (th[i] == t) {

            if (th[i].className.indexOf("descend") != -1 )
                th[i].className = th[i].className.replace("descend", "ascend");
            else if (th[i].className.indexOf("ascend") != -1 )
                th[i].className = th[i].className.replace("ascend", "descend");
            else
                th[i].className += " descend";

        } else {
            th[i].className = th[i].className.replace("descend", "");
            th[i].className = th[i].className.replace("ascend", "");
        }
    }
}

//排序
function sortByTh(table, index, className) {
    var action = className.indexOf("descend") != -1 ? "descend" : "ascend";
    var array = [];

    for (var i = 1; i < table.getElementsByTagName("tr").length; i++)
        array[i-1] = table.getElementsByTagName("tr")[i];

    array.sort(function (a, b) {
        //升序
        if (action == 'descend') {
            return a.cells[index].innerHTML <= b.cells[index].innerHTML;
        } else {
        //降序
            return a.cells[index].innerHTML >= b.cells[index].innerHTML;
        }
    });

    for (var i = 0; i < array.length; i++)
        table.getElementsByTagName("tbody")[0].appendChild(array[i]);

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
        makeSortable(table);
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

function makeAllTablesFilterableAndSortable(tables) {
    for (var i = 0; i < tables.length; i++)
        makeFilterable(makeSortable(tables[i]));
}
