/*
author: Han Longyue 
id: 13331067
可供测试的网站：http://acdream.info/ranklist
*/

// window.onload = function() {
//     var tables = getAllTables();
//     makeAllTablesSortable(tables);
// }

function getAllTables() {
    tables = document.getElementsByTagName("table");
    return tables;
}

function makeAllTablesSortable(elements) {
    var status = [];  // 存储各个表头的点击状态
    var count = 0;
    var thset = document.getElementsByTagName("th");
    for (var i = 0; i < thset.length; i++) {
        status[i] = false;
    }
    oricolor();  // 为最初的表格调整样式
    for (var i = 0; i < elements.length; i++) {
        var items = elements[i].getElementsByTagName("th");  // items是待点击的元素的集合
        for (var j = 0; j < items.length; j++) {
            items[j].onclick = function(num, tablenum, count) {
                return function() {
                    var rows = document.getElementsByTagName("table")[tablenum].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
                    var trset = [];
                    for (var i = 0; i < rows.length; i++) {
                        trset[i] = rows[i];
                    }
                    if (status[count+num] == false) {  // 排序--升序(false)
                        for (var j = 0; j < rows.length; j++) {
                            for (var k = rows.length-1; k > 0; k--) {
                                var x = trset[k-1].getElementsByTagName("td")[num].innerHTML;
                                var y = trset[k].getElementsByTagName("td")[num].innerHTML;
                                if (isNaN(x)) { // 检测要排的这一列是不是数字, 是数字的话要按数字的大小关系排
                                    if (x > y) {
                                        var tmp = trset[k-1].innerHTML;
                                        var tmp2 = trset[k-1].className;
                                        trset[k-1].innerHTML =  trset[k].innerHTML;
                                        trset[k-1].className = trset[k].className;
                                        trset[k].innerHTML = tmp;
                                        trset[k].className = tmp2;
                                        // var tmp = trset[k-1];
                                        // trset[k-1] =  trset[k];
                                        // trset[k] = tmp;
                                    }
                                } else { // 如果是字符串，直接按字典序排
                                    if (parseFloat(x) > parseFloat(y)) {
                                        var tmp = trset[k-1].innerHTML;
                                        trset[k-1].innerHTML =  trset[k].innerHTML;
                                        trset[k].innerHTML = tmp;
                                    }
                                }
                            }
                        }
                        status[count+num] = true;
                    } else {  // 排序--降序(true)
                        for (var j = 0; j < rows.length; j++) {
                            for (var k = rows.length-1; k > 0; k--) {
                                var x = trset[k-1].getElementsByTagName("td")[num].innerHTML;
                                var y = trset[k].getElementsByTagName("td")[num].innerHTML;
                                if (isNaN(x)) {
                                    if (x < y) {
                                        var tmp = trset[k-1].innerHTML;
                                        var tmp2 = trset[k-1].className;
                                        trset[k-1].innerHTML =  trset[k].innerHTML;
                                        trset[k-1].className = trset[k].className;
                                        trset[k].innerHTML = tmp;
                                        trset[k].className = tmp2;
                                        // var tmp = trset[k-1];
                                        // trset[k-1] =  trset[k];
                                        // trset[k] = tmp;
                                    }
                                } else {
                                    if (parseFloat(x) < parseFloat(y)) {
                                        tmp = trset[k-1].innerHTML;
                                        trset[k-1].innerHTML =  trset[k].innerHTML;
                                        trset[k].innerHTML = tmp;
                                    }
                                }
                            }
                        }
                        status[count+num] = false;
                    }
                    for (var i = 0; i < rows.length; i++) {
                        rows[i].innerHTML = trset[i].innerHTML;
                    }
                    changecolor(num, tablenum, status[count+num]);
                }
            }(j, i, count);
        }
        count += items.length;
    }
    return elements;
}

function oricolor() {
    var elements = getAllTables();
    for (var i = 0; i < elements.length; i++) {
        var rows = elements[i].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (j % 2 == 1) rows[j].className = "evencolor";
        }
    }
    for (var i = 0; i < elements.length; i++) {
        var thset = elements[i].getElementsByTagName("th");
        for (var k = 0; k < thset.length; k++) {
            thset[k].className = "thunclicked";
        }
    } 
}

function changecolor(num, tablenum, status) {  // 点击表头之后的变色、边样式情况
    var elements = getAllTables();
    for (var i = 0; i < elements.length; i++) {
        var rows = elements[i].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (j % 2 == 1) rows[j].className = "evencolor";
        }
    }
    var x = elements[tablenum].getElementsByTagName("th")[num];
    var thset = elements[tablenum].getElementsByTagName("th");
    for (var i = 0; i < thset.length; i++) {
        if (i != num) thset[i].className = "thunclicked";
    }
    if (status == true) {
        x.className = "ascend thclicked";
    } else {
        x.className = "descend thclicked";
    }
}
