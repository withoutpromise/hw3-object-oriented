/**
 * FileName: filter.js;
 * Author: linyiting;
 */

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
};

function getAllTables() {
    return document.getElementsByTagName('table');
};

function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        makeTableFilterable(tables[i]);
    }
};

function makeTableFilterable(table) {
    var inputNode = document.createElement("input");
    inputNode.type = "text";
    table.parentNode.insertBefore(inputNode, table);   // 添加输入框
    inputNode.oninput = function(event) {              // 为输入框声明过滤函数
        filterFunc(event, table);
    };
};

/**
 * filter function
 */
function filterFunc(e, table) {
    var value = e.target.value;
    var rows = table.tBodies[0].rows;
    for (var i = 0; i < rows.length; i++) {      // 令表格的每一行可见
        rows[i].style.display = 'table-row';
    }

    var isFound = false;
    for (var i = 0; i < rows.length; i++) {
        isFound = false;
        for (var j = 0; j < rows[i].cells.length; j++) {
            var text = rows[i].cells[j].innerText;    // 获取innerTExt, 去除添加的样式
            var position = text.indexOf(value);
            if (position >= 0) {
                var style = "<span class='highLight'>"+value+"</span>";    // 修改样式
                var html = text.replace(value, style);
                rows[i].cells[j].innerHTML = html;
                isFound = true;
            } else {
                rows[i].cells[j].innerHTML = text;
            }
        }
        if (!isFound) {   //如果无法匹配，将本行设置为不可见
            rows[i].style.display = "none";
        }
    }
};
