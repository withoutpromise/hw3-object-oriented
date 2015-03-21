window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}

function getAllTables() {
	return document.getElementsByTagName("table");
}
function makeAllTablesFilterable(tables) {
    addInputBox(tables);
}
function addInputBox(tables) {
    for (var i = 0; i < tables.length; i++) {
    	var input_box = document.createElement("input");
    	input_box.setAttribute("type", "text");
    	input_box.setAttribute("id", i);
    	input_box.setAttribute("oninput", "filter(this.value,this.id);");
    	tables[i].appendChild(input_box);
    }
}
function filter(value, id) {
	var tables = getAllTables();
	var rows = tables[id].getElementsByTagName("tr");
	for (var i = 1; i < rows.length; i++) {
        rows[i].style.display = "";
        var segs = rows[i].getElementsByTagName("td");
        var found = false;
        for (var j = 0; j < segs.length; j++) {
            segs[j].innerHTML = segs[j].innerHTML.replace("<strong>", "");
            segs[j].innerHTML = segs[j].innerHTML.replace("</strong>", "");
            if(segs[j].innerHTML.indexOf(value) != -1) {
                found = true;
                // emphasize text found
                segs[j].innerHTML = segs[j].innerHTML.replace(value, "<strong>"+value+"</strong>");
            }
        }
        // set unvisible
        if (!found) {
            rows[i].style.display = "none";
        }
    }
}
