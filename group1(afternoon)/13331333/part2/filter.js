function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; ++i) {
        Filter(tables[i]);
    }
}

function Filter(table) {
    var div = document.createElement('div');
    var ipt = document.createElement('input');
    ipt.type = 'text';
    ipt.className = 'input-word';
    ipt.placeholder= "the word you want to filter";
    div.appendChild(ipt);
    table.parentNode.insertBefore(div, table);
    var th = table.getElementsByTagName('th');
    var tr = table.getElementsByTagName('tr');
    var tb = table.getElementsByTagName('tbody')[0];
    var trArr = new Array();
    for (var i = 1; i < tr.length; ++i) {
        trArr.push(tr[i]);
    }
    ipt.oninput = function() {
        for (j = 0; j < trArr.length; ++j) {
            trArr[j].style.display = "none";
        }
        for (j = 0; j < trArr.length; ++j) {
            for (k = 0; k < trArr[j].cells.length; ++k) {
                trArr[j].cells[k].innerHTML = trArr[j].cells[k].innerHTML.replace(/<\/?span[^>]*>/gi, "");  //delete <span> and </span>
                if (trArr[j].cells[k].innerHTML.indexOf(ipt.value) >= 0) {
                    trArr[j].style.display = "";
                    var reg = new RegExp(ipt.value, 'g');
                    trArr[j].cells[k].innerHTML = trArr[j].cells[k].innerHTML.replace(reg, '<span style=\"font-weight: bold;\">'+ipt.value+'</span>');
                }
            }
        }
        for (var k = trArr.length-1; k >= 0; --k) {
            if (trArr[k].style.display == "") {
                tb.insertBefore(trArr[k], tb.firstChild.nextSibling);
            }
        }
    }
}

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}
