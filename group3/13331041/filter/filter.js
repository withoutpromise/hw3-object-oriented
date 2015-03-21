window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortable(makeAllTablesFilterable(tables));
}

function initialize() {
    var tds=document.getElementsByTagName("td");
    for (var i = 0; i < tds.length; ++i) {
        var all=tds[i].innerHTML;
        tds[i].innerHTML="";
        for (var j = 0; j < all.length; ++j) {
            tds [i].innerHTML = tds[i].innerHTML+"<span>"+all[j]+"</span>";
        }
    }
}

function clean(items) {
    every_char = items.getElementsByTagName("span");
    for (var i = 0; i < every_char.length; i++) {
        every_char[i].className = "";
    };
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function getChars(index) {
    var all = document.getElementsByTagName("input")[index].value;
    return all;
}
function makeAllTablesFilterable(tables) {
    initialize();
    for (var i = 0; i < tables.length; ++i) {
        document.getElementsByTagName("input")[i].onkeyup = filterRows(tables[i], i);
    }
    return tables;
}

function filterRows(table, index) {
    return function() {
        clean(table);
        var chars = getChars(index);
        var items = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (var i = 0; i < items.length; i++) {
            if(filterWords(items[i], chars) == false)
                console.log(1);
                items.className = "filtered";
        };
    }
}
function filterWords(items, chars) {
    var whether_filtered = Boolean(false);
    var cell = items.cells;
    for (var i = 0; i < cell.length; i++) {
        if (filterWord(cell[i], chars))
            whether_filtered = true;
    }
    return whether_filtered;
}
function filterWord(things, chars) {
    var whether_filtered = Boolean(false);
    var every_char = things.getElementsByTagName("span");
    for (var i = 0; i < every_char.length; i++) {
        for (var j = 0; j < chars.length; ++j) {
            console.log(every_char[i].innerHTML);
            if (chars[j] == every_char[i].innerHTML&&chars[j] != "") {
                every_char[i].className = "highlight"
            };
        }
    };
    return whether_filtered;
}

function makeAllTablesSortable(tables) {
    for (var i = 0; i < tables.length; ++i) {
        makeTableSortable(tables[i]);
    }
}

function makeTableSortable(table) {
    var heads = table.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].cells;
    for (var i = 0; i < heads.length; ++i) {
        makeHeadSortable(heads[i], i, table, heads);
    }
}

function makeHeadSortable(head, index, table, heads) {
    head.onclick = function() {
        if (head.className == "")
            sortByIndex(table, index, true);
        else if (head.className == "increase")
            sortByIndex(table, index, false);
        else if (head.className == "decrease")
            sortByIndex(table, index, true);
        changeHeadStyle(head, heads);
    }
}

function changeHeadStyle(head, heads) {
    if (head.className == "" ||head.className == "decrease") {
        for (var i = 0; i < heads.length; ++i) {
            heads[i].className = "";
        }
        head.className += "increase";
    } else{
        head.className = "";
        head.className += "decrease";
    }
}

function sortByIndex(table, index, ascend) {
    var col;
    var items = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    if (ascend == true) {
        sortAscend(items, index);
    } else {
        sortDescend(items, index);
    }
}

function compare(item1, item2) {
    var whether = false;
    var span1 = item1.getElementsByTagName("span");
    var span2 = item2.getElementsByTagName("span");
    for (var i = 0; i < span1.length; ++i) {
        if (i >= span2.length)
            break;
        if (span1[i].innerHTML > span2[i].innerHTML) {
            whether = true;
            break;
        } else if (span1[i].innerHTML < span2[i].innerHTML) {
            whether = false;
            break;
        }
    }
    return whether;
}

function compare2(item1, item2) {
    var whether = false;
    var span1 = item1.getElementsByTagName("span");
    var span2 = item2.getElementsByTagName("span");
    for (var i = 0; i < span1.length; ++i) {
        if (i >= span2.length)
            break;
        if (span1[i].innerHTML < span2[i].innerHTML) {
            whether = true;
            break;
        } else if (span1[i].innerHTML > span2[i].innerHTML) {
            whether = false;
            break;
        }
    }
    return whether;
}

function sortDescend(items, index) {
    console.log(items.length);
    for (var i = 0; i < items.length-1; ++i) {
        for (var j = 0; j < items.length-i-1; ++j) {
            if (compare2(items[j].cells[index], items[j+1].cells[index]) == true) {
                swap(items[j], items[j+1]);
            }
        }
    }
}

function sortAscend(items, index) {
    for (var i = 0; i < items.length-1; ++i) {
        for (var j = 0; j < items.length-i-1; ++j) {
            if (compare(items[j].cells[index], items[j+1].cells[index]) == true) {
                swap(items[j], items[j+1]);
            }
        }
    }
}

function swap(item1, item2) {
    for (var i = 0; i < item2.cells.length; ++i) {
        var temp = item1.cells[i].innerHTML;
        item1.cells[i].innerHTML = item2.cells[i].innerHTML;
        item2.cells[i].innerHTML = temp;
    }
}