window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortableAndFilterable(tables);
    //makeAllTablesFiltertable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}
//


function makeAllTablesSortableAndFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        (function(i) {
           makeSortable(makeFilterable(tables[i]));
        })(i);
    }
}

function makeAllTablesFiltertable(tables) {
    for (var i = 0; i < tables.length; i++) {
        (function(i) {
            makeFilterable(tables[i]);
        })(i);
    }
}

function makeFilterable(table_dom) {
    var inputbox = document.createElement('input');
    document.body.insertBefore(inputbox, table_dom);
    filtertable(inputbox, table_dom);
    return table_dom;
}

function filtertable(inputbox, mytable) {
    var trow_ = mytable.rows;
    var pre_temp = new Array;
    for (var i = 1; i < trow_.length; i++) {
        pre_temp.push(trow_[i]);
    }
    inputbox.oninput = function() {
        var tbody = mytable.tBodies[0];
        for (var i = tbody.childNodes.length - 1; i >= 0 ; i--) {
            tbody.removeChild(tbody.childNodes[i]);
        }
        for (var i = 0; i < pre_temp.length; i++) {
            tbody.appendChild(pre_temp[i]);
        }
        final_temp = new Array;
        for (var i = 0; i < pre_temp.length; i++) {
            var check_row = false;
            for (var j = 0; j < pre_temp[i].cells.length; j++) {
                var flag = pre_temp[i].cells[j].textContent.search(inputbox.value);
                pre_temp[i].cells[j].innerHTML = pre_temp[i].cells[j].textContent;
                if (flag != -1) {
                    if (check_row == false) {
                        check_row = true;
                        final_temp.push(pre_temp[i]);
                    }
                    var str = pre_temp[i].cells[j].textContent;
                    var str_arr = str.split(inputbox.value);
                    pre_temp[i].cells[j].innerHTML = "";
                    pre_temp[i].cells[j].innerHTML += str_arr[0];
                    for (var k = 1; k < str_arr.length; k++) {
                        pre_temp[i].cells[j].innerHTML += '<span class="active">' + inputbox.value + "</span>" + str_arr[k];
                    }
                }
            }
        }
        for (var i = tbody.childNodes.length - 1; i >= 0 ; i--) {
            tbody.removeChild(tbody.childNodes[i]);
        }
        var tbody = mytable.tBodies[0];
        for (var i = 0; i < final_temp.length; i++) {
            tbody.appendChild(final_temp[i]);
        }
    }
}

//


function makeSortable(table_dom) {
    thead_ = table_dom.getElementsByTagName("th");
    for (var j = 0; j < thead_.length; j++) {
    (function(j) {
        thead_[j].onclick = function() {   // 点击事件
        // 进入排序函数，其中i是第i个table，j是第j列(需要进行排序的列)
            sort_table(table_dom, j);
        };
    })(j);
    }
    return table_dom;
}


var sortCol; // sortCol用来记录上一次排序的列

function sort_table(table_dom, col_No) {   // 排序函数
	var tables = getAllTables();
	var tbody = table_dom.tBodies[0];
	var th_ = table_dom.getElementsByTagName("th"); // 目标排序table的所有th
	var all_th = document.getElementsByTagName("th");  // html中所有的th
	var th = th_[col_No];   // 目标排序的th
	trow_ = table_dom.rows;
	pre_temp = new Array;   // 目标排序table的所有的行
	for (var i = 1; i < trow_.length; i++) {
		pre_temp[i-1] = trow_[i];
	}
	if (sortCol == col_No) {
        pre_temp.sort(Compare(col_No));
        if (th_[col_No].className == 'Ascend')
            pre_temp.reverse();  // 如果上一次已经排序，则反向排序
    } else {
		pre_temp.sort(Compare(col_No));  // 排序
	}
	// 设置好所有th/tr的classname
    for (var i = 0; i < pre_temp.length; i++) {
        tbody.appendChild(pre_temp[i]);
    }
    sortCol = col_No;
    class_name = th_[col_No].className;
    for (var i = 0; i < all_th.length; i++) {
    	all_th[i].className = 'nochange';  // 其他的th格式不变
    }
    // 目标排序th的class
    if (class_name == 'Descend' || class_name == 'nochange') {
    	th_[col_No].className = 'Ascend';
    } else if (class_name == '') {
    	th_[col_No].className = 'Ascend';
    }
     else if (class_name == 'Ascend') {
    	th_[col_No].className = 'Descend';
    }
}

//比较函数
function Compare(col_No) {
    return  function (oTR1, oTR2) {
        var Value1 = changeType(oTR1.cells[col_No].textContent);
        var Value2 = changeType(oTR2.cells[col_No].textContent);
        if (Value1 < Value2) {
            return -1;
        } else if (Value1 > Value2) {
            return 1;
        } else {
            return 0;
        }
    };
}

function changeType(obj) {  // 转换类型
    if (isNaN(obj))
        return obj.toString();
    else
        return parseFloat(obj);

}