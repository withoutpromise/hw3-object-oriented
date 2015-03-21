function Sort(TableId, Col) {
	var Table = document.getElementById(TableId);
	var Tbody = Table.tBodies[0];
	var Thead = Table.getElementsByTagName("th");
	var Rows = Tbody.rows;
	var Arr = new Array;
	for (var i = 0; i < Rows.length; i++) {
		Arr[i] = Rows[i];
		//Rows[i].style.display = 'table-row';
		var cells = Rows[i].cells;
		for (var j = 0; j < cells.length; j++) //改动1
			cells[j].className = '';           //增加一个循环将过滤时的突显消去
	}
	if (Thead[Col].className == "ascend") {
		Thead[Col].className = "descend";
		Arr.reverse();
	} else if (Thead[Col].className == "descend") {
		Thead[Col].className = "ascend";
		Arr.reverse();
	} else {
		for (var i = 0; i < 3; i++) {
			if (i != Col)
				Thead[i].className = "";
			else
				Thead[i].className = "ascend";
		}
		Arr.sort(CustomCompare(Col));
		Arr[0].className = "";
		Arr[1].className = "alternate";
		Arr[2].className = "";
	}
	var frag = document.createDocumentFragment();
	for (var i = 0; i < Arr.length; i++) {
		frag.appendChild(Arr[i]);
	}
	Tbody.appendChild(frag);
}
function CustomCompare(Col){
	return function CompareTRs(TR1,TR2){
		var value1 = TR1.cells[Col].firstChild.nodeValue;
		var value2 = TR2.cells[Col].firstChild.nodeValue;
		if(value1 < value2)
			return -1;
		else if(value1 > value2)
			return 1;
		else
			return 0;
	};
}

function getAllTables() {
	return document.getElementsByTagName("table");
}


function makeAllTablesSortable(tables) {    //改动2
	for (var i = 0; i < tables.length; i++) //使用makeAll调用make
		makeSortable(tables[i]);            //make为原makeAll内的循环

}
window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);   //改动3
	makeAllTablesFilterable(tables); //载入时增加这个函数
}




//HW3
function makeAllTablesFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var insert = document.createElement("p");
		tables[i].parentNode.insertBefore(insert, tables[i]);
		insert.innerHTML = '<input type = "text" class = "text"/><button class = "button">Submit!</button>';
	}
	var buttons = document.getElementsByClassName("button");
	
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].tableindex = i;
		buttons[i].onclick = function() {
			text = document.getElementsByClassName("text")[this.tableindex].value;
			makeFilterable(tables[this.tableindex]);
		}
	}
}

function makeSortable(table) {
	var head = table.getElementsByTagName("th");
	for (var j = 0; j < head.length; j++) {
		head[j].Col = j;
		head[j].onclick = function() {
			Sort(table.id, this.Col);
		}
	}
	return table;
}

function makeFilterable (table) {
	var Table = table;
	var Tbody = Table.tBodies[0];
	var Thead = Table.getElementsByTagName("th");
	var rows = Tbody.rows;
	var checked = text;
	for (var i = 0; i < rows.length; i++) {
		var cells = rows[i].cells;
		rows[i].style.display = 'table-row';
		rows[i].className = "";
		Thead[i].className = '';
		var flag = true;
		if (checked != "")
			for (var j = 0; j < cells.length; j++) {
				cells[j].className = '';
				if (cells[j].innerHTML.indexOf(checked) >= 0) {
					cells[j].className = 'had';
					flag = false;
				}
			}
			if (flag)
				rows[i].style.display = "none";
			else
				rows[i].style.display = 'table-row';
		}
	var frag = document.createDocumentFragment();
	for (var i = 0; i < rows.length; i++) {
		frag.appendChild(rows[i]);
	}
	Tbody.appendChild(frag);
	return table;
}