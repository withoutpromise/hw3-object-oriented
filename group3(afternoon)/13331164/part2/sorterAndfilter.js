window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
    makeAllTablesFiltertable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}

// 查找关键字
function makeAllTablesFiltertable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var inputbox = document.createElement('input');
        document.body.insertBefore(inputbox, tables[i]);
        filtertable(inputbox, tables[i]);
    }
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
            tbody.appendChild(pre_temp[i]);            //还原表格
        }
        final_temp = new Array;
        for (var i = 0; i < pre_temp.length; i++) {
            var check_row = false;
            for (var j = 0; j < pre_temp[i].cells.length; j++) {
                var flag = pre_temp[i].cells[j].textContent.search(inputbox.value);  // flag不等于-1代表找到关键字
                pre_temp[i].cells[j].innerHTML = pre_temp[i].cells[j].textContent;  // 将原来关键字的样式去掉
                if (flag != -1) {
                    if (check_row == false) {
                        check_row = true;
                        final_temp.push(pre_temp[i]);
                    }
                    var str = pre_temp[i].cells[j].textContent;
                    var str_arr = str.split(inputbox.value);
                    pre_temp[i].cells[j].innerHTML = "";
                    pre_temp[i].cells[j].innerHTML += str_arr[0];
                    for (var k = 1; k < str_arr.length; k++) {  // 添加关键字的样式
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



// 排序
function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		(function(i) {
		trow_ = tables[i].getElementsByTagName("tr");
		thead_ = tables[i].getElementsByTagName("th");
		for (var j = 0; j < thead_.length; j++) {
		(function(j) {
			thead_[j].onclick = function() {   // 点击事件
		// 进入排序函数，其中i是第i个table，j是第j列(需要进行排序的列)
				sort_table(i, j);
			};
		})(j);
		}
		})(i);
	}
}

var sortCol; // sortCol用来记录上一次排序的列

function sort_table(table_No, col_No) {   // 排序函数
	var tables = getAllTables();
	var tbody = tables[table_No].tBodies[0];
	var th_ = tables[table_No].getElementsByTagName("th"); // 目标排序table的所有th
	var all_th = document.getElementsByTagName("th");  // html中所有的th
	var th = th_[col_No];   // 目标排序的th
	trow_ = tables[table_No].rows;
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