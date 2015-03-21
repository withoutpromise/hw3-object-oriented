//Table Sorter, making all tables sortable

//Get all the tables in the html file
function getAllTables() {
    return document.getElementsByTagName('table');
}

//change the background of the table
function changeBackground(table, col) {
    var tth = table.getElementsByTagName('th');
    for (var i = 0; i < tth.length; i++) {
        if (i != col) {
            tth[i].className ='';
        } else {
            if (tth[i].className == '') {
                tth[i].className = 'ascend';
            } else if (tth[i].className == 'ascend') {
                tth[i].className = 'descend';
            } else {
                tth[i].className = 'ascend';
            }
        }
    }
    var trows = table.tBodies[0].rows;
    for (var i = 0; i < trows.length; i++) {
        if (i % 2 != 0) {
            trows[i].className = 'alternate';
        } else {
            trows[i].className = '';
        }
    }
}

//search char or string and change the table
function searchAndChange(id, text) {
    var tables = getAllTables();
    var tbody = tables[id].tBodies[0];
    var temp = tbody.rows;
    for (var i = 0; i < temp.length; i++) {
        temp[i].style.display = '';
        var tds = temp[i].getElementsByTagName('td');
        var count = 0;
        for (var j = 0; j < tds.length; j++) {
            tds[j].innerHTML = tds[j].innerHTML.replace("<strong>", "");
            tds[j].innerHTML = tds[j].innerHTML.replace("</strong>", "");
            if (tds[j].innerHTML.indexOf(text) != -1) {
                count++;
                tds[j].innerHTML = tds[j].innerHTML.replace(text, "<strong>"+ text +"</strong>");
            }
        }
        if (count == 0) {
            temp[i].style.display = 'none';
        }
    }  
}

//filter all the tables
function makeFilterable(table) {
    var text = document.createElement('input');
    text.type = "text";
    text.id = table.id;
    text.setAttribute("oninput", "searchAndChange(this.id, this.value);");
    table.appendChild(text);
    return table;
}

function makeSortable(table) {
    var tbody = table.tBodies[0];
    var trows = tbody.rows;
    var temp = new Array();
    for (var j = 0; j < trows.length; j++) {
        temp[j] = trows[j];
    }
    var tth = table.getElementsByTagName('th');
    for (var j = 0; j < tth.length; j++) {
        tth[j].onclick = function(tbody, temp, j) {
            return function() {
                if (tbody.sortCol == j) {
                    temp.reverse();// if it's not the first time to sort j col of the table
                } else {
                    temp.sort(function(tr1, tr2) {
                        var value1 = tr1.cells[j].innerHTML;
                        var value2 = tr2.cells[j].innerHTML;
                        return value1.localeCompare(value2);
                    });// for the first time ,sort the table
                }  
                var newfrag = document.createDocumentFragment();//add new fragment
                for (var k = 0; k < temp.length; k++ ) {
                    newfrag.appendChild(temp[k]);
                }
                tbody.appendChild(newfrag);
                tbody.sortCol = j;
                changeBackground(table, j);
            };
        }(tbody, temp, j);
    }
    return table;
}

function sortAndFilter(tables) {
    for (var i = 0; i < tables.length; i++) {
        tables[i].id = i;
        makeSortable(tables[i]);
        makeFilterable(tables[i]);
    }
}

window.onload =function() {
    var tables = getAllTables();
    sortAndFilter(tables);
}
