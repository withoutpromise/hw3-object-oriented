window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}

/** Get the content of the table **/
function getAllTables() {
    tables = document.getElementsByTagName("table");
    return tables;
}

function makeAllTablesFilterable(tables) {
    var tableRow = [];
    for (var i = 0; i < tables.length; i++) {
    	tableRow[i] = tables[i].getElementsByTagName("tr");
    }

    var original = [];
    for (var i = 0; i < tables.length; i++)
        original[i] = tables[i].innerHTML;

    var button = document.getElementsByTagName("button");
    var input = document.getElementsByTagName("input");

    for (var i = 0; i < button.length; i++) {
        button[i].onclick = function(i) {
            return function() {
                tables[i].innerHTML = original[i];
                var str = input[i].value;
                Filter(tableRow[i], str, tables[i]);
            }
        }(i);
    }
}

function Filter(rows, str, table) {
    var removed = [];
    for (var i = 1; i < rows.length; i++) {
        var match = 0;
        text = rows[i].getElementsByTagName("td");
        for (var j = 0; j < text.length; j++) {
            subStr = text[j].innerHTML.split(str);
            if (subStr.length > 1) {
                match += (subStr.length - 1);
                subStr[0] += "<span>" + str;
                subStr[subStr.length - 1] = "</span>" + subStr[subStr.length - 1];
            }
                
            if (subStr.length > 2) {
                for (var m = 1; m < subStr.length-1; m++) {
                    subStr[m] = "</span>" + subStr[m] + "<span>" + str;
                }
            }
            text[j].innerHTML = "";
            for (var m = 0; m < subStr.length; m++)
                text[j].innerHTML += subStr[m];
        }

        if (match == 0) {
            removed.push(i);
        }
    }

    for (var i = 0; i < removed.length; i++) {
        table.getElementsByTagName("tbody")[0].removeChild(rows[removed[i] - i]);
    }
}