window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		makeFilterable(tables[i]);
	}
}

function makeFilterable(Itable) {
    var input = document.createElement("input");
    input.placeholder = "Search";
    input.addEventListener("input", myFilter);
    Itable.appendChild(input); // 每个table后添加已添加一个filter事件的输入框
}

function myFilter() {
	var table = this.parentNode;
    tableReset(table);
    var tr = table.getElementsByTagName("tr");
    var Input = this.value;
    for (var i = 1; i < tr.length; i++) {
    	for (var j = 0; j < tr[i].cells.length; j++) {
            Istring = tr[i].cells[j].innerHTML;
            if (Istring.indexOf(Input) > -1) {
                contentStress(tr[i], Input);
            	tr[i].style.display = "";
                break;
            }
            if (j == tr[i].cells.length-1)
                tr[i].style.display = "none";
    	}
    }
}

// 将添加的span全部去除
function tableReset(table) {
    var tr = table.getElementsByTagName("tr");
    for (var i = 1; i < tr.length; i++) {
        for (var j = 0; j < tr[i].cells.length; j++) {
            var string = tr[i].cells[j].innerHTML;
            var parts = string.split('<span class="stress">');
            string = parts.join('');
            parts = string.split('<span>');
            tr[i].cells[j].innerHTML = parts.join('');
        }}
}

// 找到的字符进行强调
function contentStress(tr, Input) {
    for (var i = 0; i < tr.cells.length; i++) {
        var string = tr.cells[i].innerHTML;
        var parts = string.split(Input);
        tr.cells[i].innerHTML = parts.join('<span class="stress">'+Input+'</span>');
    }
}
