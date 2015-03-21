// 在载入页面的时候将所有表格可排序化、过滤化
window.onload = function () {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
    makeAllTablesFilterable(tables);
}

// 判断是否IE浏览器
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}

// 获取一个包含所有表格的列表
function getAllTables() {
    return document.getElementsByTagName('table');
}

// 将列表里的所有表格可排序化
function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; i++) {
        table = tables[i];

        // -1 代表尚未进行排序
        table.setAttribute('sortColId', '-1');  // 哪一列排序，0，1，2...
        table.setAttribute('sortTypeId', '-1');  // 排序的类型，0-升序，1-降序

        makeSortable(table);
        colorlize(table);
    }
}

// 将列表里的所有表格可过滤化
function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        table = tables[i];
        makeFilterable(table);
        table.setAttribute('original', table.getElementsByTagName('tbody')[0].innerHTML);
    }
}

// 将table可排序化并将可排序的table返回
function makeSortable(table) {
    ths = table.getElementsByTagName('th');

    for (var i = 0; i < ths.length; i++) {
        th = ths[i];

        // add a span for holding little triangle
        img_span = document.createElement('span');
        img_span.style.marginLeft = '10px';
        img_span.style.styleFloat = 'right';
        th.appendChild(img_span);

        // banding onClick function
        th.setAttribute('onClick', 'sortTable(this, ' + i + ')');
    }

    return table;
}

// 根据th元素以及列id对表格进行排序
function sortTable(th, sortColId) {
    table = th.parentNode.parentNode.parentNode;
    ths = table.getElementsByTagName('th');
    rows = table.getElementsByTagName('tr');
    currentSortColId = table.getAttribute('sortColId');
    currentSortTypeId = table.getAttribute('sortTypeId');

    // 用来储存新的排好序的表格行
    var rowsArray = new Array();
    for (var i = 0; i < rows.length - 1; i++) {
        rowsArray[i] = rows[i + 1];
    }

    // 删除原来的三角形
    if (currentSortColId != '-1') {
        img_todelete = ths[currentSortColId].getElementsByTagName('img')[0];
        if (img_todelete != null) {
            ths[currentSortColId].style.backgroundColor = "#04187E";
            if (!isIE()) {
                img_todelete.remove();
            } else {
                img_todelete.parentNode.removeChild(img_todelete);
            }
        }
    }

    // 进行排序
    rowsArray.sort(function (row1, row2) {
        var item1 = row1.getElementsByTagName('td')[sortColId].innerText;
        var item2 = row2.getElementsByTagName('td')[sortColId].innerText;

        if (currentSortTypeId == 0) { // 降序
            return item1 < item2;
        } else { // 升序
            return item1 > item2;
        }
    })

    // 添加指示顺序的三角形
    img = document.createElement('img');
    if (currentSortTypeId == 1 || currentSortColId == -1) {
        table.setAttribute('sortTypeId', '0')
        img.setAttribute('src', 'ascend.png');
    } else {
        table.setAttribute('sortTypeId', '1')
        img.setAttribute('src', 'descend.png');
    }

    th.lastChild.appendChild(img);
    th.style.backgroundColor = "#A5AFFC";
    table.setAttribute('sortColId', sortColId);

    tbody = table.getElementsByTagName('tbody')[0];
    var bodyHTML = '<tbody>';
    for (var i = 0; i < rowsArray.length; i++) {
        bodyHTML += ('<tr>' + rowsArray[i].innerHTML + '</tr>');
    }
    tbody.innerHTML = bodyHTML + '<tbody>';

    colorlize(table);
}

// 将table可过滤化并将可过滤的table返回
function makeFilterable(table) {
    // 添加接受过滤文本的框框
    theads = table.getElementsByTagName('tr')[0];
    theads.innerHTML += '<td><input type="search" placeholder="Search table content"></td>'
    input = theads.lastChild.firstChild;
    
    // 注册过滤的事件,并和过滤函数绑定
    input.setAttribute('oninput', 'filterTable(this)');

    return table;
}

// 执行过滤的方法时先将表格的body复原，所以只对table按照thead和tbody进行组织的表格有效
function filterTable(input) {
    pattern = input.value;
    table = input.parentNode.parentNode.parentNode.parentNode;

    // 先将表格内容样式复原
    table.getElementsByTagName('tbody')[0].innerHTML = table.getAttribute('original');

    tds = table.getElementsByTagName('td');

    if (pattern != "") {
        var reg = eval('/(' + pattern + ')/ig');

        for (var i = 1; i < tds.length; i++) {
            // 将匹配的文本放在<em>元素内
            tds[i].innerHTML = tds[i].innerHTML.replace(reg, '<em style="background-color:yellow;font-weight:bolder">$1</em>');
        }
    }

    colorlize(table);
}

// 表格偶数行加背景色
function colorlize(table) {
    rows = table.getElementsByTagName('tr');

    for (var i = 2; i < rows.length; i += 2) {
        rows[i].style.backgroundColor = '#D1D1D1';
    }
}
