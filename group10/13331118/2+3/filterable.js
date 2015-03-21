// in file sort.js
// creat by Junjie Li, 2014-10-26
// email: 287150625@qq.com

window.onload = function(){
    var tables = getAllTables();
    makeAllTableFilterable(tables);
}

function getAllTables(){
    var tables = document.getElementsByTagName("table");
    return tables;
}

function makeAllTableFilterable(tables){
    for (var i = 0; i < tables.length; i++) {
        makeFilterable(tables[i]);
    }
}

function makeFilterable(table) {
    var form = document.createElement("FORM");
    var input = document.createElement("INPUT");
    var button = document.createElement("BUTTON");
    button.innerHTML = "OK";
    button.addEventListener("click", myFilter);
    form.appendChild(input);
    form.appendChild(button);
    table.parentNode.insertBefore(form, table);
    return table;
}

function myFilter() {
    var string = this.previousSibling.value;
    var table = this.parentNode.nextElementSibling;
    var rows = table.getElementsByTagName("tr");
    var hasString = false;
    for (var i = 1; i < rows.length; i++) {
        hasString = false;
        for (var j = 0; j < rows[i].length; j++) {
            var text = rows[i].children[j].innerHTML;
            if (text.indexOf(string) >= 0) {
                hasString = true;
            }
        }
        if (hasString === false) {
            rows[i].classList.add("hidden");
        }
    }
}