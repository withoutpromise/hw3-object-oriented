
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

var arr = new Array();
var sortup_flag = new Array();
var flag;

function makeAllTablesSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		arr[i] = new Array();
		for (var j = 0; j < tables[i].rows[0].cells.length; j++) {
			arr[i][j] = false;
		    sortup_flag[j] = false;
		    tables[i].rows[2].cells[j].className = "second_row";
            tables[i].rows[0].cells[j].onclick = function(ii, jj,table_ii) {
            	return function() {
            		sortTable(ii, jj, table_ii);
            	}
            }(i, j, tables[i]);
		}
	}
}

function sortTable(ii, jj, table_ii) {
	var oTable = table_ii;

    var oTBody = oTable.tBodies[0];//获得放数据的body,因为该表格只有一个tbody,所以直接用[0]
    var colRows = oTBody.rows;//获得tbody里所有的tr
    var aTRs = new Array();//声明一个数组
    for(var i = 0; i < colRows.length; i++) {
         aTRs[i] = colRows[i];//将tr依次放入数组中;
    }

    if(arr[ii][jj] == true) {
        aTRs.reverse();//如果当前要排的列和上次排的列是一样的,就直接逆向排序;也就是说连着对一列点两次,就会进行升序,降序的转换.    
    } else {
        aTRs.sort(getSortFunction(jj));//排序
        for (var i = 0; i < colRows.length; i++) {
        	arr[ii][i] = false;
        }
        arr[ii][jj] = true;
    }




    if (sortup_flag[jj] == true) {
        oTable.rows[0].cells[jj].className = "sortDown";
        sortup_flag[jj] == false;
    } else {
        oTable.rows[0].cells[jj].className = "sortUp";
        sortup_flag[jj] == true;
    }

    var oFragement = document.createDocumentFragment();//创建文档碎片,用来存放排好的tr

    for(var i = 0; i < aTRs.length; i++) {
        oFragement.appendChild(aTRs[i]);//将tr绑定到碎片上.
    }

    oTBody.appendChild(oFragement);//将碎片绑定在表格上
}

function getSortFunction(iCol)
{
    return function compareTRs(oTR1, oTR2){
        var vValue1, vValue2;

        vValue1 = oTR1.cells[iCol].firstChild.nodeValue;
        vValue2 = oTR2.cells[iCol].firstChild.nodeValue;

       if(vValue1 < vValue2) {
            return -1;
       } else if(vValue1 > vValue2) {
            return 1;
       } else {
            return 0;
       }
    }
}
