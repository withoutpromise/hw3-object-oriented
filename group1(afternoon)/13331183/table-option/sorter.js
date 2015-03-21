window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortableAndFilterable(tables);
};

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortableAndFilterable(tables) {
    for (var i = 0; i < tables.length; ++i) {
        makeSortable(makeFilterable(tables[i]));
    }
}
function makeFilterable(table) {
    var input = document.createElement("input");
    input.name = "search";
    input.type = "text";
    var button = document.createElement("button");
    button.innerHTML = "过滤"
    table.appendChild(input);
    table.appendChild(button);//添加input和button控件
    table.getElementsByTagName("button")[0].onclick = function() {
        var keyContent = table.getElementsByTagName("input")[0].value;
        filter(keyContent, table);
    };
    return table;
}
function makeSortable(table) {
    var ths = table.getElementsByTagName("th");
    var tbodys = table.getElementsByTagName("tbody");
    var trs = tbodys[0].getElementsByTagName("tr");
    for (var i = 0; i < ths.length; ++i) {
        (function(i) {
            ths[i].onclick = function() {
                toggleThClass(ths[i], ths);
                if (ths[i].className.match(/ascend/)) {
                    sortTable("ascend", i, trs, tbodys[0]);
                } else {
                    sortTable("descend", i, trs, tbodys[0]);
                }
            };
        })(i);
    }
    return table;
}
function filter(keyContent, table) {
    var removeTrs = []//将要移除的tr暂存在此处
    var tbody = table.getElementsByTagName("tbody")[0];
    var trs = tbody.getElementsByTagName("tr");
    for (var i = 0 ; i < trs.length ; ++i) {
        var tds = trs[i].getElementsByTagName("td");
        var hasKey = false;
        for (var j = 0 ; j < tds.length ; ++j) {
            tds[j].innerHTML = recoverInnerHtml(tds[j].innerHTML);//去除原来关键字的高亮
            if (tds[j].childNodes[0].nodeValue.indexOf(keyContent) != -1) {//查找是否含有查找的关键字
                tds[j].innerHTML = highlight(tds[j].innerHTML, keyContent);//为关键字加高亮
                hasKey = true;
            }
        }
        if (hasKey == false) {
            removeTrs.push(trs[i]);
        }
    }
    for (var i = 0 ; i < removeTrs.length ; ++i) {
        tbody.removeChild(removeTrs[i]);//移除不含关键字的tr
    }
}
function highlight(inner_html, keyContent) {
    var arrString = inner_html.split(keyContent);
    inner_html = arrString[0];
    for (var i = 1 ; i < arrString.length ; ++i) {//每个关键字都加上span标记特殊样式
        inner_html +=  "<span>" + keyContent + "</span>" +arrString[i];
    }
    return inner_html;
}
function recoverInnerHtml(inner_html) {
    inner_html = inner_html.replace(/<span>/g,"");
    inner_html = inner_html.replace(/<span\/>/g,"");//去除上一次选择的关键字所标记的span
    return inner_html;
}
function toggleThClass(selectedElem, allElems) {//为选中的th添加相应的样式
    for (var i = 0; i < allElems.length; ++i) {
        if (allElems[i] != selectedElem) {
            allElems[i].className = allElems[i].className.replace("ascend", "");
            allElems[i].className = allElems[i].className.replace("descend", "");
        }
    }
    if (selectedElem.className.match(/ascend/)) {
        selectedElem.className = selectedElem.className.replace("ascend", "descend");
    } else {
        selectedElem.className = selectedElem.className.replace("descend", "");
        selectedElem.className += " ascend";
    }
}



function toggleTrClass(trs, tbody) {//保持奇数白色、偶数浅灰色的样式,并连接到tbody中
    for (var i = 0; i < trs.length; ++i) {
        if (i % 2 == 0) {
            trs[i].className = trs[i].className.replace("alternate", "");
        }
        if (i % 2 != 0 && !trs[i].className.match(/alternate/)) {
            trs[i].className += " alternate";
        }
        tbody.appendChild(trs[i]);
    }
}
function sortTable(sortType, num_th, trs, tbody) {
    var temp_trs = [];
    for (var i = 0; i < trs.length; ++i) {//将所有列放到一个临时数组中，方便排序
        temp_trs.push(trs[i]);
    }
    temp_trs.sort(function(left, right) {//按所选中的列进行排序
        if (sortType == "ascend") {
            return left.getElementsByTagName("td")[num_th].childNodes[0].nodeValue > right.getElementsByTagName("td")[num_th].childNodes[0].nodeValue;
        } else {
            return left.getElementsByTagName("td")[num_th].childNodes[0].nodeValue < right.getElementsByTagName("td")[num_th].childNodes[0].nodeValue;
        }
    });
    toggleTrClass(temp_trs, tbody);
}