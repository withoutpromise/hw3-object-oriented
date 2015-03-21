  window.onload = function() {
    var table1 = document.getElementById("todo");
    var table2 = document.getElementById("staff");

   makeTableSorttable(makeTableFilterable(table1));
    makeTableFilterable(makeTableSorttable(table2));
};


function getCompare(index){
   return function(tr1,tr2){
    //获得第一行的值
    var val1=tr1.cells[index].innerHTML;
    //获得第二行的值
    var val2=tr2.cells[index].innerHTML;
    //比较两个值大小
    return val1.localeCompare(val2);
   }
  }

function sortTr (col, table) {
    var tableRow = [];
    var heads = table.getElementsByTagName('th');
    for (var i = 1; i < table.rows.length; i++) 
        tableRow[i-1] = table.rows[i];
    if (table.colNum == col) {
        tableRow.reverse();
        table.flag = !table.flag;
    } else {
        tableRow.sort(getCompare(col));
        table.flag = true;
        if (table.colNum != -1) {
            heads[table.colNum].style.backgroundColor="blue";
        }
    }
    if (table.flag == true) {
        heads[col].style.backgroundImage = "url(ascend.png)";
    } else {
        heads[col].style.backgroundImage = "url(descend.png)";
    }
    for (var i = 1; i < table.rows.length; i++) {
        if ((i-1)%2 == 1) tableRow[i-1].setAttribute('class', 'alternate');
        else tableRow[i-1].setAttribute('class', 'non-alternate');
        table.appendChild(tableRow[i-1]);
    }
    heads[col].style.backgroundColor="blue";
    table.colNum = col;
}

function makeTableSorttable(table) {
    var tableHeads = table.getElementsByTagName("th");
    for (var i = 0; i < tableHeads.length; i++) {
        (   function(i) {tableHeads[i].onclick = function(){sortTr(i, table);}}  )(i);
    }
    return table;
}


function getAllTables() {
    return document.getElementsByTagName('table');
};



function makeTableFilterable(table) {
    var inputNode = document.createElement("input");
    inputNode.type = "text";
    table.parentNode.insertBefore(inputNode, table);   
    inputNode.oninput = function(event) {              
        filterFunc(event, table);
    };
    return table;
};


function filterFunc(e, table) {
    var value = e.target.value;
    var rows = table.tBodies[0].rows;
    for (var i = 0; i < rows.length; i++) {      
        rows[i].style.display = 'table-row';
    }

    var isFound = false;
    for (var i = 0; i < rows.length; i++) {
        isFound = false;
        for (var j = 0; j < rows[i].cells.length; j++) {
            var text = rows[i].cells[j].innerText;  
            var position = text.indexOf(value);
            if (position >= 0) {
                var style = "<span class='super'>"+value+"</span>";   
                var html = text.replace(value, style);
                rows[i].cells[j].innerHTML = html;
                isFound = true;
            } else {
                rows[i].cells[j].innerHTML = text;
            }
        }
        if (!isFound) {   //如果无法匹配，将本行设置为不可见
            rows[i].style.display = "none";
        }
    }
};