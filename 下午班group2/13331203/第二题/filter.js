window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}
function getAllTables() {
    return document.getElementsByTagName("table");
}
function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        makeFilterable(tables[i]);
    }
}
//--------------------------------------让表格可以搜索-------------------------------
//使表格可以搜索
function makeFilterable(tableDom) {
	var inputDom = creatInput();
	document.body.insertBefore(inputDom, tableDom);
	inputDom.oninput = function(){
		inputKey(tableDom, this.value);
	};
	return tableDom;
}
//创建输入框
function creatInput() {
	var result = document.createElement('input');
	result.type = 'text';
	result.style.marginBottom = '10px';
	return result;
}
//输入字母后
function inputKey(tableDom, keyWord) {
	var tds = getTds(tableDom);
    var key = new RegExp(keyWord, "gi");
    var col, row;
    for (row = 0; row < tds.length; row++) {
    	var ifHave = false;  //标志这一行是否有关键字
    	for (col = 0; col < tds[row].length; col++) {
    		clearTd(tds[row][col]);
    		if (key.test(tds[row][col].innerHTML)) {
    			ifHave = true;
    			tds[row][col].innerHTML = tds[row][col].innerHTML.replace(keyWord, "<span class=\"heightLight\">"+keyWord+"</span>");
    		}
    	}
    	toDoTr(tableDom, ifHave, row);//把这一行none掉或显示出
    }
}
//把这一行none或者显示
function toDoTr(tableDom, ifHave, row) {
    var tr = tableDom.getElementsByTagName("tr")[row+1];
    if (ifHave) {
  		tr.style.display = "table-row";
   	} else {
    		tr.style.display = "none";
   	}
}
//清除td中高亮部分
function clearTd(td) {
    td.innerHTML = td.innerHTML.replace("<span class=\"heightLight\">", "");
    td.innerHTML = td.innerHTML.replace("</span>", "");
}
//获取所有的表格td
function getTds(tableDom) {
    var result = [];
    for (var i = 1; i < tableDom.rows.length; i++) {
        var tds = tableDom.rows[i].getElementsByTagName('td');
        result[i-1] = [];
        for (var j = 0; j < tds.length; j++) {
        	result[i-1].push(tds[j]);
        }
    }
    return result;
}