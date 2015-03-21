function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortableAndFilterable(tables) {
    for (var i = 0; i < tables.length; ++i) {
        makeSortable(makeFilterable(tables[i]));
    }
}

function change_bg_color(trArr) {
    var k = 0;
    for (j = 0; j < trArr.length; ++j) {
        if (trArr[j].style.display == "") {
            if (k % 2 == 0) {
                trArr[j].style.backgroundColor = "rgb(255, 255, 255)";
            } else {
                trArr[j].style.backgroundColor = "rgb(221, 221, 221)";
            }
            k += 1;
        }
    }
}

function makeSortable(table) {
    var th = table.getElementsByTagName('th');
    var tr = table.getElementsByTagName('tr');
    var tb = table.getElementsByTagName('tbody')[0];
    for (var i = 0; i < th.length; ++i) {
        th[i].onclick = function() {
            var trArr = new Array();
            for (var k = 1; k < tr.length; ++k) {
                trArr.push(tr[k]);
            }
            for (var j = 0; j < th.length; ++j) {
                th[j].style.backgroundColor = "rgb(0, 0, 128)";
            }
            this.style.backgroundColor = "rgb(164, 176, 252)";
            if (this.className == "" || this.className == "descend") {
                this.className = "ascend";
                var col = this.cellIndex;
                trArr.sort(function(a, b) {
                    return a.cells[col].textContent > b.cells[col].textContent;
                });
            } else {
                this.className = "descend";
                trArr.reverse();
            }
            change_bg_color(trArr);
            for (var k = trArr.length-1; k >= 0; --k) {
                tb.insertBefore(trArr[k], tb.firstChild.nextSibling);
            }
        };
    }
    return table;
}

function makeFilterable(table) {
    var div = document.createElement('div');
    var ipt = document.createElement('input');
    ipt.type = 'text';
    ipt.className = 'input-word';
    ipt.placeholder= "the word you want to filter";
    div.appendChild(ipt);
    table.parentNode.insertBefore(div, table);  //create the input label
    var th = table.getElementsByTagName('th');
    var tr = table.getElementsByTagName('tr');
    var tb = table.getElementsByTagName('tbody')[0];
    ipt.oninput = function() {  // filter the table while typing the word
        var trArr = new Array();
        for (var i = 1; i < tr.length; ++i) {
            trArr.push(tr[i]);
        }
        for (j = 0; j < trArr.length; ++j) {
            trArr[j].style.display = "none";
        }
        for (j = 0; j < trArr.length; ++j) {
            for (k = 0; k < trArr[j].cells.length; ++k) {
                trArr[j].cells[k].innerHTML = trArr[j].cells[k].innerHTML.replace(/<\/?span[^>]*>/gi, "");  // delete the span label
                if (trArr[j].cells[k].innerHTML.indexOf(ipt.value) >= 0) {
                    trArr[j].style.display = "";
                    var reg = new RegExp(ipt.value, 'g');
                    trArr[j].cells[k].innerHTML = trArr[j].cells[k].innerHTML.replace(reg, '<span style=\"font-weight: bold;\">'+ipt.value+'</span>'); // highlight the word
                }
            }
        }
        change_bg_color(trArr);
    };
    return table;
}

window.onload = function() {
    var tables = getAllTables();
    makeAllTablesSortableAndFilterable(tables);
}