//13331203  牛仁鹏
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortableAndFilterable(tables);
}
function getAllTables() {
	return document.getElementsByTagName("table");
}
function makeAllTablesSortableAndFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
    	makeFilterable(makeSortable(tables[i]));
    }
}
//使一个表格可以排序
function makeSortable(item) {
    var thead = item.getElementsByTagName("thead")[0];
    var ths = thead.getElementsByTagName("th");
    for (var i = 0; i < ths.length; i++) {
    	ths[i].onclick = function() {
    		clickTable(this, this.cellIndex+1);
    	}
    }
    return item;
}
//对表格进行点击
//item为表格的单元格
//key为关键字，第key列
function clickTable(item, key) {
    var Table = item.parentNode.parentNode.parentNode;
    if (item.className == "") {
    	for (var i = 0; i < Table.getElementsByTagName("th").length; i++) {
    		Table.getElementsByTagName("th")[i].className = "";
    	}
    	sortTable(Table, key, function(a, b){
            if (a >= b) return true;
            else return false;
    	});
    	item.className = "up";
    } else if (item.className == "up") {
        sortTable(Table, key, function(a, b) {
        	if (a <= b) return true;
        	else return false;
        });
        item.className = "down"
    } else if (item.className == "down") {
        sortTable(Table, key, function(a, b){
            if (a >= b) return true;
            else return false;
    	});
    	item.className = "up";
    } else {
    	return;
    }
}
//对一个表格进行排序
//item为将进行排序的table
//key为关键字，即第key列
//mode为函数指针，规定排列的方式
function sortTable(item, key, mode) {
    var tbody = item.getElementsByTagName("tbody")[0];
    var trs = tbody.getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
    	for (var j = 0; j < trs.length-1; j++) {
    		var td1 = trs[j].getElementsByTagName("td")[key-1];
    		var td2 = trs[j+1].getElementsByTagName("td")[key-1];
            if (!mode(td1.innerHTML,td2.innerHTML)) {
            	swapTr(trs[j], trs[j+1]);
            }
    	}
    }
}
//交换两行内容
function swapTr(tr1, tr2) {
    var tds1 = tr1.getElementsByTagName("td");
    var tds2 = tr2.getElementsByTagName("td");
    var temp;
    for (var i = 0; i < tds1.length; i++) {
        temp = tds1[i].innerHTML;
        tds1[i].innerHTML = tds2[i].innerHTML;
        tds2[i].innerHTML = temp;
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