/**
 * Created by air on 15/3/21.
 */
/**
 * @fn  addSearch
 * @brief 给传入的table插入过滤框后返回过滤框的DOM
 * @param tempTable 需要插入filter的table的DOM
 * @returns {HTMLElement}过滤框的DOM
 */
function addSearch(tempTable) {
    var FilterInput = document.createElement("input");
    FilterInput.type = "text";
    document.body.insertBefore(FilterInput,tempTable);
    FilterInput.style.marginBottom = "10px";
    return FilterInput;
}

/**
 * @fn  tableFilterable
 * @brief 把传入的table变得可过滤
 * @param tempTable
 * @return 无
 */
function makeFilterable(tempTable) {
    var Filter = addSearch(tempTable);
    Filter.oninput = function() {
        var textInputted = this.value;
        var tempThead = tempTable.getElementsByTagName("th");
        var tempTbody = tempTable.getElementsByTagName("tbody")[0];
        var tempTr = tempTbody.getElementsByTagName("tr");
        var tempTd = [];
        var Exp = new RegExp(textInputted, "g");//添加正则表达式

        for (var i = 0; i < tempTr.length; i++) {
            tempTd[i] = tempTr[i].getElementsByTagName("td");
        }
        for (var i = 0; i < tempTr.length; i++) {
            var visible = 0;
            for (var j = 0; j < tempTd.length; j++) {
                tempTd[i][j].innerHTML = tempTd[i][j].innerHTML.replace(/<span class=\"highlight\">|<\/span>/g, "");//添加高亮
                if (Exp.test(tempTd[i][j].innerHTML)) {
                    visible = 1;
                    tempTd[i][j].innerHTML = tempTd[i][j].innerHTML.replace(Exp, "<span class = 'highlight'>"
                    + textInputted + "</span>");
                }
                if (visible) {
                    tempTr[i].style.display = "table-row";
                } else {
                    tempTr[i].style.display = "none";
                }
            }
        }
    }
    return tempTable;
}

/**
 * @fn makeAllTablesFilterable
 * @param tables
 * @returns {Array}tables
 */
function makeAllTablesFilterable(tables) {
    var cur = new Array();
    for (var i = 0; i < tables.length; i++) {
        cur.push(makeFilterable(tables[i]));
    }
    return cur;
}
