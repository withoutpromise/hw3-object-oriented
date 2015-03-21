//Table Sorter, making all tables sortable

//Get all the tables in the html file
function getAllTables() {
    return document.getElementsByTagName('table');
}

//search char or string and change the table
function searchAndChange(i, text) {
    var tabless = getAllTables();
    var tbody = tabless[i].tBodies[0];
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
function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        var text = document.createElement('input');
        text.type = "text";
        text.id = i;
        text.setAttribute("oninput", "searchAndChange(this.id, this.value);");
        tables[i].appendChild(text);
    }
}

window.onload =function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}
