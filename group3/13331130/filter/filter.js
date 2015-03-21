window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}

//获取所有表格
function getAllTables() {
    return document.getElementsByTagName("table");
}

//添加输入框
function addInputBox(table) {
    var input = document.createElement("input");
    table.parentNode.insertBefore(input, table);
}

function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        addInputBox(tables[i]);
        tables[i].previousSibling.addEventListener("input", filterTable);
    }
}

function filterTable() {
    var rows = this.nextSibling.getElementsByTagName("tr");
    var str = this.value;
    for (var i = 1; i < rows.length; i++) { //忽略第一行表头
        var canFind = false; //能否在一行之中找到匹配的字符串
        var reg = eval("/" + str + "/i");

        rows[i].className = "";

        //初始化，去掉原有的span标签
        for (var j = 0; j < rows[i].cells.length; j++) {
            rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace(/<span>|<\/span>/g, "");
            if (rows[i].cells[j].innerHTML.search(reg) >= 0)
                canFind = true;
        }

        if (canFind) { //处理可以匹配的行
            for (var j = 0; j < rows[i].cells.length; j++) {
                var cellContent = rows[i].cells[j].innerHTML;
                var findInThisCell = false; //能否在一具体的单元格内匹配
                var pos = cellContent.search(reg);
                var newCellContent;
                if (cellContent.search(reg) >= 0) {
                    findInThisCell = true;
                    newCellContent = cellContent.slice(0, pos); //截取到第一个匹配到的字符串之前
                } else {
                    newCellContent = cellContent; //不匹配的单元格内容不变
                }
                
                while (pos >= 0 && reg) { //对于能匹配的单元格继续进行全局匹配
                    /*
                     *此处不使用replace的原因是，在大小写不敏感时，对匹配到的字符串
                     *加span标签进行替换无法确定该用大写还是小写，例如PapA匹配查找PA，
                     *匹配到Pa, replace(reg, "<span>Pa</span>")
                     *匹配到pA, replace(reg, "<span>pA</span>")
                     *replace的第二个参数无法灵活改变
                     */
                    var needSpan = cellContent.slice(pos, pos + str.length);
                    var temp = "<span>" + needSpan + "</span>";
                    newCellContent += temp;
                    cellContent = cellContent.slice(pos + str.length, cellContent.length);
                    pos = cellContent.search(reg);
                    if (pos > 0)
                        newCellContent += cellContent.slice(0, pos);
                }
                if (findInThisCell)
                    newCellContent += cellContent;
                if (newCellContent)
                    rows[i].cells[j].innerHTML = newCellContent;
            }
        } else {
            rows[i].className = "unsee";
        }
    }
}
