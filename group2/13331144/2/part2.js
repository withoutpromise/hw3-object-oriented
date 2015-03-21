window.onload = function() {
	  var tables = getAllTables();
	  makeFilterable(tables);
}

function getAllTables() {
    var alltables = document.getElementsByTagName("table");
    return alltables
}

function makeFilterable(tables) {
    for (var i = 0; i < tables.length; i++) {
        toFilter(tables[i]);
    }
    return getAllTables();
}

function toFilter(table) {
    var toinput = document.createElement("input");
    table.parentNode.insertBefore(toinput, table);
    toinput.oninput = function() {
        var trs = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        for (var i = 0; i < trs.length; i++) {
            removeClass(trs[i], "hidden");
            trs[i].innerHTML = trs[i].innerHTML.replace(/<strong>/g, '');
        }
        for (var i = 0; i < trs.length; i++) {
            filter(trs[i], this.value);
        }
    }
}

function filter(ele, value) {
    if (value == "") return;
    var tds = ele.getElementsByTagName("td");
    var len = value.length;
    var flag = 0;
    for (var i = 0; i < tds.length; i++) {
        var temp = tds[i].innerHTML;
        var offset = 0;
        while (1) {
            offset = temp.indexOf(value, offset);
            if (offset == -1) break;
            flag = 1;
            var len_ = temp.length;
            temp = temp.substring(0, offset)+"<strong>"+value+"</strong>"+temp.substring(offset+len, len_+1);
            offset += len+17;
        }
        tds[i].innerHTML = temp;
    }
    if (flag == 0) {
        addClass(ele, "hidden");
    }
}

function clearAll() {
    var ths = document.getElementsByTagName("th");
    for (var i = 0; i < ths.length; i++) {
       removeClass(ths[i], "descend");
       removeClass(ths[i], "ascend");
    }
}

function addClass(ele, val) {
	clearAll();
	if (!hasClass(ele, val))
		ele.className = ele.className+" "+val;
}

function removeClass(ele, val) {
	if (hasClass(ele, val)) {
		var reg = new RegExp('(\\s|^)'+val+'(\\s|$)');
       	ele.className = ele.className.replace(reg, '');
	}
}

function hasClass(ele, val) {
	if (ele.className && ele.className.match(new RegExp('(\\s|^)'+val+'(\\s|$)')))
		return true;
	else
		return false;
}
