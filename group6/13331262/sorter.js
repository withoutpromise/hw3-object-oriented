/* function highLight() and noHigtlight() can't work well */

// 0 for none, 1 for ascending, -1 for descending
var flag = [0,0,0,0,0,0];

window.onload = function(){
	var tables = getAllTables();

/* use this two lines of code by canceling comment symbol to test */

	makeAllTablesSortable(makeAllTablesFilterable(tables));
	//makeAllTablesFilterable(makeAllTablesSortable(tables));
}

function getAllTables(){
	var items = document.getElementsByTagName("table");
	return items;
}

function makeAllTablesSortable(item) {
    var theads = item[0].parentNode.getElementsByTagName("th");
    theads[0].onclick = function(){Ordered(0)};
    theads[2].onclick = function(){Ordered(2)};
    theads[3].onclick = function(){Ordered(3)};
    theads[4].onclick = function(){Ordered(4)};
    theads[1].onclick = function(){Ordered(1)};
    theads[5].onclick = function(){Ordered(5)};
    return getAllTables();
}

// 将被点击列的项目截取并用sort()函数排序
function Ordered(index){
	var tds1 = document.getElementsByTagName("td");
	var items = [];
	// todo表截取
	if (index <=2) {
		for (var i = 0; i < 9; i++) {
			if (i%3 == index%3)
			items.push(tds1[i].innerHTML);
		}
	// staff表截取
	} else {
		for (var i = 9; i < 18; i++) {
			if (i%3 == index%3)
			items.push(tds1[i].innerHTML);
		}
	}
	// 排序
	var compare = [];
	for (var j = 0; j < items.length; j++) {
		var tmp = [];
		tmp.push(items[j]);
		tmp.push(j);
		compare.push(tmp);
	}
	compare.sort();
	changePos(compare, index);
}

// 按排序后的compare[]更改<td>的innerHTML
function changePos(compare, index){
	var list = [];
	var tbody = document.getElementsByTagName("tbody");
	  // todo
	if (index <= 2) {
		var s = 0;
	  // staff
	} else {
		var s = 1;
	}
	var kid = tbody[s].getElementsByTagName("tr");
	for (var i = 0; i < kid.length; i++) {
		var str = kid[compare[i][1]].innerHTML;
		list.push(str);
	}
	  // ascending
	if (flag[index] == 0 || flag[index] == -1) {
		for (var j = 0; j < kid.length; j++) {
			tbody[s].getElementsByTagName("tr")[j].innerHTML = list[j];
		}
	  // descending
	} else {
		for (var j = 0; j < kid.length; j++) {
			tbody[s].getElementsByTagName("tr")[j].innerHTML = list[kid.length-1-j];
		}
	}
	changeCss(index);
}

// 改变css
function changeCss(index){
	var ths = document.getElementsByTagName("th");
	for (var i = 0; i < ths.length; i++) {
	  // change color and remove img
		if (flag[i] != 0) {
			var lastc = ths[i].lastChild.lastChild;
			ths[i].lastChild.remove(lastc);
		}
		ths[i].style.backgroundColor = "#00008B";
	}
	for (var i = 0; i < ths.length; i++) {
		if (i == index) {
			ths[i].style.backgroundColor = "rgba(166,166,255,1)";
			 // descending
			if (flag[index] == 1) {
				ths[i].innerHTML = ths[i].innerHTML + '<img src="descend.png">';
				ths[i].lastChild.style.float = "right";
				for (var k = 0; k < 6; k++) {
					flag[k] = 0;
				}
				flag[index] = -1;
			// ascending
			} else {
				ths[i].innerHTML = ths[i].innerHTML + '<img src="ascend.png">';
				ths[i].lastChild.style.float = "right";
				for (var k = 0; k < 6; k++) {
					flag[k] = 0;
				}
				flag[index] = 1;
			}
		}
	}
}

function makeAllTablesFilterable(tables) {
	// insert the inputs
	for (var i = 0; i < tables.length; i++) {
		var input = document.createElement("INPUT");
		var textnode = document.createTextNode("Search:")
		document.body.insertBefore(input,tables[i]);
		document.body.insertBefore(textnode,input);
		input.id = "input"+i;
		input.type = "text";
		input.style.width = "80px";
		input.oninput = function(){deleteRows();};
	}
	return getAllTables();
}

function deleteRows(){
	noHighLight();
	var value1 = document.getElementById("input0").value;
	var value2 = document.getElementById("input1").value;
	var tds = document.getElementsByTagName("td");
	var trs = document.getElementsByTagName("tr");
	// index[] 0 for remove, 1 for stay
	var index = [];
	for (var i = trs.length-1; i >= 1; i--) {
		if (i == 4) {
			continue;
		} else {
			index[i] = 1;
		}
	}
	// todo
	if (value1 != "") {
		for (var i = 0; i < 9; i++) {
			index[parseInt(i/3)+1] = 0;
			var v = tds[i].innerHTML.indexOf(value1);
			if (v != -1) {
				//highLight(i,value1);
				index[parseInt(i/3)+1] = 1;
				i = (parseInt(i/3)+1)*3-1;
			}
		}
	}
	// staff
	if (value2 != "") {
		for (var i = 9; i < 18; i++) {

			index[parseInt(i/3)+2] = 0;
			var v = tds[i].innerHTML.indexOf(value2);
			if (v != -1) {
				//highLight(i,value2);
				index[parseInt(i/3)+2] = 1;
				i = (parseInt(i/3)+1)*3-1;
			}
		}
	}
	// remove
	for (var i = trs.length-1; i >= 1; i--) {
		if (i == 4) {
			continue;
		} else {
			if (index[i] == 0) {
				trs[i].style.display = "none";
			} else {
				trs[i].style.display = "";
			}
		}
	}
}

//------------can't work well---unfinished----------------
function highLight(index,string){
	var tds = document.getElementsByTagName("td");
	var rep = "<span id='" + index + "'>" + string + "</span>";
	tds[index].innerHTML = tds[index].innerHTML.replace(string,rep);
	//alert("highLight: tds[index].innerHTML "+tds[index].innerHTML);
	document.getElementById(index).style.backgroundColor = "yellow";
}

function noHighLight(){
	var spans = document.getElementsByTagName("span");
	for (var i = 0; i < spans.length; i++) {
		spans[i].style.backgroundColor = "";
		inner = spans[i].innerHTML;
		outer = spans[i].outerHTML;
		spans[i].outerHTML = spans[i].outerHTML.replace(outer, inner);
	}
}