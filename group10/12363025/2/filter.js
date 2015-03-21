window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
};

function getAllTables() {
    return document.getElementsByTagName('table');
};

function makeAllTablesFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        makeTableFilterable(tables[i]);
    }
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