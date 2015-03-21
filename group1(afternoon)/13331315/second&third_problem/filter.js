function makeAllTablesfilterable() {
	var Tables = document.getElementsByTagName("table");
	makeTablesfilterable(Tables);
}
function makeTablesfilterable(Tables) {
    for (var i = 0; i < Tables.length; i++) {
        var tabledata = getdata(Tables[i]);
	    createInput(Tables[i],tabledata);
	}
    
}
//get data from table
function getdata(table) {
    var trs = table.getElementsByTagName("tr");
    var tds = new Array;
    var storage = new Array;
    for (var i = 1; i < trs.length; i++) {
        tds[i] = trs[i].getElementsByTagName("td");
    }
    for (var i = 1; i < trs.length; i++) {
        storage[i] = new Array;
        for (var j = 0; j < tds[i].length; j++) {
            storage[i][j] = tds[i][j].innerHTML;
        }
    }
    return storage;
}
function gettabledata(table) {
    var trs = table.getElementsByTagName("tr");
    storage = new Array;
    var tds = new Array;
    for (var i = 1; i < trs.length; i++) {
        tds[i] = trs[i].getElementsByTagName("td");
    }
    for (var i = 1; i < trs.length; i++) {
        storage[i] = new Array;
        for (var j = 0; j < tds[i].length; j++) {
            storage[i][j] = tds[i][j].innerHTML;
        }
    }
}
//create input
function createInput(table,tabledata) {
    var input_ = document.createElement("input");
    var label_ = document.createElement("label");
    input_.type = "text";
    label_.innerHTML = "Search:"
    document.body.insertBefore(label_, table);
    document.body.insertBefore(input_, table);
    input_.style.marginBottom = "10px";
    label_.style.marginBottom = "10px";
    input_.oninput = function () {
        var text = this.value;
        searchtable(text, table,tabledata);
    }
}
//search and change the table by text
function searchtable(text, table, tabledata) {
    var reg = RegExp(text, 'ig');
    var trs = table.getElementsByTagName("tr");
    var tds = new Array;
    var storage = new Array;
    for (var i = 1; i < trs.length; i++) {
        tds[i] = trs[i].getElementsByTagName("td");
    }
    //turn back to initial table
    for (var i = 1; i < trs.length; i++) {
        for (var j = 0; j < tds[i].length; j++) {
            tds[i][j].innerHTML = tabledata[i][j];
        }
    }
    for (var i = 1; i < trs.length; i++) {
        var success = false;
        for (var j = 0; j < tds[i].length; j++) {
            if (reg.test(tds[i][j].innerHTML) && text != "") {
                success = true;
                tds[i][j].innerHTML = tds[i][j].innerHTML.replace(reg, "<mark>" + tds[i][j].innerHTML.match(reg)[0] + "</mark>");
            }
            if (success == true || text == "") {
                trs[i].style.display = "";
            } else {
                trs[i].style.display = "none";
            }
        }
    }
}
