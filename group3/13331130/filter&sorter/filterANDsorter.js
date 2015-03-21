window.onload = function() {
    var tables = getAllTables();
    //makeSortable(makeFilterable(tables[0]));
    makeFilterable(makeSortable(tables[0]));
}

function getAllTables() {
    return document.getElementsByTagName("table");
}


var isAsc = true; //判断是否是升序
function makeSortable(table) { //冒泡排序
    var headCells = table.getElementsByTagName("th");
    for (var j = 0; j < headCells.length; j++) {
        headCells[j].addEventListener("click", sortTable);
        addImg(headCells[j]);
    }
    return table;
}

function sortTable() {
    var newRows = [], rows = []; 
    var colIndex = this.cellIndex;
    var temp = this.parentNode.parentNode.parentNode.getElementsByTagName("tr");
    var count = 0
    for (var i = 1; i < temp.length; i++) { //除去表格第一行，即表头
        if (temp[i].className.search("unsee") == -1)
        rows[count++] = temp[i];
    }
    setImgStyle(this);

    for (var i = 0; i < rows.length; i++) {  //将表格内容存入二维数组
        newRows[i] = [];
        for (var j = 0; j < rows[i].cells.length; j++)
            newRows[i][j] = rows[i].cells[j].innerHTML;
    }

    newRows.sort(function (rowA, rowB) { //设置排序方法
        if (isNaN(rowA[colIndex]))
            return rowA[colIndex] > rowB[colIndex];
        else
            return parseInt(rowA[colIndex]) > parseInt(rowB[colIndex]); //针对数值数据
    })

    if (isAsc) {
        isAsc = false;
    } else {
        isAsc = true;
        newRows.reverse();
    }

    for (var i = 0; i < rows.length; i++) //更新DOM中表格内容
        rows[i].innerHTML = "<td>" + newRows[i].join("</td><td>") + "</td>"
}

function addImg(elem) { //添加箭头图片
	var asc = document.createElement("img");
	var desc = document.createElement("img");
	asc.src = "img/ascend.png";
	desc.src = "img/descend.png";
	elem.appendChild(asc);
	elem.appendChild(desc);
}

function setImgStyle(elem) { //设置图片是否显示
	var headCellsImgs = elem.parentNode.getElementsByTagName("img"); //表格中的所有图片
	var imgs = elem.getElementsByTagName("img"); //当前点击的表格中的图片

	for (var i = 0; i < headCellsImgs.length; i++)
		headCellsImgs[i].className = "";

	if (isAsc)
		imgs[0].className = "see";
	else
		imgs[1].className = "see";
}

/************************************************************/
function addInputBox(table) {
    var input = document.createElement("input");
    table.parentNode.insertBefore(input, table);
}

function makeFilterable(table) {
    addInputBox(table);
    table.previousSibling.addEventListener("input", filterTable);
    return table;
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
            rows[i].className += "unsee";
        }
    }
}
