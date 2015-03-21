/*window.onload = function() {
	var tables = getAllTables();
	makeAllTablesFilterable(tables);
}*/

function getAllTables() {
	return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
	document.getElementById("search1").onchange = function () {
	searchValue = document.getElementById("search1").value;
	var count = 0;
	for (var i = 0; i < 3; i++) {
		tables[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].style.visibility = "visible";
		for (var j = 0; j < 3; j++) {
			
			//循环开始先清除所有span标签
			tables[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = 
			tables[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML.replace("<span>", "");
			tables[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = 
			tables[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML.replace("</span>", "");

			//匹配并添加span标签
			target = tables[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML.match(searchValue);
			if (target != null) {
				count++;
				newTarget = "<span>" + target + "</span>";
				targetField = tables[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML;
				tables[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = targetField.replace(target, newTarget);

			}
		}
		if (count == 0) tables[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].style.visibility = "hidden";
		count = 0;
	}
}

document.getElementById("search2").onchange = function () {
	searchValue = document.getElementById("search2").value;
	var count = 0;
	for (var i = 0; i < 3; i++) {
		tables[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].style.visibility = "visible";
		for (var j = 0; j < 3; j++) {
			
			//循环开始先清除所有span标签
			tables[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = 
			tables[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML.replace("<span>", "");
			tables[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = 
			tables[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML.replace("</span>", "");

			//匹配并添加span标签
			target = tables[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML.match(searchValue);
			if (target != null) {
				count++;
				newTarget = "<span>" + target + "</span>";
				targetField = tables[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML;
				tables[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[j].innerHTML = targetField.replace(target, newTarget);

			}
		}
		if (count == 0) tables[1].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i].style.visibility = "hidden";
		count = 0;
	}
}
return tables;
}