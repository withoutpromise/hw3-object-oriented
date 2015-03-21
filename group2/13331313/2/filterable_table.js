/*
叶炽凯
13331313
*/

function getALLTables() {
	return document.getElementsByTagName("table");
}

function makeTableFilterable(table) {
    var search = document.createElement("input");       //在表格上方添加一个搜索栏（input）
    var parent = table.parentNode;
    parent.insertBefore(search, table);
    
    search.addEventListener('input', function() {tableFilter(table, this);});           //监听input，并根据输入进行信息筛选
}

//用于初始化表格的函数
function initialCells(rows) {
    for (var i = 1; i < rows.length; i++) {                              //去除spans
        for (var j = 0; j < rows[i].cells.length; j++) {
            var v1 = new RegExp("<span>", "g");
            var v2 = new RegExp("</span>", "g");
            rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace(v1, "");
            rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace(v2, ""); 
        }
        rows[i].style.display="table-row";          //恢复原先被隐藏的行
    }
}

//表格信息筛选
function tableFilter(table, that) {
   var rows = table.getElementsByTagName('tr');
   initialCells(rows);                      //恢复初始状态
   for (var i = 1; i < rows.length; i++) {
        var founddSubstring = false;                //用以标记是否找到子串
        if (that.value == "") {                     //当输入为空时，跳过
        } else {
            for (var j = 0; j < rows[i].cells.length; j++) {
                if (rows[i].cells[j].innerHTML.search(that.value) != -1) {        //找到匹配子串
                    var v = new RegExp(that.value, "g");
                    rows[i].cells[j].innerHTML = rows[i].cells[j].innerHTML.replace(v, "<span>"+that.value+"</span>");      //为所有子串套上“span”用以添加效果
                    founddSubstring = true;             //标记该行有匹配子串
                }
            }
            if (founddSubstring == false) rows[i].style.display="none";         //未找到匹配字符串的row将被隐藏
        }
   }
}

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		makeTableFilterable(tables[i]);
	}
    return tables;
}

window.onload = function() {
	var tables = getALLTables();
	makeAllTablesFilterable(tables);
}
