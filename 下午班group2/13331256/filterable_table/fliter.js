/*
* @Author: ValenW
* @Date:   2014-10-28 14:21:40
* @Last Modified by:   ValenW
* @Last Modified time: 2015-03-21 14:09:18
*/
window.onload = function() {
    var tables = getAllTables();
    doWithAllTables(tables);
}

function getAllTables() {
    return document.getElementsByTagName('table');
}

function doWithAllTables(tables) {
    for (var i = 0; i < tables.length; i++)
        tables[i] = makeFilterable(tables[i]);
}

function makeFilterable(table) {
    var filterRow = document.createElement("input");
    filterRow.addEventListener('keyup', toFilter)
    filterRow.placeholder = "to filter";
    table.appendChild(filterRow);
    return table;
}

function toFilter(event) {
    var key = this.value;
    var theTable = this.parentNode;
    var theTbody = theTable.tBodies[0];
    var oTr = theTbody.rows;
    var nothead = theTable.getElementsByTagName('thead').length == 0 ? true : false;

    for (var i = 0; i + nothead < oTr.length; i++) {
        var oTd = oTr[i].getElementsByTagName('td');

        if (oTr[i].innerHTML.search(/<span class=\"highlight\">(.*)<\/span>/) != -1)
            oTr[i].innerHTML = oTr[i].innerHTML.replace(/<span class=\"highlight\">(.*)<\/span>/g, "$1");
        var found = false;
        for (var j = 0; j < oTd.length; j++) {
            if (oTd[j].innerHTML.search(key) != -1) {
                oTd[j].innerHTML = oTd[j].innerHTML.replace(key, "<span class=\"highlight\">" + key + "</span>");
                found = true;
            }
        }
        if (found) oTr[i].className = oTr[i].className.replace(/hide/gm, "");
        else oTr[i].className += " hide";
    }
}

/*var tables = getAllTables();
doWithAllTables(tables);*/