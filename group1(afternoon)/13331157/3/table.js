
window.onload = function() {
    var table1 = document.getElementById("todo");
    var table2 = document.getElementById("staff");

    makeSortable(makeFilterable(table1));
    makeFilterable(makeSortable(table2));
};

function makeSortable(table) {
	var ths = table.getElementsByTagName('th');
	for (var i = 0; i < ths.length; i++) {
		ths[i].onclick = function (i) {    // 使用闭包
            return function() {
                sortFunc(table, i);    // 进行排序
                setStyle(table, i);    // 改变样式
            }
        }(i);
	}
	return table;
};

function makeFilterable(table) {
	var inputNode = document.createElement("input");
    inputNode.type = "text";
    table.parentNode.insertBefore(inputNode, table);   // 添加输入框
    inputNode.oninput = function(event) {              // 为输入框声明过滤函数
        filterFunc(event, table);
    };
	return table;
};

/**
 * sort fuction 排序函数
 */
function sortFunc(table, index) {
    var rows = [];
    var ths = table.getElementsByTagName('th');
    for(var count = 0; count < table.tBodies[0].rows.length; count++)
        rows[count] = table.tBodies[0].rows[count];

    var currentClass = ths[index].className;
    rows.sort(function(row1, row2) {    // 对rows[]数组进行排序，使用数组的sort方法
        var str1 = row1.cells[index].innerHTML;
        var str2 = row2.cells[index].innerHTML;
        if (currentClass == '' || currentClass == 'descend-style') {
            return str1.localeCompare(str2);
        } else {
            return str2.localeCompare(str1);
        }
    });

    for(var count = 0; count < rows.length; count++) // 将rows[]的添加为table.tBodies[0]子节点
        table.tBodies[0].appendChild(rows[count]);
};

/**
 * filter function 过滤函数
 */
function filterFunc(e, table) {
    var value = e.target.value;
    var rows = table.tBodies[0].rows;
    for (var i = 0; i < rows.length; i++) {     // 令表格的每一行可见
        rows[i].style.display = 'table-row';
    }

    var isFound = false;
    for (var i = 0; i < rows.length; i++) {
        isFound = false;
        for (var j = 0; j < rows[i].cells.length; j++) {
            var text = rows[i].cells[j].innerText;    // 获取innerTExt, 去除添加的样式
            var position = text.indexOf(value);
            if (position >= 0) {
                var style = "<span class='highLight'>"+value+"</span>";
                var html = text.replace(value, style);
                rows[i].cells[j].innerHTML = html;
                isFound = true;
            } else {
                rows[i].cells[j].innerHTML = text;
            }
        }
        if (!isFound) {   // 如果无法匹配，将本行设置为不可见
            rows[i].style.display = "none";
        }
    }
    setAlternate(table);
};

/**
 * change the style of the table
 */
function setStyle(table, index) {
    var ths = table.getElementsByTagName('th');
    var rows = table.tBodies[0].rows;
    for (var i = 0; i < ths.length; i++) {
        if (i == index) {
            if (ths[i].className == '' || ths[i].className == 'descend-style')
                ths[index].className = 'ascend-style';
            else
                ths[index].className = 'descend-style';
        } else {
            ths[i].className = '';
        }
    }
    setAlternate(table);
};
/**
 * set the stwyle of alternate rows
 */
function setAlternate(table) {
	var rows = table.tBodies[0].rows;
    var count = 0;
    for (var i = 0; i < rows.length; i++) {
        rows[i].className = '';
        var count = 0;
        for (var j = i-1; j >= 0; j--) {
            if (rows[j].style.display == 'none') {
                count++;
            }
        }
        if (i%2 == ((count%2)+1)%2 ) {
            rows[i].className = 'alternate';
        }
    }
};


